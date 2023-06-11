import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductEntity } from "./product.entity";
import { SubCategoryEntity } from "@modules/subCategory/subCategory.entity";

import { ProductController } from "./product.controller";

import { ProductService } from "./product.service";
import { SubCategoryService } from "@modules/subCategory/subCategory.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, SubCategoryEntity])],
  controllers: [ProductController],
  providers: [ProductService, SubCategoryService],
})
export class ProductModule {}
