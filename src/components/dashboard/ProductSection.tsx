import { useState, useMemo } from "react";
import { Package, Plus, Edit, Trash2, Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import CreateProductModal from "./CreateProductModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import notify from "../../utils/toast";

// Mock Data - Expanded for Pagination
const INITIAL_PRODUCTS = [
    { id: 1, name: "Teclado Mecánico RGB", description: "Switches Cherry MX Blue", price: 129.99, stock: 15, createdAt: "2023-11-15T10:00:00" },
    { id: 2, name: "Mouse Gamer Pro", description: "Sensor 25K DPI", price: 79.99, stock: 42, createdAt: "2023-11-20T14:30:00" },
    { id: 3, name: "Monitor 144Hz 27\"", description: "Panel IPS 1ms", price: 299.99, stock: 8, createdAt: "2023-10-05T09:15:00" },
    { id: 4, name: "Headset 7.1 Surround", description: "Cancelación de ruido", price: 89.99, stock: 23, createdAt: "2023-12-01T11:20:00" },
    { id: 5, name: "Silla Gamer Ergo", description: "Soporte lumbar ajustable", price: 249.99, stock: 5, createdAt: "2023-09-12T16:45:00" },
    { id: 6, name: "Webcam 4K Stream", description: "Auto-focus HDR", price: 159.99, stock: 10, createdAt: "2023-12-05T08:00:00" },
    { id: 7, name: "Microfono USB", description: "Condensador Cardioide", price: 49.99, stock: 30, createdAt: "2023-11-01T10:00:00" },
    { id: 8, name: "Mousepad XXL", description: "Superficie Speed", price: 29.99, stock: 50, createdAt: "2023-10-20T12:00:00" },
    { id: 9, name: "Gabinete ATX Flow", description: "Vidrio Templado", price: 89.99, stock: 12, createdAt: "2023-09-25T14:00:00" },
    { id: 10, name: "Fuente 750W Gold", description: "Modular", price: 119.99, stock: 18, createdAt: "2023-11-10T11:30:00" },
    { id: 11, name: "RAM 32GB DDR5", description: "6000MHz RGB", price: 189.99, stock: 25, createdAt: "2023-12-08T09:00:00" },
    { id: 12, name: "SSD NVMe 2TB", description: "Gen 4 7000MB/s", price: 149.99, stock: 40, createdAt: "2023-11-05T15:20:00" },
];

const ITEMS_PER_PAGE = 5;

const ProductSection = () => {
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);

    // Filter & Pagination State
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("recent"); // recent, oldest, price-asc, price-desc
    const [currentPage, setCurrentPage] = useState(1);

    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; productId: number | null; productName: string }>({
        isOpen: false,
        productId: null,
        productName: "",
    });

    const handleDeleteClick = (product: any) => {
        setDeleteModal({ isOpen: true, productId: product.id, productName: product.name });
    };

    const confirmDelete = () => {
        if (deleteModal.productId) {
            setProducts(products.filter((p) => p.id !== deleteModal.productId));
            setDeleteModal({ isOpen: false, productId: null, productName: "" });
            notify.delete("Producto eliminado correctamente");
        }
    };

    const handleEditClick = (product: any) => {
        setEditingProduct(product);
        setIsCreateModalOpen(true);
    };

    const handleCreateOrUpdate = (formData: any) => {
        if (editingProduct) {
            // Update existing product
            setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p));
            notify.success("Producto actualizado correctamente");
        } else {
            // Create new product
            const newProduct = {
                id: Math.max(...products.map(p => p.id)) + 1,
                ...formData,
                createdAt: new Date().toISOString()
            };
            setProducts([newProduct, ...products]);
            notify.success("Producto creado exitosamente");
        }
    };

    // Filter Logic
    const filteredProducts = useMemo(() => {
        let result = products.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        switch (sortOption) {
            case "recent":
                result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case "oldest":
                result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            case "price-asc":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                result.sort((a, b) => b.price - a.price);
                break;
            case "name-asc":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        return result;
    }, [products, searchTerm, sortOption]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 font-inconsolata">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 border border-black dark:border-white bg-white dark:bg-black">
                <div>
                    <h2 className="text-3xl font-bold font-bitcount text-black dark:text-white">
                        PRODUCTOS
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Gestiona tu inventario ({products.length} total)
                    </p>
                </div>

                <button
                    onClick={() => {
                        setEditingProduct(null);
                        setIsCreateModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold hover:opacity-90 transition-opacity shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] active:translate-y-1 active:shadow-none transition-all"
                >
                    <Plus size={20} />
                    AGREGAR PRODUCTO
                </button>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 p-4 border border-black dark:border-white bg-gray-50 dark:bg-gray-900/30">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset to page 1 on search
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
            {filteredProducts.length === 0 ? (
                <div className="min-h-[300px] flex items-center justify-center border border-dashed border-gray-400 rounded-lg p-12">
                    <div className="text-center">
                        <Package size={48} className="mx-auto mb-4 text-gray-400" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            No se encontraron productos
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Intenta con otra búsqueda o filtro.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="p-4 border border-black dark:border-white bg-white dark:bg-black hover:shadow-lg transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
                                    <Package className="text-black dark:text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold font-bitcount text-black dark:text-white">{product.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{product.description}</p>
                                    <div className="flex gap-4 mt-1 items-center">
                                        <span className="font-bold text-black dark:text-white">${product.price}</span>
                                        <span className="text-gray-500 text-xs">Stock: {product.stock}</span>
                                        <span className="text-gray-400 text-xs hidden md:inline">• {new Date(product.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEditClick(product)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded transition-colors"
                                    title="Editar"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(product)}
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
                            className={`w-10 h-10 border border-black dark:border-white rounded font-bold transition-colors ${currentPage === page
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-black dark:border-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}

            <CreateProductModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateOrUpdate}
                initialData={editingProduct}
            />

            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                onConfirm={confirmDelete}
                productName={deleteModal.productName}
            />
        </div>
    );
};

export default ProductSection;
