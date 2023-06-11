import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { SubCategoryEntity } from "@modules/subCategory/subCategory.entity";

@Entity("products", { name: "product" })
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "name", type: "varchar", nullable: false })
  name: string;

  @Column({ name: "manufacturer", type: "varchar", nullable: false })
  manufacturer: string;

  @Column({ name: "product_key", type: "varchar", nullable: false, unique: true })
  productKey: string;

  @Column({ name: "product_price", type: "numeric", nullable: false })
  productPrice: number;

  @Column({ name: "max_format", type: "varchar", nullable: true })
  maxFormat: string;

  @Column({ name: "type", type: "varchar", nullable: true })
  type: string;

  @Column({ name: "purpose", type: "varchar", nullable: true })
  purpose: string;

  @Column({ name: "print_type", type: "varchar", nullable: true })
  printType: string;

  @Column({ name: "print_technology", type: "varchar", nullable: true })
  printTechnology: string;

  @Column({ name: "one_page_speed", type: "numeric", nullable: true })
  onePageSpeed: number;

  @Column({ name: "two_page_speed", type: "numeric", nullable: true })
  twoPageSpeed: number;

  @Column({ name: "print_area", type: "varchar", nullable: true })
  printArea: string;

  @Column({ name: "duplex", type: "boolean", nullable: true })
  duplex: boolean;

  @Column({ name: "cartridge_count", type: "numeric", nullable: true })
  cartridgeCount: number;

  @Column({ name: "color_count", type: "numeric", nullable: true })
  colorCount: number;

  @Column({ name: "cartridge_volume", type: "varchar", nullable: true })
  cartridgeVolume: string;

  @Column({ name: "print_on", type: "varchar", nullable: true })
  printOn: string;

  @Column({ name: "paper_count", type: "numeric", nullable: true })
  paperCount: number;

  @Column({ name: "warm_up_time", type: "numeric", nullable: true })
  warmUpTime: number;

  @Column({ name: "print_from_cloud", type: "boolean", nullable: true })
  printFromCloud: boolean;

  @Column({ name: "print_from_usb", type: "boolean", nullable: true })
  printFromUsb: boolean;

  @Column({ name: "print_from_phone", type: "boolean", nullable: true })
  printFromPhone: boolean;

  @Column({ name: "network_print", type: "boolean", nullable: true })
  networkPrint: boolean;

  @Column({ name: "memory_siz", type: "varchar", nullable: true })
  memorySize: string;

  @Column({ name: "hard_disk", type: "varchar", nullable: true })
  hardDisk: string;

  @ManyToOne(() => SubCategoryEntity, (subCategory) => subCategory.products, { onDelete: "CASCADE" })
  @JoinColumn({ name: "sub_category_id" })
  subCategory: SubCategoryEntity;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}
