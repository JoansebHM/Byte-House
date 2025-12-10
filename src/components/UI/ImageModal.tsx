import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ImageModalProps {
    images: string[];
    isOpen: boolean;
    onClose: () => void;
}

const ImageModal = ({ images, isOpen, onClose }: ImageModalProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!isOpen) return null;

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors"
            >
                <X size={32} />
            </button>

            <div className="relative w-full max-w-4xl max-h-[90vh] flex items-center justify-center p-4">
                <img
                    src={images[currentIndex]}
                    alt={`View ${currentIndex + 1}`}
                    className="max-h-[85vh] max-w-full object-contain border border-white/20"
                    onClick={(e) => e.stopPropagation()}
                />

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-4 p-2 bg-black border border-white text-white hover:bg-white hover:text-black transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 p-2 bg-black border border-white text-white hover:bg-white hover:text-black transition-colors"
                        >
                            <ChevronRight size={24} />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentIndex(idx);
                                    }}
                                    className={`w-3 h-3 border border-white ${currentIndex === idx ? "bg-white" : "bg-transparent"
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageModal;
