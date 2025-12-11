import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/product.type";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  console.log({ product });
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer bg-white dark:bg-black border border-black dark:border-white p-4 transition-all hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
    >
      <div className="relative aspect-square overflow-hidden mb-4 border border-black dark:border-white">
        <img
          src={product.images ? product.images[0] : ""}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="font-inconsolata text-lg font-bold leading-tight text-black dark:text-white group-hover:text-white dark:group-hover:text-black">
            {product.name}
          </h3>
          <span className="font-inconsolata font-bold text-black dark:text-white group-hover:text-white dark:group-hover:text-black">
            ${product.price}
          </span>
        </div>
        <p className="font-inconsolata text-sm text-gray-500 group-hover:text-gray-300 dark:text-gray-400 dark:group-hover:text-black line-clamp-2">
          {product.description}
        </p>
        <button className="w-full mt-auto py-2 px-4 bg-white dark:bg-black border border-black dark:border-white text-black dark:text-white font-inconsolata font-bold hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black transition-colors">
          VER DETALLES
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
