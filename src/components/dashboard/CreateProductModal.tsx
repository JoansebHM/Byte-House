import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface CreateProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (product: any) => void;
    initialData?: any;
}

const CreateProductModal = ({ isOpen, onClose, onSubmit, initialData }: CreateProductModalProps) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                description: initialData.description,
                price: initialData.price,
                stock: initialData.stock
            });
        } else {
            setFormData({
                name: "",
                description: "",
                price: "",
                stock: ""
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-black border-2 border-black dark:border-white w-full max-w-md p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-bitcount text-black dark:text-white">
                        {initialData ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 font-inconsolata">
                    <div>
                        <label className="block text-sm font-bold mb-1 text-black dark:text-white">
                            NOMBRE
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-2 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                            placeholder="Ej. Teclado Mecánico"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-1 text-black dark:text-white">
                            DESCRIPCIÓN
                        </label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-2 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all h-24 resize-none"
                            placeholder="Detalles del producto..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-1 text-black dark:text-white">
                                PRECIO
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full p-2 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                                placeholder="0.00"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1 text-black dark:text-white">
                                STOCK
                            </label>
                            <input
                                type="number"
                                min="0"
                                required
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                className="w-full p-2 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 border border-black dark:border-white font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-black dark:text-white"
                        >
                            CANCELAR
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 px-4 bg-black dark:bg-white text-white dark:text-black font-bold hover:opacity-90 transition-opacity border border-black dark:border-white"
                        >
                            GUARDAR
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProductModal;
