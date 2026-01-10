import { useState, useMemo } from "react";
import ProductCard from "../components/UI/ProductCard";
import FloatingWhatsApp from "../components/UI/FloatingWhatsApp";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SidebarFilters from "../components/UI/SidebarFilters";
import SearchBar from "../components/UI/SearchBar";
import ReviewsSection from "../components/UI/ReviewsSection";
import { useProducts } from "../features/products/hooks/useProducts";
import NotFoundProd from "../components/UI/NotFoundProd";

function Home() {
  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Estado de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Fetch productos
  const {
    data: products,
    error: productsError,
    isLoading: productsLoading,
  } = useProducts();

  // Lógica de filtrado
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    return products.filter((product) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term) ||
        product.categories?.name?.toLowerCase().includes(term);

      if (!matchesSearch) return false;

      // 2. Filtro por categoría
      if (selectedCategory && product.categories?.name !== selectedCategory) {
        return false;
      }

      // 3. Filtro por precio
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // 4. Filtro por marca
      if (
        selectedBrands.length > 0 &&
        !selectedBrands.includes(product.brands?.name)
      ) {
        return false;
      }

      return true;
    });
  }, [products, searchTerm, selectedCategory, priceRange, selectedBrands]);

  // Handlers para filtros
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val: string | null) => {
    setSelectedCategory(val);
    setCurrentPage(1);
  };

  const handlePriceChange = (val: [number, number]) => {
    setPriceRange(val);
    setCurrentPage(1);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) => {
      const newState = prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand];
      setCurrentPage(1);
      return newState;
    });
  };

  // Lógica de paginación
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (productsLoading) {
    return (
      <div className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white font-inconsolata flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black dark:border-white"></div>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white font-inconsolata flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error loading products</h2>
          <p className="text-gray-500">{productsError?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white font-inconsolata flex flex-col transition-colors duration-300">
      <Navbar />

      <FloatingWhatsApp />

      {/* Content */}
      <main className="grow container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <SidebarFilters
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          selectedBrands={selectedBrands}
          onToggleBrand={handleBrandChange}
        />

        <div className="grow">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />

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
                    className="px-4 py-2 border border-black dark:border-white font-bold hover:bg-black hover: text-white dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit"
                  >
                    ANTERIOR
                  </button>
                  <span className="font-bold">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-black dark:border-white font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit"
                  >
                    SIGUIENTE
                  </button>
                </div>
              )}
            </>
          ) : (
            <NotFoundProd
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              priceRange={priceRange}
              handleSearchChange={handleSearchChange}
              handleCategoryChange={handleCategoryChange}
              handlePriceChange={handlePriceChange}
              setSelectedBrands={setSelectedBrands}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </main>

      <ReviewsSection />

      <Footer />
    </div>
  );
}

export default Home;
