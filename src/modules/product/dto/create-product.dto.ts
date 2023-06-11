import { ApiProperty } from "@nestjs/swagger";

import { IsNotEmpty, IsString } from "class-validator";

import { Unique } from "@validators/unique/unique.decorator";

import { ProductEntity } from "../product.entity";

export class CreateProductDto {
  name: string;

  manufacturer: string;

  @Unique([
    ProductEntity,
    {
      select: "entity.id",
      where: "entity.productKey = :productKey",
      parameters: { productKey: "value" },
    },
  ])
  productKey: string;

  productPrice: number;

  maxFormat?: string;

  type?: string;

  purpose?: string;

  printType?: string;

  printTechnology?: string;

  onePageSpeed?: number;

  twoPageSpeed?: number;

  printArea?: string;

  duplex?: boolean;

  cartridgeCount?: number;

  colorCount?: number;

  cartridgeVolume?: string;

  printOn?: string;

  paperCount?: number;

  warmUpTime?: number;

  printFromCloud?: boolean;

  printFromUsb?: boolean;

  printFromPhone?: boolean;

  networkPrint?: boolean;

  memorySize?: string;

  hardDisk?: string;

  subCategoryId: number;
}
