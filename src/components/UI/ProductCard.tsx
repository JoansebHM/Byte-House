import { useNavigate } from "react-router-dom";
import type { ProductType } from "../../features/products/types/product.type";
import Button from "./Button";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();


  return (
    <div
      onClick={() => navigate(`/product/${product.slug}`)}
      className="flex flex-col group cursor-pointer bg-white dark:bg-black border border-black dark:border-white p-4 transition-all hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
    >
      <div className="relative aspect-square overflow-hidden mb-4 border border-black dark:border-white">
        <img
          src={
            product.product_images.length > 0
              ? product.product_images[0].image_url
              : ""
          }
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex flex-col items-start">
          <h3 className="font-inconsolata text-lg font-bold leading-tight text-black dark:text-white group-hover:text-white dark:group-hover:text-black line-clamp-3">
            {product.name}
          </h3>
          <span className="text-xl font-inconsolata font-bold text-black dark:text-white group-hover:text-white dark:group-hover:text-black">
            ${product.price.toLocaleString("es-CO")}
          </span>
        </div>
        <p className="font-inconsolata text-sm text-gray-500 group-hover:text-gray-300 dark:text-gray-400 dark:group-hover:text-black line-clamp-2 mb-auto">
          {product.description}
        </p>
        <div className="mt-4">
          <Button label="VER DETALLES" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
