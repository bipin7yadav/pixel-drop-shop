import Layout from "@/components/layout/Layout";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight, ShoppingCart, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useClerkAuth } from '@/contexts/ClerkAuthContext';
import { useToast } from '@/components/ui/use-toast';

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, itemCount, subtotal } = useCart();
  const { isAuthenticated } = useClerkAuth();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to proceed with checkout.",
        action: (
          <Button variant="default" onClick={() => navigate('/sign-in')}>
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        ),
      });
      return;
    }
    navigate('/checkout');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        
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
              <Button 
                className="w-full mt-4" 
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="flex justify-center">
              <ShoppingCart className="h-16 w-16 text-gray-300" />
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
