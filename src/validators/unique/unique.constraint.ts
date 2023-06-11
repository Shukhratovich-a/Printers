import { Inject, Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";

import { EntityManager } from "typeorm";
import { each, at } from "lodash";
import { ValidationArguments, ValidatorConstraintInterface, ValidatorConstraint } from "class-validator";

interface Arguments extends ValidationArguments {
  object: {
    context: Record<string, string>;
  };
}

@ValidatorConstraint({ name: "unique", async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async validate(value: string, validationArguments?: Arguments): Promise<boolean> {
    const [entityClass, queryConditions] = validationArguments.constraints;

    const parameters = {
      value: value.toLowerCase(),
      params: validationArguments.object.context,
    };

    const qb = await this.entityManager.getRepository(entityClass).createQueryBuilder("entity");
    qb.select(queryConditions.select).where(queryConditions.where);

    const parametersQuery = {};
    each(queryConditions.parameters, (val, property) => {
      const find = at(parameters, val);
      parametersQuery[property] = find[0];
    });

    const entity = await qb.setParameters(parametersQuery).getOne();

    if (entity) return false;
    else return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} already exists`;
  }
}
