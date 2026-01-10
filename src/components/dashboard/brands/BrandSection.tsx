import { useState } from "react";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import { useBrands } from "../../../features/brands/hooks/useBrands";
import type { BrandType } from "../../../features/brands/types/brand.type";
import BrandModal from "../modals/CreateBrandModal";

const ITEMS_PER_PAGE = 5;

const BrandSection = () => {
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useBrands();

  const [selectedBrand, setSelectedBrand] = useState<BrandType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Filter & Pagination State
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination Logic
  const totalPages = Math.ceil((productsData?.length ?? 0) / ITEMS_PER_PAGE);
  const currentBrands = productsData?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleEdit = (brand: BrandType) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const handleDelete = (brand: BrandType) => {
    setSelectedBrand(brand);
    setIsDeleteModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (productsLoading) {
    return <div>Cargando productos...</div>;
  }

  if (productsError) {
    return <div>Error al cargar productos: {productsError.message}</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-inconsolata">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 border border-black dark:border-white bg-white dark:bg-black">
        <div>
          <h2 className="text-3xl font-bold font-bitcount text-black dark:text-white">
            MARCAS
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona tu inventario ({productsData?.length ?? 0} total)
          </p>
        </div>

        <button
          onClick={() => {
            setIsModalOpen(true);
            setSelectedBrand(null);
          }}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold hover:opacity-90 transition-opacity shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] active:translate-y-1 active:shadow-none transition-all"
        >
          <Plus size={20} />
          AGREGAR MARCA
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 p-4 border border-black dark:border-white bg-gray-50 dark:bg-gray-900/30">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-black dark:border-white bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-black dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 min-w-[200px]">
          <Filter size={20} className="text-black dark:text-white" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="flex-1 p-2 border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white focus:outline-none cursor-pointer"
          >
            <option value="recent">Más Recientes</option>
            <option value="oldest">Más Antiguos</option>
            <option value="price-desc">Precio (Mayor a Menor)</option>
            <option value="price-asc">Precio (Menor a Mayor)</option>
            <option value="name-asc">Nombre (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      {currentBrands?.length === 0 ? (
        <div className="min-h-[300px] flex items-center justify-center border border-dashed border-gray-400 rounded-lg p-12">
          <div className="text-center">
            <Package size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No se encontraron marcas
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Intenta con otra búsqueda o filtro.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {currentBrands?.map((brand) => (
            <div
              key={brand.id}
              className="p-4 border border-black dark:border-white bg-white dark:bg-black hover:shadow-lg transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
                  <Package className="text-black dark:text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-bitcount text-black dark:text-white">
                    {brand.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(brand)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded transition-colors"
                  title="Editar"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(brand)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded transition-colors"
                  title="Eliminar"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 border border-black dark:border-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 border border-black dark:border-white rounded font-bold transition-colors ${
                currentPage === page
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="p-2 border border-black dark:border-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {isModalOpen && (
        <BrandModal
          onClose={() => setIsModalOpen(false)}
          brand={selectedBrand!}
        />
      )}

      {isDeleteModalOpen && selectedBrand && (
        <DeleteConfirmationModal
          onClose={() => setIsDeleteModalOpen(false)}
          table="brands"
          data={{
            id: selectedBrand.id,
            name: selectedBrand.name,
          }}
        />
      )}
    </div>
  );
};

export default BrandSection;
