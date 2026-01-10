import { X } from "lucide-react";
import type { ProductType } from "../../../features/products/types/product.type";
import { useForm } from "react-hook-form";
import { supabase } from "../../../supabase/supabase";
import toast from "react-hot-toast";
import { generateSlug } from "../../../utils/slug";
import { useBrands } from "../../../features/brands/hooks/useBrands";
import { useCategories } from "../../../features/categories/hooks/useCategories";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ImageGalery from "./ImageGalery";

interface ProductModalProps {
  onClose: () => void;
  product?: ProductType | null;
}

const ProductModal = ({ onClose, product }: ProductModalProps) => {
  const [galeryOpen, setGalleryOpen] = useState(false);

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    Partial<ProductType> & {
      category_id: number;
      brand_id: number;
    }
  >({
    defaultValues: product ? product : undefined,
  });

  const { data: brandsData } = useBrands();
  const { data: categoriesData } = useCategories();

  const onSubmit = async (
    formData: Partial<ProductType & { category_id: number; brand_id: number }>
  ) => {
    const { brands, categories, product_images, ...data } = formData;

    data.category_id = Number(data.category_id);
    data.brand_id = Number(data.brand_id);

    data.slug = generateSlug(data.name || "");

    if (product) {
      const { error } = await supabase
        .from("products")
        .update(data)
        .eq("id", product.id);
      if (error) {
        toast.error("Error editando producto: " + error.message);
      } else {
        toast.success("Producto actualizado correctamente");
        onClose();
      }
    } else {
      const { error } = await supabase.from("products").insert(data);
      if (error) {
        toast.error("Error creando producto: " + error.message);
      } else {
        toast.success("Producto creado correctamente");
        onClose();
      }
    }

    await queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const openGalery = () => {
    setGalleryOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="max-h-[80%] overflow-auto bg-white dark:bg-black border-2 border-black dark:border-white w-full max-w-md p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-bitcount text-black dark:text-white">
            {product ? "EDITAR PRODUCTO" : "NUEVO PRODUCTO"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 font-inconsolata"
        >
          <div>
            <label className="block text-sm font-bold mb-1 text-black dark:text-white">
              NOMBRE
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full p-2 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
              placeholder="Ej. Teclado Mecánico"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                El nombre del producto es obligatorio.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-black dark:text-white">
              DESCRIPCIÓN
            </label>
            <textarea
              {...register("description", { required: true })}
              className="w-full p-2 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all h-24 resize-none"
              placeholder="Detalles del producto..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                La descripción del producto es obligatoria.
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1 text-black dark:text-white">
                PRECIO
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                {...register("price", { required: true })}
                className="w-full p-2 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  El precio del producto es obligatorio.
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-black dark:text-white">
                STOCK
              </label>
              <input
                type="number"
                min="0"
                {...register("stock", { required: true })}
                className="w-full p-2 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                placeholder="0"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">
                  El stock del producto es obligatorio.
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-black dark:text-white">
              CATEGORÍA
            </label>
            <select
              {...register("category_id", { required: true })}
              className="w-full p-2 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            >
              <option value="">Selecciona una categoría</option>
              {categoriesData?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                La categoría del producto es obligatoria.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-black dark:text-white">
              MARCA
            </label>
            <select
              {...register("brand_id", { required: true })}
              className="w-full p-2 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            >
              <option value="">Selecciona una marca</option>
              {brandsData?.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brand_id && (
              <p className="text-red-500 text-sm mt-1">
                La marca del producto es obligatoria.
              </p>
            )}
          </div>

          <button type="button" onClick={openGalery}>
            Abrir Galeria de Imágenes (Próximamente)
          </button>

          <div className="flex gap-4 mt-8 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-black dark:border-white font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-black dark:text-white"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-black dark:bg-white text-white dark:text-black font-bold hover:opacity-90 transition-opacity border border-black dark:border-white"
            >
              GUARDAR
            </button>
          </div>
        </form>
      </div>

      {galeryOpen && (
        <ImageGalery onClose={() => setGalleryOpen(false)} product={product} />
      )}
    </div>
  );
};

export default ProductModal;
