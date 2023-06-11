import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ProductEntity } from "@modules/product/product.entity";

import { productProps } from "./filter.constants";

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll() {
    const filter = {};

    for (let productProp of productProps) {
      const propItems = await this.productRepository.find({ select: { [productProp]: true } });
      if (!propItems.length) continue;

      const propValues = [];
      for (let key of propItems) propValues.push(key[productProp]);

      const setPropValues = [...new Set(propValues)];

      const item = [];
      setPropValues.forEach((value) => {
        const count = propValues.filter((item) => item === value).length;

        item.push({ name: value, count });

        filter[productProp] = item;
      });
    }

    return filter;
  }
}
