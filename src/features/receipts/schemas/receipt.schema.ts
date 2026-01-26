import { array, number, object, optional, string } from "valibot";

export const ReceiptProductSchema = object({
  name: string(),
  price: number(),
  quantity: number(),
  warranty_conditions: optional(string()),
});

export const ReceiptSchema = object({
  id: number(),
  date: string(),
  products: array(ReceiptProductSchema),
  customer_name: string(),
  customer_document: string(),
  discount: optional(string()),
  created_at: string(),
});

export const ReceiptsSchema = array(ReceiptSchema);
