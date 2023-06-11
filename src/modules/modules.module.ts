import { Module } from "@nestjs/common";

import { CategoryModule } from "./category/category.module";
import { SubCategoryModule } from "./subCategory/subCategory.module";
import { ProductModule } from "./product/product.module";
import { FilterModule } from "./filter/filter.module";

@Module({
  imports: [CategoryModule, SubCategoryModule, ProductModule, FilterModule],
})
export class Modules {}
