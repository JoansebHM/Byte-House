import { AlertTriangle, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../supabase/supabase";
import toast from "react-hot-toast";

interface DeleteConfirmationModalProps {
  onClose: () => void;
  table: string;
  data: {
    id: number;
    name: string;
  };
}

const DeleteConfirmationModal = ({
  onClose,
  data,
  table,
}: DeleteConfirmationModalProps) => {
  const queryClient = useQueryClient();

  const onConfirm = async () => {
    const response = await supabase.from(table).delete().eq("id", data.id);

    if (response.error) {
      toast.error("Error eliminando elemento: " + response.error.message);
    } else {
      toast.success("Elemento eliminado correctamente");
      await queryClient.invalidateQueries({ queryKey: [table] });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-black border-2 border-red-500 w-full max-w-sm p-6 shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold font-bitcount text-red-500 flex items-center gap-2">
            <AlertTriangle />
            ELIMINAR ELEMENTO
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <p className="mb-6 font-inconsolata text-black dark:text-white">
          ¿Estás seguro que deseas eliminar{" "}
          <span className="font-bold">"{data.name}"</span>? Esta acción no se
          puede deshacer.
        </p>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-black dark:border-white font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-black dark:text-white"
          >
            CANCELAR
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2 px-4 bg-red-500 text-white font-bold hover:bg-red-600 transition-colors border border-red-500"
          >
            ELIMINAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
