import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";
import { Supplier } from "./supplier";

@Entity()
export class SupplierProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  supplierSku: string;

  @ManyToOne(() => Product, (product) => product.supplierProducts, { nullable: false })
  product: Product;

  @ManyToOne(() => Supplier, (supplier) => supplier.supplierProducts, { nullable: false })
  supplier: Supplier;
}
