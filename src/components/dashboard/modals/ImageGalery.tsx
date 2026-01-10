import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import type { ProductType } from "../../../features/products/types/product.type";
import { supabase } from "../../../supabase/supabase";
import ProductImageCarousel from "../ProductImageCarousel";

type ImageGaleryProps = {
  onClose: () => void;
  product?: ProductType | null;
};

function ImageGalery({ onClose, product }: ImageGaleryProps) {
  const [images, setImages] = useState(product?.product_images || []);
  const [uploading, setUploading] = useState(false);

  const handleAddImage = () => {
    // Crear input file para seleccionar imagen
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && product) {
        await uploadImage(file);
      }
    };
    input.click();
  };

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);

      // Generar nombre único para el archivo
      const fileExt = file.name.split(".").pop();
      const fileName = `${product?.id}_${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // Subir imagen a Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Obtener URL pública de la imagen
      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      // Guardar referencia en la base de datos
      const { data: imageData, error: dbError } = await supabase
        .from("product_images")
        .insert({
          product_id: product?.id,
          image_url: urlData.publicUrl,
          is_main: images.length === 0, // Primera imagen es principal por defecto
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Actualizar estado local
      setImages([...images, imageData]);
      toast.success("Imagen añadida correctamente");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleEditImage = (imageId: number) => {
    // Crear input file para cambiar imagen
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        await replaceImage(imageId, file);
      }
    };
    input.click();
  };

  const replaceImage = async (imageId: number, file: File) => {
    try {
      setUploading(true);

      const image = images.find((img) => img.id === imageId);
      if (!image) return;

      // Generar nombre único para el archivo
      const fileExt = file.name.split(".").pop();
      const fileName = `${product?.id}_${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // Subir nueva imagen
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Obtener URL pública de la nueva imagen
      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      // Actualizar referencia en la base de datos
      const { error: dbError } = await supabase
        .from("product_images")
        .update({ image_url: urlData.publicUrl })
        .eq("id", imageId);

      if (dbError) throw dbError;

      // Actualizar estado local
      setImages(images.map((img) =>
        img.id === imageId ? { ...img, image_url: urlData.publicUrl } : img
      ));

      toast.success("Imagen actualizada correctamente");
    } catch (error) {
      console.error("Error replacing image:", error);
      toast.error("Error al actualizar la imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    try {
      const { error } = await supabase
        .from("product_images")
        .delete()
        .eq("id", imageId);

      if (error) throw error;

      // Actualizar estado local
      setImages(images.filter((img) => img.id !== imageId));
      toast.success("Imagen eliminada correctamente");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Error al eliminar la imagen");
    }
  };

  const handleSetMainImage = async (imageId: number) => {
    try {
      // Desmarcar todas las imágenes como principales
      await supabase
        .from("product_images")
        .update({ is_main: false })
        .eq("product_id", product?.id);

      // Marcar la imagen seleccionada como principal
      await supabase
        .from("product_images")
        .update({ is_main: true })
        .eq("id", imageId);

      // Actualizar estado local
      setImages(images.map((img) => ({
        ...img,
        is_main: img.id === imageId,
      })));

      toast.success("Imagen principal actualizada");
    } catch (error) {
      console.error("Error setting main image:", error);
      toast.error("Error al establecer imagen principal");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="max-h-[90vh] overflow-auto bg-white dark:bg-black border-2 border-black dark:border-white w-full max-w-4xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-bitcount text-black dark:text-white">
            GALERÍA DE IMÁGENES - {product?.name?.toUpperCase()}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
            disabled={uploading}
          >
            <X size={24} />
          </button>
        </div>

        {uploading && (
          <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-md">
            <p className="text-blue-700 dark:text-blue-300">
              Subiendo imagen...
            </p>
          </div>
        )}

        <div className="font-inconsolata">
          <ProductImageCarousel
            images={images}
            onAddImage={handleAddImage}
            onEditImage={handleEditImage}
            onDeleteImage={handleDeleteImage}
            onSetMainImage={handleSetMainImage}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black font-bold border-2 border-black dark:border-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
          >
            CERRAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageGalery;
