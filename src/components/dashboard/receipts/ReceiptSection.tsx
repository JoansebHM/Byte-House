import { useState, useMemo } from "react";
import {
  Receipt,
  Plus,
  Edit,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
} from "lucide-react";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import CreateReceiptModal from "../modals/CreateReceiptModal";
import {
  useReceipts,
//   useDeleteReceipt,
  useGenerateReceiptPDF,
} from "../../../features/receipts/hooks/useReceipts";
import type { ReceiptType } from "../../../features/receipts/types/receipt.type";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 5;

const ReceiptSection = () => {
  const {
    data: receiptsData,
    error: receiptsError,
    isLoading: receiptsLoading,
  } = useReceipts();

//   const deleteReceiptMutation = useDeleteReceipt();
  const generatePDFMutation = useGenerateReceiptPDF();

  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptType | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedReceipts = useMemo(() => {
    if (!receiptsData) return [];

    const result = receiptsData.filter(
      (receipt) =>
        receipt.customer_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        receipt.customer_document
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
    );

    return result;
  }, [receiptsData, searchTerm, sortOption]);

  const totalPages = Math.ceil(
    filteredAndSortedReceipts.length / ITEMS_PER_PAGE,
  );
  const currentReceipts = filteredAndSortedReceipts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleEdit = (receipt: ReceiptType) => {
    setSelectedReceipt(receipt);
    setIsModalOpen(true);
  };

  const handleDelete = (receipt: ReceiptType) => {
    setSelectedReceipt(receipt);
    setIsDeleteModalOpen(true);
  };

  const handleGeneratePDF = async (receipt: ReceiptType) => {
    try {
      const pdfBlob = await generatePDFMutation.mutateAsync({
        date: receipt.date,
        products: receipt.products,
        customer_name: receipt.customer_name,
        customer_document: receipt.customer_document,
        discount: receipt.discount,
      });

      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `receipt-${receipt.id}-${receipt.customer_name}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("PDF generated successfully!");
    } catch {
      toast.error("Failed to generate PDF");
    }
  };

  const handleCreateNew = () => {
    setSelectedReceipt(null);
    setIsModalOpen(true);
  };

  if (receiptsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (receiptsError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading receipts</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-inconsolata">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 border border-black dark:border-white bg-white dark:bg-black">
        <div>
          <h2 className="text-3xl font-bold font-bitcount text-black dark:text-white">
            FACTURAS
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona tus facturas ({filteredAndSortedReceipts.length} facturas)
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold hover:opacity-90 transition-opacity shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] active:translate-y-1 active:shadow-none transition-all"
        >
          <Plus size={20} />
          NUEVA FACTURA
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 p-4 border border-black dark:border-white bg-gray-50 dark:bg-gray-900/30">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar por cliente o documento..."
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
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 p-2 border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white focus:outline-none cursor-pointer"
          >
            <option value="recent">Más Recientes</option>
            <option value="oldest">Más Antiguos</option>
            <option value="amount-desc">Mayor Monto</option>
            <option value="amount-asc">Menor Monto</option>
            <option value="customer-asc">Cliente A-Z</option>
          </select>
        </div>
      </div>

      {currentReceipts.length === 0 ? (
        <div className="min-h-[300px] flex items-center justify-center border border-dashed border-gray-400 p-12">
          <div className="text-center">
            <Receipt size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No se encontraron facturas
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm
                ? "No hay facturas que coincidan con tu búsqueda."
                : "Comienza creando una nueva factura."}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {currentReceipts.map((receipt) => (
            <div
              key={receipt.id}
              className="p-4 border border-black dark:border-white bg-white dark:bg-black hover:shadow-lg transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-800">
                  <Receipt className="text-black dark:text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-bitcount text-black dark:text-white">
                    {receipt.customer_name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Doc: {receipt.customer_document}
                  </p>
                  <div className="flex gap-4 mt-1 items-center">
                    <span className="text-gray-500 text-xs">
                      {receipt.products.length} producto
                      {receipt.products.length !== 1 ? "s" : ""}
                    </span>
                    <span className="text-gray-400 text-xs hidden md:inline">
                      • {new Date(receipt.date).toLocaleDateString()}
                    </span>
                    {receipt.discount && (
                      <span className="text-green-600 text-xs">
                        Desc: ${parseFloat(receipt.discount).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleGeneratePDF(receipt)}
                  className="p-2 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20 transition-colors"
                  title="Descargar PDF"
                >
                  <Download size={18} />
                </button>
                <button
                  onClick={() => handleEdit(receipt)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 transition-colors"
                  title="Editar factura"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(receipt)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                  title="Eliminar factura"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 border border-black dark:border-white font-bold transition-colors ${
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
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="p-2 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {isModalOpen && (
        <CreateReceiptModal
          onClose={() => {
            setIsModalOpen(false);
            setSelectedReceipt(null);
          }}
          receipt={selectedReceipt}
        />
      )}

      {isDeleteModalOpen && selectedReceipt && (
        <DeleteConfirmationModal
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedReceipt(null);
          }}
          table="receipts"
          data={{ id: selectedReceipt.id, name: selectedReceipt.customer_name }}
        />
      )}
    </div>
  );
};

export default ReceiptSection;
