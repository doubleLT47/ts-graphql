import { InventoryTransaction, TransactionType } from "@entities/inventory-transaction";
import { Product } from "@entities/product";
import { Warehouse } from "@entities/ware-house";
import { WarehouseStock } from "@entities/warehouse-stock";
import { AppDataSource } from "@configs/db";

export type TransactionDetails = {
  transactionId: number;
  productId: number;
  warehouseId: number;
  updatedQuantity: number;
};

export const registerTransaction = async (
  type: TransactionType,
  productId: number,
  warehouseId: number,
  quantity: number
): Promise<TransactionDetails> => {
  const product: Product | null = await Product.findOne({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw {
      code: 404,
      message: "product not found",
    };
  }

  const warehouse: Warehouse | null = await Warehouse.findOne({
    where: {
      id: warehouseId,
    },
  });

  if (!warehouse) {
    throw {
      code: 404,
      message: "warehouse not found",
    };
  }

  const transaction = new InventoryTransaction();
  transaction.date = new Date();
  transaction.quantity = quantity;
  transaction.type = type;
  transaction.product = product;
  transaction.warehouse = warehouse;

  const warehouseStock =
    (await WarehouseStock.findOne({
      where: {
        productId: product.id,
        warehouseId: warehouse.id,
      },
    })) || new WarehouseStock();

  if (!warehouseStock.productId || !warehouseStock.warehouseId) {
    warehouseStock.productId = product.id;
    warehouseStock.warehouseId = warehouse.id;
    warehouseStock.quantity = 0;
  }

  warehouseStock.quantity =
    warehouseStock.quantity + (type === TransactionType.RECEIPT ? quantity : -quantity);

  const queryRunner = await AppDataSource.createQueryRunner();
  await queryRunner.startTransaction();
  await transaction.save();
  await warehouseStock.save();

  await queryRunner.commitTransaction();
  return {
    transactionId: transaction.id,
    updatedQuantity: warehouseStock.quantity,
    warehouseId: warehouse.id,
    productId: product.id,
  };
};
