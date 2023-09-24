import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from "typeorm";
import { SupplierProduct } from "./supplier-product";

@Entity()
export class Supplier extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => SupplierProduct, (supplierProduct) => supplierProduct.supplier, {
    nullable: false,
  })
  supplierProducts: SupplierProduct[];
}
