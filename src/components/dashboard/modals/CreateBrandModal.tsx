import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { supabase } from "../../../supabase/supabase";
import toast from "react-hot-toast";
import { generateSlug } from "../../../utils/slug";
import { useQueryClient } from "@tanstack/react-query";
import type { BrandType } from "../../../features/brands/types/brand.type";

interface BrandModalProps {
  onClose: () => void;
  brand?: BrandType | null;
}

const BrandModal = ({ onClose, brand }: BrandModalProps) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Omit<BrandType, "id">>>({
    defaultValues: brand ? brand : undefined,
  });

  const onSubmit = async (formData: Partial<BrandType>) => {
    formData.slug = generateSlug(formData.name || "");

    if (brand) {
      const { error } = await supabase
        .from("brands")
        .update(formData)
        .eq("id", brand.id);
      if (error) {
        toast.error("Error editando marca: " + error.message);
      } else {
        toast.success("Marca actualizada correctamente");
        onClose();
      }
    } else {
      const { error } = await supabase.from("brands").insert(formData);
      if (error) {
        toast.error("Error creando marca: " + error.message);
      } else {
        toast.success("Marca creada correctamente");
        onClose();
      }
    }

    await queryClient.invalidateQueries({ queryKey: ["brands"] });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="max-h-[80%] overflow-auto bg-white dark:bg-black border-2 border-black dark:border-white w-full max-w-md p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-bitcount text-black dark:text-white">
            {brand ? "EDITAR MARCA" : "NUEVA MARCA"}
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
              placeholder="Ej: Gygabyte"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                El nombre es obligatorio.
              </p>
            )}
          </div>

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
    </div>
  );
};

export default BrandModal;
