import Layout from "@/components/layout/Layout";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeItem, itemCount, subtotal } = useCart();

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {items.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                />
              ))}
              
              {/* Continue shopping */}
              <div className="mt-6">
                <Link to="/products">
                  <Button variant="outline" className="text-brand-teal">
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Cart Summary */}
            <div>
              <CartSummary
                subtotal={subtotal}
                itemCount={itemCount}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="flex justify-center">
              <ShoppingBag className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-2xl font-medium mt-4">Your cart is empty</h2>
            <p className="text-gray-500 mt-2 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button className="bg-brand-teal hover:bg-opacity-90">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
