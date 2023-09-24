import { Product } from "./product";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Warehouse } from "./ware-house";

@Entity()
export class WarehouseStock {
  @PrimaryColumn()
  productId: number;

  @PrimaryColumn()
  warehouseId: number;

  @ManyToOne(() => Product, (product) => product.warehouseStocks, { nullable: false })
  product: Product;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.warehouseStocks, { nullable: false })
  warehouse: Warehouse;

  @Column()
  quantity: number;
}
