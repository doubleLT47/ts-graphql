import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from "typeorm";
import { Product } from "./product";
import { Subcategory } from "./subcategory";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  // Category has many products
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  // Category has many subcategories
  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];
}
