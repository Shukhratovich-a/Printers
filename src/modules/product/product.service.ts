import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Like, Repository } from "typeorm";

import { ProductEntity } from "./product.entity";
import { SubCategoryEntity } from "@modules/subCategory/subCategory.entity";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async findById(id: number) {
    return await this.productRepository.findOne({ where: { id } });
  }

  async findByName(name: string) {
    return await this.productRepository.find({ where: [{ name: Like(`%${name}%`) }] });
  }

  async findByKey(productKey: string) {
    return await this.productRepository.findOne({ where: { productKey } });
  }

  async create(body: CreateProductDto, subCategory: SubCategoryEntity) {
    try {
      const newProduct = await this.productRepository.save(body);

      subCategory.products = [...subCategory.products, newProduct];
      await subCategory.save();

      return newProduct;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, body: UpdateProductDto) {
    if (body.subCategoryId) {
      await this.productRepository.update(id, { subCategory: { id: body.subCategoryId } });

      delete body.subCategoryId;
    }

    return await this.productRepository.save({ id, ...body });
  }

  async delete(id: number) {
    try {
      return await this.productRepository.delete(id);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async checkById(id: number) {
    return await this.productRepository.findOne({ where: { id } });
  }
}
