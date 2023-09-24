import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from "typeorm";
import { InventoryTransaction } from "./inventory-transaction";
import { WarehouseStock } from "./warehouse-stock";

@Entity()
export class Warehouse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => InventoryTransaction, (inventoryTransaction) => inventoryTransaction.warehouse, {
    nullable: false,
  })
  inventoryTransactions: InventoryTransaction[];

  @OneToMany(() => WarehouseStock, (warehouseStock) => warehouseStock.warehouse, {
    nullable: false,
  })
  warehouseStocks: WarehouseStock[];
}
