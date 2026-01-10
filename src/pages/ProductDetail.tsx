import { ArrowLeft, MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageModal from "../components/UI/ImageModal";
import { useProduct } from "../features/products/hooks/useProduct";

const phoneNumber = "3003138134";

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

const ProductDetail = () => {
  const { slug } = useParams();
  const { data: product, error, isLoading: loading } = useProduct(slug || "");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    author: "",
    rating: 5,
    comment: "",
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.author && newReview.comment) {
      const review: Review = {
        id: Date.now(),
        author: newReview.author,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toLocaleDateString(),
      };
      setReviews([review, ...reviews]);
      setNewReview({ author: "", rating: 5, comment: "" });
      setShowReviewForm(false);
    }
  };

  const renderStars = (
    rating: number,
    interactive = false,
    onRatingChange?: (rating: number) => void
  ) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={`${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={
              interactive && onRatingChange
                ? () => onRatingChange(star)
                : undefined
            }
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white font-inconsolata transition-colors duration-300">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black dark:border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white font-inconsolata transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error loading product</h2>
          <p className="text-gray-500">{error.message}</p>
        </div>
      </div>
    );
  }

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

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    `Hola, me gustaría más información sobre ${product.id} - *${product.name}*`
  )}`;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

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
              src={
                product.product_images.length > 0
                  ? product.product_images[0].image_url
                  : ""
              }
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.product_images?.map((imgObj, idx) => (
              <div
                key={idx}
                onClick={() => setIsModalOpen(true)}
                className="aspect-square border border-black dark:border-white overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img
                  src={imgObj.image_url}
                  alt={`${product.name} ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {product.categories?.name}
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

          <div className="prose dark:prose-invert font-inconsolata text-lg leading-relaxed">
            <p>{product.stock} Disponibles</p>
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

      {/* Reviews Section */}
      <div className="max-w-6xl mx-auto mt-16 border-t border-black dark:border-white pt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Reseñas</h2>
            {reviews.length > 0 && (
              <div className="flex items-center gap-2">
                {renderStars(Math.round(averageRating))}
                <span className="text-lg">
                  {averageRating.toFixed(1)} ({reviews.length} reseñas)
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-6 py-2 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            AGREGAR RESEÑA
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="mb-8 p-6 border border-black dark:border-white">
            <h3 className="text-xl font-bold mb-4">Agregar Reseña</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Nombre</label>
                <input
                  type="text"
                  value={newReview.author}
                  onChange={(e) =>
                    setNewReview({ ...newReview, author: e.target.value })
                  }
                  className="w-full p-3 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">
                  Calificación
                </label>
                {renderStars(newReview.rating, true, (rating) =>
                  setNewReview({ ...newReview, rating })
                )}
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">
                  Comentario
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  rows={4}
                  className="w-full p-3 border border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  PUBLICAR RESEÑA
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-6 py-2 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  CANCELAR
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No hay reseñas aún. ¡Sé el primero en dejar una reseña!
            </p>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="p-6 border border-black dark:border-white"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold">{review.author}</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {review.date}
                  </span>
                </div>
                <div className="mb-2">{renderStars(review.rating)}</div>
                <p className="text-gray-700 dark:text-gray-300">
                  {review.comment}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <ImageModal
        images={product.product_images || []}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProductDetail;
