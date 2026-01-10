import { CATEGORIES, BRANDS } from "../../data/mockData";
import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
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

  // Update local state when props change
  useEffect(() => {
    setLocalMin(priceRange[0]);
    setLocalMax(priceRange[1]);
  }, [priceRange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), localMax - 500000);
    setLocalMin(val);
    onPriceChange([val, localMax]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), localMin + 500000);
    setLocalMax(val);
    onPriceChange([localMin, val]);
  };

  const trackRef = useRef<HTMLDivElement>(null);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;

    // Clamp percentage 0-1
    const p = Math.max(0, Math.min(1, percent));
    const val = Math.round(min + p * (max - min));

    // Determine closest thumb
    const distMin = Math.abs(val - localMin);
    const distMax = Math.abs(val - localMax);

    if (distMin < distMax) {
      // Move Min
      const newVal = Math.min(val, localMax - 500000);
      setLocalMin(newVal);
      onPriceChange([newVal, localMax]);
    } else {
      // Move Max
      const newVal = Math.max(val, localMin + 500000);
      setLocalMax(newVal);
      onPriceChange([localMin, newVal]);
    }
  };

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
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`cursor-pointer text-left py-2 px-2 transition-colors uppercase font-bold text-sm ${
                selectedCategory === cat
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-xl mb-4 border-b border-black dark:border-white pb-2">
          RANGO DE PRECIO
        </h3>
        <div className="space-y-4">
          {/* Input Mínimo */}
          <div>
            <label className="block font-bold text-sm mb-2 uppercase">
              Mínimo
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-sm">
                $
              </span>
              <input
                type="text"
                // value={formatDisplayValue(localMin, isMinFocused)}
                // onChange={handleMinInputChange}
                // onFocus={() => setIsMinFocused(true)}
                // onBlur={handleMinBlur}
                // onKeyPress={handleMinKeyPress}
                className="w-full pl-7 pr-3 py-2 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                placeholder="0"
              />
            </div>
          </div>

          {/* Input Máximo */}
          <div>
            <label className="block font-bold text-sm mb-2 uppercase">
              Máximo
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-sm">
                $
              </span>
              <input
                type="text"
                // value={formatDisplayValue(localMax, isMaxFocused)}
                // onChange={handleMaxInputChange}
                // onFocus={() => setIsMaxFocused(true)}
                // onBlur={handleMaxBlur}
                // onKeyPress={handleMaxKeyPress}
                className="w-full pl-7 pr-3 py-2 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-black dark:focus: ring-white"
                placeholder="5000000"
              />
            </div>
          </div>

          {/* Botón para aplicar filtro */}
          <Button
            label="APLICAR FILTROS"
            onClick={() => {
              // handleMinBlur();
              // handleMaxBlur();
            }}
          />
          {/* <button
            onClick={() => {
              // handleMinBlur();
              // handleMaxBlur();
            }}
            className="cursor-pointer w-full py-2 bg-black text-white dark:bg-white dark:text-black font-bold uppercase text-sm hover:opacity-80 transition-opacity"
          >
            Aplicar Filtro
          </button> */}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-xl mb-4 border-b border-black dark:border-white pb-2">
          MARCAS
        </h3>
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                className="accent-black dark:accent-white h-4 w-4"
                checked={selectedBrands.includes(brand)}
                onChange={() => onToggleBrand(brand)}
              />
              <span className="font-bold text-sm uppercase">{brand}</span>
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

      {/* Desktop View - Always Open */}
      <div className="hidden md:block">
        <FilterContent />
      </div>
    </aside>
  );
};

export default SidebarFilters;
