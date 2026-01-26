import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReceipts,
  getReceiptById,
  createReceipt,
  updateReceipt,
  deleteReceipt,
  generateReceiptPDF,
} from "../api/receipts.api";
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

export const useReceipts = () => {
  return useQuery<ReceiptsType>({
    queryKey: ["receipts"],
    queryFn: async () => {
      const response = await getReceipts();
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data || [];
    },
  });
};

export const useReceipt = (id: number) => {
  return useQuery<ReceiptType>({
    queryKey: ["receipts", id],
    queryFn: async () => {
      const response = await getReceiptById(id);
      if (response.error) {
        throw new Error(response.error.message);
      }
      if (!response.data) {
        throw new Error("Receipt not found");
      }
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateReceipt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (receiptData: CreateReceiptData) => createReceipt(receiptData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receipts"] });
    },
    onError: (error) => {
      throw new Error(error.message || "Failed to create receipt");
    },
  });
};

export const useUpdateReceipt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<CreateReceiptData>;
    }) => updateReceipt(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receipts"] });
    },
    onError: (error) => {
      throw new Error(error.message || "Failed to update receipt");
    },
  });
};

export const useDeleteReceipt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteReceipt(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receipts"] });
    },
    onError: (error) => {
      throw new Error(error.message || "Failed to delete receipt");
    },
  });
};

export const useGenerateReceiptPDF = () => {
  return useMutation({
    mutationFn: (receiptData: CreateReceiptData) =>
      generateReceiptPDF(receiptData),
    onError: (error) => {
      throw new Error(error.message || "Failed to generate PDF");
    },
  });
};
