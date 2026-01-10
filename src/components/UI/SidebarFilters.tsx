import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useCategories } from "../../features/categories/hooks/useCategories";
import PriceRangeSelector from "./PriceRangeSelector";
import { useBrands } from "../../features/brands/hooks/useBrands";
import Button from "./Button";

interface SidebarFiltersProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
}

const SidebarFilters = ({
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  selectedBrands,
  onToggleBrand,
}: SidebarFiltersProps) => {
  const min = 0;
  const max = 5000000;
  const [localMin, setLocalMin] = useState(priceRange[0]);
  const [localMax, setLocalMax] = useState(priceRange[1]);

  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useCategories();

  const {
    data: brands,
    error: brandsError,
    isLoading: brandsLoading,
  } = useBrands();

  useEffect(() => {
    setLocalMin(priceRange[0]);
    setLocalMax(priceRange[1]);
  }, [priceRange]);

  const onClearFilters = () => {
    onSelectCategory(null);
    onPriceChange([min, max]);
    selectedBrands.forEach((brand) => onToggleBrand(brand));
  };

  if (categoriesLoading || brandsLoading) {
    return <div>Loading filters...</div>;
  }

  if (categoriesError || brandsError) {
    return (
      <div>
        Error loading filters:{" "}
        {categoriesError?.message || brandsError?.message}
      </div>
    );
  }

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-bold text-xl mb-4 border-b border-black dark:border-white pb-2">
          CATEGORIAS
        </h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onSelectCategory(null)}
            className={`cursor-pointer text-left py-2 px-2 transition-colors uppercase font-bold text-sm ${
              selectedCategory === null
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            }`}
          >
            TODAS
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`cursor-pointer text-left py-2 px-2 transition-colors uppercase font-bold text-sm ${
                selectedCategory === cat.name
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-xl mb-4 border-b border-black dark:border-white pb-2">
          RANGO DE PRECIO
        </h3>
        <PriceRangeSelector
          minPrice={min}
          maxPrice={max}
          priceRange={[localMin, localMax]}
          onPriceChange={onPriceChange}
        />
      </div>
      <div>
        <h3 className="font-bold text-xl mb-4 border-b border-black dark:border-white pb-2">
          MARCAS
        </h3>
        <div className="space-y-2">
          {brands?.map((brand) => (
            <label
              key={brand.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                className="accent-black dark:accent-white h-4 w-4"
                checked={selectedBrands.includes(brand.name)}
                onChange={() => onToggleBrand(brand.name)}
              />
              <span className="font-bold text-sm uppercase">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <aside className="w-full md:w-64 shrink-0 text-black dark:text-white">
      {/* Mobile View - Collapsible */}
      <div className="md:hidden mb-8">
        <details className="group border border-black dark:border-white bg-transparent">
          <summary className="flex cursor-pointer items-center justify-between p-4 font-bold text-lg select-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
            <span>FILTROS</span>
            <ChevronDown
              className="transition-transform duration-300 group-open:rotate-180"
              size={20}
            />
          </summary>
          <div className="p-4 border-t border-black dark:border-white bg-gray-50 dark:bg-gray-900/50">
            <FilterContent />
          </div>
        </details>
      </div>

      <div className="hidden md:block">
        <FilterContent />
      </div>
      <div className="mt-4">
        <Button label="LIMPIAR FILTROS" onClick={onClearFilters} />
      </div>
    </aside>
  );
};

export default SidebarFilters;
