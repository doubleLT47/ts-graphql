import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./category";
import { Subcategory } from "./subcategory";
import { Uom } from "./uom";
import { SupplierProduct } from "./supplier-product";
import { WarehouseStock } from "./warehouse-stock";
import { InventoryTransaction } from "./inventory-transaction";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sku: string;

  @Column()
  description: string;

  // Product has one Category
  @ManyToOne(() => Category, (category) => category.products, { nullable: false })
  category: Category;

  // Product can have one Subcategory
  @ManyToOne(() => Subcategory, (subcategory) => subcategory.products, { nullable: true })
  subcategory: Subcategory;

  // Product has one UOM
  @ManyToOne(() => Uom, (uom) => uom.products, { nullable: false })
  uom: Uom;

  @OneToMany(() => SupplierProduct, (supplierProduct) => supplierProduct.product)
  supplierProducts: SupplierProduct[];

  @OneToMany(() => WarehouseStock, (warehouseStock) => warehouseStock.product, { nullable: false })
  warehouseStocks: WarehouseStock[];

  @OneToMany(() => InventoryTransaction, (inventoryTransaction) => inventoryTransaction.product, {
    nullable: false,
  })
  inventoryTransactions: InventoryTransaction[];
}
