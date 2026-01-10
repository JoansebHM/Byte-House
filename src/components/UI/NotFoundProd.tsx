import { Frown } from "lucide-react";

type NotFoundProdProps = {
  searchTerm: string;
  selectedCategory: string | null;
  priceRange: [number, number];
  handleSearchChange: (term: string) => void;
  handleCategoryChange: (val: string | null) => void;
  handlePriceChange: (val: [number, number]) => void;
  setSelectedBrands: (brands: string[]) => void;
  setCurrentPage: (page: number) => void;
};

function NotFoundProd({
  searchTerm,
  selectedCategory,
  priceRange,
  handleSearchChange,
  handleCategoryChange,
  handlePriceChange,
  setSelectedBrands,
  setCurrentPage,
}: NotFoundProdProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border border-black dark:border-white border-dashed">
      <Frown size={64} className="mb-4 text-gray-400" />
      <h3 className="text-2xl font-bold mb-2">No se encontraron productos</h3>
      <p className="text-gray-500 max-w-md">
        Intentaste buscar "{searchTerm}" en{" "}
        {selectedCategory || "todas las categorías"} y rango de precios $
        {priceRange[0]} - ${priceRange[1]}. Prueba con otros términos o limpia
        los filtros.
      </p>
      <button
        onClick={() => {
          handleSearchChange("");
          handleCategoryChange(null);
          handlePriceChange([0, 5000000]);
          setSelectedBrands([]);
          setCurrentPage(1);
        }}
        className="mt-6 px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
      >
        LIMPIAR FILTROS
      </button>
    </div>
  );
}

export default NotFoundProd;
