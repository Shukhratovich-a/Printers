import { IsBoolean, IsOptional, IsString } from "class-validator";

import { Unique } from "@validators/unique/unique.decorator";

import { CategoryEntity } from "../category.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDto {
  @ApiProperty({
    name: "title",
    type: "string",
    required: false,
    example: "All printers",
    description: "Enter title for this category",
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    name: "category",
    type: "string",
    required: false,
    example: "Printers",
    description: "Enter name of category",
  })
  @IsOptional()
  @IsString()
  category?: string;

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
    CategoryEntity,
    {
      select: "entity.id",
      where: "entity.alias = :alias and id != :id",
      parameters: { alias: "value", id: "params.id" },
    },
  ])
  alias?: string;

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
