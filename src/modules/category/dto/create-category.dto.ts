import { ApiProperty } from "@nestjs/swagger";

import { IsNotEmpty, IsString } from "class-validator";

import { Unique } from "@validators/unique/unique.decorator";

import { CategoryEntity } from "../category.entity";

export class CreateCategoryDto {
  @ApiProperty({
    name: "title",
    type: "string",
    required: true,
    example: "All printers",
    description: "Enter title for this category",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    name: "category",
    type: "string",
    required: true,
    example: "Printers",
    description: "Enter name of category",
  })
  @IsNotEmpty()
  @IsString()
  category: string;

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
    CategoryEntity,
    {
      select: "entity.id",
      where: "entity.alias = :alias",
      parameters: { alias: "value" },
    },
  ])
  alias: string;
}
