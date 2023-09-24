import { TransactionType } from "@entities/inventory-transaction";
import { registerTransaction } from "@services/inventory";
import { Arg, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";

@InputType()
class RegisterTransactionInput {
  @Field()
  type: TransactionType;

  @Field()
  productId: number;

  @Field()
  warehouseId: number;

  @Field()
  quantity: number;
}

@ObjectType()
class RegisterTransactionResponse {
  @Field()
  transactionId: number;

  @Field()
  productId: number;

  @Field()
  warehouseId: number;

  @Field()
  updatedQuantity: number;
}

@Resolver()
export class InventoryResolver {
  @Mutation(() => RegisterTransactionResponse)
  async registerTransaction(
    @Arg("input") input: RegisterTransactionInput
  ): Promise<RegisterTransactionResponse> {
    try {
      const { type, productId, warehouseId, quantity } = input;
      return await registerTransaction(type, productId, warehouseId, quantity);
    } catch (error) {
      console.error("error registering transaction ", error);
      throw error;
    }
  }
}
