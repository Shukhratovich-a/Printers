import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Like, Repository } from "typeorm";

import { CategoryEntity } from "./category.entity";

import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

import { INTERNAL_SERVER_ERROR } from "./category.constants";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find({ where: { isActive: true }, relations: ["subCategories"] });
  }

  async findById(id: number): Promise<CategoryEntity> {
    return await this.categoryRepository.findOne({ where: { id, isActive: true }, relations: ["subCategories"] });
  }

  async findByAlias(alias: string): Promise<CategoryEntity> {
    return await this.categoryRepository.findOne({ where: { alias, isActive: true }, relations: ["subCategories"] });
  }

  async findByText(text: string) {
    return await this.categoryRepository.find({
      where: [{ title: Like(`%${text}%`) }, { alias: Like(`%${text}%`) }],
      relations: ["subCategories"],
    });
  }

  async create(body: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      return await this.categoryRepository.save({ ...body, alias: body.alias.toLowerCase() });
    } catch {
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, body: UpdateCategoryDto & { context?: object }): Promise<CategoryEntity> {
    try {
      if (body.context) delete body.context;

      return await this.categoryRepository.save({ id, ...body, alias: body.alias.toLowerCase() });
    } catch {
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number) {
    try {
      return await this.categoryRepository.delete(id);
    } catch {
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR);
    }
  }

  async checkById(id: number): Promise<CategoryEntity> {
    return await this.categoryRepository.findOne({ where: { id }, relations: ["subCategories"] });
  }
}
