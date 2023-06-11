import { ApiProperty } from "@nestjs/swagger";

import { IsBoolean, IsOptional, IsString } from "class-validator";

import { Unique } from "@validators/unique/unique.decorator";

import { SubCategoryEntity } from "../subCategory.entity";

export class UpdateSubCategoryDto {
  @ApiProperty({
    name: "title",
    type: "string",
    required: false,
    example: "All color printers",
    description: "Enter title for this sub category",
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    name: "subCategory",
    type: "string",
    required: false,
    example: "Color printers",
    description: "Enter name of sub category",
  })
  @IsOptional()
  @IsString()
  subCategory?: string;

  @ApiProperty({
    name: "alias",
    required: false,
    type: "string",
    example: "printers",
    description: "Enter alias of for search engine",
  })
  @IsOptional()
  @IsString()
  @Unique([
    SubCategoryEntity,
    {
      select: "entity.id",
      where: "entity.alias = :alias and id != :id",
      parameters: { alias: "value", id: "params.id" },
    },
  ])
  alias?: string;

  @ApiProperty({
    name: "categoryId",
    required: false,
    type: "number",
    example: "1",
    description: "Enter category id",
  })
  @IsOptional()
  categoryId?: number;

  @ApiProperty({
    name: "isActive",
    type: "string",
    required: false,
    example: "true",
    description: "Is category active?",
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
