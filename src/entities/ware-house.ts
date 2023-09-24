import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { InventoryTransaction } from "./inventory-transaction";
import { WarehouseStock } from "./warehouse-stock";

@Entity()
export class Warehouse {
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
