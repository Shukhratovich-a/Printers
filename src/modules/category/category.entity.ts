import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";

import { SubCategoryEntity } from "@modules/subCategory/subCategory.entity";

@Entity("categories", { name: "category" })
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "title", type: "varchar" })
  title: string;

  @Column({ name: "category", type: "varchar" })
  category: string;

  @Column({ name: "alias", type: "varchar", unique: true })
  alias: string;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive: boolean;

  @OneToMany(() => SubCategoryEntity, (subCategories) => subCategories.category)
  subCategories: SubCategoryEntity[];

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}
