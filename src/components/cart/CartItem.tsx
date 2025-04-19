
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    variant?: {
      size?: string;
      color?: string;
    };
  };
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) => {
  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    onRemoveItem(item.id);
  };

  return (
    <div className="flex py-4 border-b">
      {/* Product image */}
      <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Product details */}
      <div className="ml-4 flex-grow">
        <h4 className="font-medium text-gray-900">{item.name}</h4>
        
        {/* Variant details if available */}
        {item.variant && (
          <div className="text-sm text-gray-500 mt-1">
            {item.variant.size && <span>Size: {item.variant.size}</span>}
            {item.variant.size && item.variant.color && <span className="mx-1">|</span>}
            {item.variant.color && <span>Color: {item.variant.color}</span>}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-2">
          {/* Price */}
          <span className="font-medium text-brand-teal">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
          
          {/* Quantity controls */}
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="mx-2 w-8 text-center">{item.quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={handleIncrease}
            >
              <Plus className="h-3 w-3" />
            </Button>
            
            {/* Remove button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-4 text-gray-400 hover:text-red-500"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
