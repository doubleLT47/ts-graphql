import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Product } from "./product";
import { Category } from "./category";

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  // Subcategory has many products
  @OneToMany(() => Product, (product) => product.subcategory)
  products: Product[];

  // Subcategory has one Category
  @ManyToOne(() => Category, (category) => category.products, { nullable: false })
  category: Category;
}
