import type { InferOutput } from "valibot";
import type { ReceiptSchema, ReceiptsSchema } from "../schemas/receipt.schema";

export type ReceiptType = InferOutput<typeof ReceiptSchema>;
export type ReceiptsType = InferOutput<typeof ReceiptsSchema>;

export interface ReceiptProduct {
  name: string;
  price: number;
  quantity: number;
  warranty_conditions?: string;
}
