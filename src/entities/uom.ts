import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from "typeorm";
import { Product } from "./product";

@Entity()
export class Uom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  abbrev: string;

  // Uom has many products
  @OneToMany(() => Product, (product) => product.uom)
  products: Product[];
}
