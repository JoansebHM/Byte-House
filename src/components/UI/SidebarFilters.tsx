import { CATEGORIES, BRANDS } from "../../data/mockData";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

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
    const max = 3000;
    const [localMin, setLocalMin] = useState(priceRange[0]);
    const [localMax, setLocalMax] = useState(priceRange[1]);

    // Update local state when props change
    useEffect(() => {
        setLocalMin(priceRange[0]);
        setLocalMax(priceRange[1]);
    }, [priceRange]);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Math.min(Number(e.target.value), localMax - 50);
        setLocalMin(val);
        onPriceChange([val, localMax]);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Math.max(Number(e.target.value), localMin + 50);
        setLocalMax(val);
        onPriceChange([localMin, val]);
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
                        className={`text-left py-2 px-2 transition-colors uppercase font-bold text-sm ${selectedCategory === null
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
                            className={`text-left py-2 px-2 transition-colors uppercase font-bold text-sm ${selectedCategory === cat
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
                    PRECIO
                </h3>
                <div className="relative h-20 pt-6">
                    {/* Display Values */}
                    <div className="flex justify-between font-bold text-sm mb-4">
                        <span>${localMin}</span>
                        <span>${localMax}</span>
                    </div>

                    <div className="relative h-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                        {/* Active Track */}
                        <div
                            className="absolute h-full bg-black dark:bg-white rounded-full"
                            style={{
                                left: `${(localMin / max) * 100}%`,
                                right: `${100 - (localMax / max) * 100}%`,
                            }}
                        ></div>

                        {/* Range Inputs */}
                        <input
                            type="range"
                            min={min}
                            max={max}
                            value={localMin}
                            onChange={handleMinChange}
                            className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <input
                            type="range"
                            min={min}
                            max={max}
                            value={localMax}
                            onChange={handleMaxChange}
                            className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                        />

                        {/* Custom Thumbs (Visual Only - absolute positioned based on percentages) */}
                        <div
                            className="absolute w-4 h-4 bg-black dark:bg-white border-2 border-white dark:border-black rounded-full top-1/2 -translate-y-1/2 pointer-events-none transform -translate-x-1/2"
                            style={{ left: `${(localMin / max) * 100}%` }}
                        ></div>
                        <div
                            className="absolute w-4 h-4 bg-black dark:bg-white border-2 border-white dark:border-black rounded-full top-1/2 -translate-y-1/2 pointer-events-none transform -translate-x-1/2"
                            style={{ left: `${(localMax / max) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="font-bold text-xl mb-4 border-b border-black dark:border-white pb-2">
                    MARCAS
                </h3>
                <div className="space-y-2">
                    {BRANDS.map((brand) => (
                        <label key={brand} className="flex items-center gap-2 cursor-pointer">
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
        <aside className="w-full md:w-64 flex-shrink-0 text-black dark:text-white">
            {/* Mobile View - Collapsible */}
            <div className="md:hidden mb-8">
                <details className="group border border-black dark:border-white bg-transparent">
                    <summary className="flex cursor-pointer items-center justify-between p-4 font-bold text-lg select-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                        <span>FILTROS</span>
                        <ChevronDown className="transition-transform duration-300 group-open:rotate-180" size={20} />
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
