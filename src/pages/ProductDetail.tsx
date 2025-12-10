import { ArrowLeft, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageModal from "../components/UI/ImageModal";
import { PRODUCTS } from "../data/mockData";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const product = PRODUCTS.find((p) => p.id === id);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white font-inconsolata transition-colors duration-300">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-2 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                    >
                        VOLVER AL INICIO
                    </button>
                </div>
            </div>
        );
    }

    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(
        `Hola, estoy interesado en el producto: ${product.name}`
    )}`;

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-inconsolata p-4 md:p-8 transition-colors duration-300">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-8 hover:underline"
            >
                <ArrowLeft size={20} />
                VOLVER
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-6xl mx-auto">
                {/* Gallery */}
                <div className="space-y-4">
                    <div
                        onClick={() => setIsModalOpen(true)}
                        className="aspect-square w-full border border-black dark:border-white overflow-hidden cursor-pointer group"
                    >
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((img, idx) => (
                            <div
                                key={idx}
                                onClick={() => setIsModalOpen(true)}
                                className="aspect-square border border-black dark:border-white overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                            >
                                <img
                                    src={img}
                                    alt={`${product.name} ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-6">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {product.category}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                            {product.name}
                        </h1>
                        <p className="text-3xl font-bold border-b border-black dark:border-white pb-4 inline-block">
                            ${product.price}
                        </p>
                    </div>

                    <div className="prose dark:prose-invert font-inconsolata text-lg leading-relaxed">
                        <p>{product.description}</p>
                    </div>

                    <div className="pt-8 space-y-4">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-3 py-4 bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white text-lg font-bold hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all duration-300"
                        >
                            <MessageCircle size={24} />
                            CONTACTAR AL VENDEDOR
                        </a>
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                            * Redirige a WhatsApp para coordinar la compra
                        </p>
                    </div>
                </div>
            </div>

            <ImageModal
                images={product.images}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default ProductDetail;
