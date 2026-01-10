import { Edit3, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface ProductImage {
  id: number;
  image_url: string;
  is_main: boolean;
}

interface ProductImageCarouselProps {
  images: ProductImage[];
  onAddImage: () => void;
  onEditImage: (imageId: number) => void;
  onDeleteImage: (imageId: number) => void;
  onSetMainImage: (imageId: number) => void;
}

const ProductImageCarousel = ({
  images,
  onAddImage,
  onEditImage,
  onDeleteImage,
  onSetMainImage,
}: ProductImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8">
        <div className="text-center">
          <div className="mb-4">
            <Plus className="mx-auto h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No hay imágenes
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Añade la primera imagen del producto
          </p>
          <button
            onClick={onAddImage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Añadir imagen
          </button>
        </div>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Imagen principal */}
      <div className="relative mb-4">
        <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <img
            src={currentImage.image_url}
            alt={`Imagen ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Controles de navegación */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Controles de imagen actual */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => onEditImage(currentImage.id)}
            className="bg-blue-500/80 hover:bg-blue-600 text-white p-2 rounded-md transition-colors"
            title="Editar imagen"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDeleteImage(currentImage.id)}
            className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-md transition-colors"
            title="Eliminar imagen"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Indicador de imagen principal */}
        {currentImage.is_main && (
          <div className="absolute top-2 left-2">
            <span className="bg-green-500/80 text-white px-2 py-1 rounded-md text-xs font-medium">
              Principal
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails y controles */}
      <div className="flex items-center gap-4">
        <div className="flex-1 flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <div key={image.id} className="flex-shrink-0">
              <div
                className={`relative cursor-pointer transition-all ${
                  index === currentIndex
                    ? "ring-2 ring-blue-500"
                    : "hover:ring-2 hover:ring-gray-300"
                }`}
              >
                <div
                  className="aspect-square w-20 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden"
                  onClick={() => goToImage(index)}
                >
                  <img
                    src={image.image_url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Checkbox para imagen principal */}
                <div className="absolute -top-2 -right-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={image.is_main}
                      onChange={() => onSetMainImage(image.id)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        image.is_main
                          ? "bg-green-500 border-green-500"
                          : "bg-white border-gray-300 hover:border-green-400"
                      }`}
                    >
                      {image.is_main && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </label>
                </div>

                {/* Indicador de imagen principal en thumbnail */}
                {image.is_main && (
                  <div className="absolute bottom-0 left-0 right-0 bg-green-500/80 text-white text-xs text-center py-1">
                    Principal
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Botón para añadir imagen */}
        <button
          onClick={onAddImage}
          className="flex-shrink-0 aspect-square w-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          title="Añadir imagen"
        >
          <Plus className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      {/* Contador de imágenes */}
      {images.length > 1 && (
        <div className="text-center mt-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentIndex + 1} de {images.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductImageCarousel;
