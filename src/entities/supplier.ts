import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { SupplierProduct } from "./supplier-product";

@Entity()
export class Supplier {
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
