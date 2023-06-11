import { ApiProperty } from "@nestjs/swagger";

import { IsNotEmpty, IsString } from "class-validator";

import { Unique } from "@validators/unique/unique.decorator";

import { SubCategoryEntity } from "../subCategory.entity";

export class CreateSubCategoryDto {
  @ApiProperty({
    name: "title",
    type: "string",
    required: true,
    example: "All color printers",
    description: "Enter title for this sub category",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    name: "subCategory",
    type: "string",
    required: true,
    example: "Color printers",
    description: "Enter name of sub category",
  })
  @IsNotEmpty()
  @IsString()
  subCategory: string;

  @ApiProperty({
    name: "alias",
    required: true,
    type: "string",
    example: "printers",
    description: "Enter alias of for search engine",
  })
  @IsNotEmpty()
  @IsString()
  @Unique([
    SubCategoryEntity,
    {
      select: "entity.id",
      where: "entity.alias = :alias",
      parameters: { alias: "value" },
    },
  ])
  alias: string;

  @ApiProperty({
    name: "categoryId",
    required: true,
    type: "number",
    example: "1",
    description: "Enter category id",
  })
  @IsNotEmpty()
  categoryId: number;
}
