import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { SubCategoryEntity } from "./subCategory.entity";
import { CategoryEntity } from "@modules/category/category.entity";

import { CreateSubCategoryDto } from "./dto/create-subCategory.dto";
import { UpdateSubCategoryDto } from "./dto/update-subCategory.dto";

import { INTERNAL_SERVER_ERROR } from "./subCategory.constants";

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategoryEntity)
    private readonly subCategoryRepository: Repository<SubCategoryEntity>,
  ) {}

  async findAll(): Promise<SubCategoryEntity[]> {
    return await this.subCategoryRepository.find({ where: { isActive: true } });
  }

  async findById(id: number): Promise<SubCategoryEntity> {
    return await this.subCategoryRepository.findOne({ where: { id, isActive: true }, relations: ["products"] });
  }

  async findByAlias(alias: string): Promise<SubCategoryEntity> {
    return await this.subCategoryRepository.findOne({ where: { alias, isActive: true }, relations: ["products"] });
  }

  async create(body: CreateSubCategoryDto, category: CategoryEntity): Promise<SubCategoryEntity> {
    try {
      const newSubCategory = await this.subCategoryRepository.save(body);

      category.subCategories = [...category.subCategories, newSubCategory];
      await category.save();

      return newSubCategory;
    } catch {
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, body: UpdateSubCategoryDto & { context?: object }): Promise<SubCategoryEntity> {
    try {
      if (body.categoryId) {
        await this.subCategoryRepository.update(id, { category: { id: body.categoryId } });

        delete body.categoryId;
      }

      if (body.context) delete body.context;

      return await this.subCategoryRepository.save({ id, ...body, alias: body.alias.toLowerCase() });
    } catch {
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number) {
    try {
      return await this.subCategoryRepository.delete(id);
    } catch {
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR);
    }
  }

  async checkById(id: number): Promise<SubCategoryEntity> {
    return await this.subCategoryRepository.findOne({ where: { id }, relations: ["category"] });
  }
}
