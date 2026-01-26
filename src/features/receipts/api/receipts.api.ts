import type { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../../../supabase/supabase";
import type {
  ReceiptsType,
  ReceiptType,
  ReceiptProduct,
} from "../types/receipt.type";

interface CreateReceiptData {
  date: string;
  products: ReceiptProduct[];
  customer_name: string;
  customer_document: string;
  discount?: string;
}

export const getReceipts = async () => {
  const { data, error } = (await supabase
    .from("receipts")
    .select("*")
    .order("created_at", { ascending: false })) as {
    data: ReceiptsType | null;
    error: PostgrestError | null;
  };
  return { data, error };
};

export const getReceiptById = async (id: number) => {
  const { data, error } = (await supabase
    .from("receipts")
    .select("*")
    .eq("id", id)
    .single()) as {
    data: ReceiptType | null;
    error: PostgrestError | null;
  };
  return { data, error };
};

export const createReceipt = async (receiptData: CreateReceiptData) => {
  const productsWithTotal = receiptData.products.map((product) => ({
    ...product,
  }));

  const { data, error } = (await supabase
    .from("receipts")
    .insert({
      ...receiptData,
      products: productsWithTotal,
    })
    .select()
    .single()) as {
    data: ReceiptType | null;
    error: PostgrestError | null;
  };
  return { data, error };
};

export const updateReceipt = async (
  id: number,
  receiptData: Partial<CreateReceiptData>,
) => {
  let updateData = { ...receiptData };

  if (receiptData.products) {
    const productsWithTotal = receiptData.products.map((product) => ({
      ...product,
    }));

    updateData = {
      ...updateData,
      products: productsWithTotal,
    };
  }

  const { data, error } = (await supabase
    .from("receipts")
    .update(updateData)
    .eq("id", id)
    .select()
    .single()) as {
    data: ReceiptType | null;
    error: PostgrestError | null;
  };
  return { data, error };
};

export const deleteReceipt = async (id: number) => {
  const { error } = await supabase.from("receipts").delete().eq("id", id);
  return { error };
};

export const generateReceiptPDF = async (receiptData: CreateReceiptData) => {
  const url = import.meta.env.VITE_API_URL as string;
  const response = await fetch(
    `${url || "http://localhost:3000/api/invoice/pdf"}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: receiptData.date,
        products: receiptData.products,
        customerName: receiptData.customer_name,
        customerDocument: receiptData.customer_document,
        discount: receiptData.discount?.toLocaleString(),
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to generate PDF");
  }

  return response.blob();
};
