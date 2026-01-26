import { X, Plus, Trash2 } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  useCreateReceipt,
  useUpdateReceipt,
} from "../../../features/receipts/hooks/useReceipts";
import type {
  ReceiptType,
  ReceiptProduct,
} from "../../../features/receipts/types/receipt.type";

interface ReceiptModalProps {
  onClose: () => void;
  receipt?: ReceiptType | null;
}

interface FormData {
  date: string;
  customer_name: string;
  customer_document: string;
  discount: string;
  products: ReceiptProduct[];
}

const ReceiptModal = ({ onClose, receipt }: ReceiptModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createReceiptMutation = useCreateReceipt();
  const updateReceiptMutation = useUpdateReceipt();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: receipt
      ? {
          date: receipt.date,
          customer_name: receipt.customer_name,
          customer_document: receipt.customer_document,
          discount: receipt.discount || "",
          products: receipt.products,
        }
      : {
          date: new Date().toISOString().split("T")[0],
          customer_name: "",
          customer_document: "",
          discount: "",
          products: [
            { name: "", price: 0, quantity: 1, warranty_conditions: "" },
          ],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const watchedProducts = watch("products");

  const calculateSubtotal = () => {
    return watchedProducts.reduce((sum, product) => {
      const total = (product.price || 0) * (product.quantity || 1);
      return sum + total;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = parseFloat(watch("discount")) || 0;
    return subtotal - discount;
  };

  const onSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      if (receipt) {
        await updateReceiptMutation.mutateAsync({
          id: receipt.id,
          data: formData,
        });
        toast.success("Receipt updated successfully!");
      } else {
        await createReceiptMutation.mutateAsync(formData);
        toast.success("Receipt created successfully!");
      }
      onClose();
    } catch {
      toast.error(
        receipt ? "Failed to update receipt" : "Failed to create receipt",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const addProduct = () => {
    append({ name: "", price: 0, quantity: 1, warranty_conditions: "" });
  };

  const removeProduct = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="max-h-[90%] overflow-auto bg-white dark:bg-black border-2 border-black dark:border-white w-full max-w-4xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-bitcount text-black dark:text-white">
            {receipt ? "EDITAR FACTURA" : "NUEVA FACTURA"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 font-inconsolata"
          >
            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1 text-black dark:text-white">
                  FECHA *
                </label>
                <input
                  type="date"
                  {...register("date", { required: "La fecha es obligatoria" })}
                  className="w-full p-2 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-black dark:text-white"
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 text-black dark:text-white">
                  NOMBRE DEL CLIENTE *
                </label>
                <input
                  type="text"
                  {...register("customer_name", {
                    required: "El nombre del cliente es obligatorio",
                  })}
                  className="w-full p-2 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-black dark:text-white"
                  placeholder="Nombre completo"
                />
                {errors.customer_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.customer_name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 text-black dark:text-white">
                  DOCUMENTO *
                </label>
                <input
                  type="text"
                  {...register("customer_document", {
                    required: "El documento es obligatorio",
                  })}
                  className="w-full p-2 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-black dark:text-white"
                  placeholder="Número de documento"
                />
                {errors.customer_document && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.customer_document.message}
                  </p>
                )}
              </div>
            </div>

            {/* Products */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-bitcount text-black dark:text-white">
                  PRODUCTOS
                </h3>
                <button
                  type="button"
                  onClick={addProduct}
                  className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold hover:opacity-90 transition-opacity shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] active:translate-y-1 active:shadow-none transition-all"
                >
                  <Plus size={16} />
                  AGREGAR PRODUCTO
                </button>
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 border border-black dark:border-white bg-gray-50 dark:bg-gray-900/30"
                  >
                    <div>
                      <label htmlFor={`products.${index}.name`}>Nombre</label>
                      <input
                        type="text"
                        {...register(`products.${index}.name`, {
                          required: "El nombre del producto es obligatorio",
                        })}
                        className="w-full p-2 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-black dark:text-white"
                        placeholder="Nombre del producto"
                      />
                      {errors.products?.[index]?.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.products[index]?.name?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor={`products.${index}.price`}>Precio</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        {...register(`products.${index}.price`, {
                          required: "El precio es obligatorio",
                          min: {
                            value: 0.01,
                            message: "El precio debe ser mayor a 0",
                          },
                        })}
                        className="w-full p-2 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-black dark:text-white"
                        placeholder="Precio"
                      />
                      {errors.products?.[index]?.price && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.products[index]?.price?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor={`products.${index}.quantity`}>
                        Cantidad
                      </label>
                      <input
                        type="number"
                        min="1"
                        {...register(`products.${index}.quantity`, {
                          required: "La cantidad es obligatoria",
                          min: {
                            value: 1,
                            message: "La cantidad debe ser al menos 1",
                          },
                        })}
                        className="w-full p-2 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-black dark:text-white"
                        placeholder="Cant."
                      />
                      {errors.products?.[index]?.quantity && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.products[index]?.quantity?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor={`products.${index}.warranty_conditions`}>
                        Garantía
                      </label>
                      <input
                        type="text"
                        {...register(`products.${index}.warranty_conditions`)}
                        className="w-full p-2 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-black dark:text-white"
                        placeholder="Condiciones de garantía"
                      />
                    </div>

                    <div className="flex items-center">
                      <span className="text-sm font-bold text-black dark:text-white">
                        Total: $
                        {(
                          (watchedProducts[index]?.price || 0) *
                          (watchedProducts[index]?.quantity || 1)
                        ).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        disabled={fields.length === 1}
                        className={`p-2 rounded-md transition-colors ${
                          fields.length === 1
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-red-600 hover:bg-red-50"
                        }`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount (Optional)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    {...register("discount")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter discount amount"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subtotal:</span>
                    <span className="text-sm font-medium">
                      ${calculateSubtotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Discount:</span>
                    <span className="text-sm font-medium">
                      -${(parseFloat(watch("discount")) || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-black dark:border-white pt-2">
                    <span className="font-bold font-bitcount text-black dark:text-white">
                      TOTAL:
                    </span>
                    <span className="font-bold text-lg font-bitcount text-black dark:text-white">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t border-black dark:border-white">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-black dark:border-white font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-black dark:text-white"
              >
                CANCELAR
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 py-3 px-4 font-bold transition-colors border border-black dark:border-white ${
                  isSubmitting
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-black dark:bg-white text-white dark:text-black hover:opacity-90"
                }`}
              >
                {isSubmitting
                  ? "GUARDANDO..."
                  : receipt
                    ? "ACTUALIZAR FACTURA"
                    : "CREAR FACTURA"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
