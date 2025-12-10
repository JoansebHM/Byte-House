import { useState, useMemo, useEffect } from "react";
import Preloader from "../components/UI/Preloader";
import { usePreloader } from "../hooks/usePreloader";
import ProductCard from "../components/UI/ProductCard";
import FloatingWhatsApp from "../components/UI/FloatingWhatsApp";
import { PRODUCTS } from "../data/mockData";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SidebarFilters from "../components/UI/SidebarFilters";
import SearchBar from "../components/UI/SearchBar";
import ReviewsSection from "../components/UI/ReviewsSection";
import { Frown } from "lucide-react";

function Home() {
  const loading = usePreloader(5000);
  const [preloaderExiting, setPreloaderExiting] = useState(false);
  // Initialize showPreloader based on the initial loading state to prevent flash
  const [showPreloader, setShowPreloader] = useState(loading);

  // Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Cuando el loading termine, activar la salida del preloader
  // Re-syncing effect from original Home.tsx correctly
  // The hook returns 'loading' boolean.
  useEffect(() => {
    if (!loading) {
      setPreloaderExiting(true);
      setTimeout(() => {
        setShowPreloader(false);
      }, 1000);
    }
  }, [loading]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // ... (keeping effect)

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    // Reset page to 1 when filters change (implicitly handled if depend on filters)
    // We'll add an effect or just rely on the fact that if filters change, we want to see results from page 1? 
    // Actually better to have an effect to reset currentPage
    return PRODUCTS.filter((product) => {
      // 1. Search (Name, Description, Category)
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);

      if (!matchesSearch) return false;

      // 2. Category
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // 3. Price
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // 4. Brands
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedCategory, priceRange, selectedBrands]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, priceRange, selectedBrands]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white font-inconsolata flex flex-col transition-colors duration-300">
      <Navbar />

      {/* Preloader */}
      {showPreloader && <Preloader isExiting={preloaderExiting} />}

      <FloatingWhatsApp />

      {/* Content */}
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <SidebarFilters
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          selectedBrands={selectedBrands}
          onToggleBrand={(brand) => {
            setSelectedBrands((prev) =>
              prev.includes(brand)
                ? prev.filter((b) => b !== brand)
                : [...prev, brand]
            );
          }}
        />

        <div className="flex-grow">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          {/* Results */}
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-black dark:border-white font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit"
                  >
                    PREV
                  </button>
                  <span className="font-bold">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-black dark:border-white font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit"
                  >
                    NEXT
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-black dark:border-white border-dashed">
              <Frown size={64} className="mb-4 text-gray-400" />
              <h3 className="text-2xl font-bold mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-500 max-w-md">
                Intentaste buscar "{searchTerm}" en{" "}
                {selectedCategory || "todas las categorías"} y rango de precios ${priceRange[0]} - ${priceRange[1]}. Prueba con otros
                términos o limpia los filtros.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                  setPriceRange([0, 3000]);
                  setSelectedBrands([]);
                }}
                className="mt-6 px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                LIMPIAR FILTROS
              </button>
            </div>
          )}
        </div>
      </main>

      <ReviewsSection />

      <Footer />
    </div>
  );
}

export default Home;
