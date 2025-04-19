
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    slug: string;
    averageRating?: number;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, image, slug, averageRating } = product;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // This would be implemented with a cart context in a real application
    console.log("Added to cart:", id);
  };

  return (
    <Link to={`/products/${slug}`} className="product-card group">
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="product-image"
        />
        <Button
          size="icon"
          className="absolute bottom-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white text-brand-teal hover:bg-brand-teal hover:text-white"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-brand-teal">${price.toFixed(2)}</span>
          {averageRating && (
            <div className="flex items-center">
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="text-sm text-gray-600 ml-1">{averageRating}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
