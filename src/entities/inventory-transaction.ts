import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Warehouse } from "./ware-house";
import { Product } from "./product";
export enum TransactionType {
  RECEIPT = "receipt",
  WITHDRAW = "withdraw",
}
@Entity()
export class InventoryTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  quantity: number;

  @Column({ type: "enum", enum: TransactionType })
  type: TransactionType;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.inventoryTransactions, { nullable: false })
  warehouse: Warehouse;

  @ManyToOne(() => Product, (product) => product.inventoryTransactions, { nullable: false })
  product: Product;
}
