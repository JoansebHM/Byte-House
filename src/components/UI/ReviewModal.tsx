import { X, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import type { ReviewType } from "../../features/reviews/types/review.type";

interface ReviewModalProps {
  review: ReviewType;
  onClose: () => void;
}

const ReviewModal = ({ review, onClose }: ReviewModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (review.reviews_images) {
      setCurrentImageIndex((prev) =>
        prev === (review.reviews_images?.length || 0) - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (review.reviews_images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? (review.reviews_images?.length || 0) - 1 : prev - 1
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-black w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors rounded-full border border-transparent hover:border-current"
          >
            <X size={24} />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xl rounded-full">
              {review.user_name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-xl text-black dark:text-white">
                {review.user_name}.
              </h3>
              <div className="flex gap-1 text-black dark:text-white">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < review.stars ? "currentColor" : "none"}
                    className={
                      i < review.stars
                        ? "text-current"
                        : "text-gray-300 dark:text-gray-700"
                    }
                  />
                ))}
              </div>
            </div>
            <span className="ml-auto text-sm text-gray-500 font-inconsolata">
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>

          <p className="font-inconsolata text-lg leading-relaxed mb-8 text-black dark:text-white">
            "{review.description}"
          </p>

          {review.reviews_images && review.reviews_images.length > 0 && (
            <div className="mt-4">
              <h4 className="font-bold mb-3 text-sm uppercase tracking-wider text-black dark:text-white">
                Evidencia del Producto:
              </h4>
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-900 border border-black dark:border-white group">
                <img
                  src={review.reviews_images[currentImageIndex].image_url}
                  alt={`Evidence ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />

                {review.reviews_images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                      {review.reviews_images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full ${
                            idx === currentImageIndex
                              ? "bg-white"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
