import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SubCategoryEntity } from "./subCategory.entity";
import { CategoryEntity } from "@modules/category/category.entity";

import { SubCategoryController } from "./subCategory.controller";

import { SubCategoryService } from "./subCategory.service";
import { CategoryService } from "@modules/category/category.service";

@Module({
  imports: [TypeOrmModule.forFeature([SubCategoryEntity, CategoryEntity])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService, CategoryService],
})
export class SubCategoryModule {}
