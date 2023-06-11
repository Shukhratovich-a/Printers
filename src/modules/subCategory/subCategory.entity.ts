import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { CategoryEntity } from "@modules/category/category.entity";
import { ProductEntity } from "../product/product.entity";

@Entity("sub_categories", { name: "sub_category" })
export class SubCategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "title", type: "varchar" })
  title: string;

  @Column({ name: "sub_category", type: "varchar" })
  subCategory: string;

  @Column({ name: "alias", type: "varchar", unique: true })
  alias: string;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive: boolean;

  @ManyToOne(() => CategoryEntity, (category) => category.subCategories, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" })
  category: CategoryEntity;

  @OneToMany(() => ProductEntity, (products) => products.subCategory)
  products: ProductEntity[];

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}
