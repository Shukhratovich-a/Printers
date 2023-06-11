import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductEntity } from "@modules/product/product.entity";

import { FilterController } from "./filter.controller";

import { FilterService } from "./filter.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [FilterController],
  providers: [FilterService],
})
export class FilterModule {}
