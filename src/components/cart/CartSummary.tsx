
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface CartSummaryProps {
  subtotal: number;
  itemCount: number;
  isLoading?: boolean;
}

const CartSummary = ({ subtotal, itemCount, isLoading = false }: CartSummaryProps) => {
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Default tax and shipping values for the demo
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  const handleApplyPromo = () => {
    if (!promoCode) return;
    
    setIsApplyingPromo(true);
    
    // Simulate promo code check
    setTimeout(() => {
      toast({
        title: "Invalid promo code",
        description: "The promo code you entered is invalid or has expired.",
        variant: "destructive",
      });
      setIsApplyingPromo(false);
    }, 1000);
  };
  
  const handleCheckout = () => {
    // Would redirect to checkout page or begin Stripe checkout process
    navigate("/checkout");
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="font-medium text-lg mb-4">Order Summary</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({itemCount} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
      </div>
      
      {/* Promo code */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <Input
            placeholder="Promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="text-sm"
          />
          <Button 
            variant="outline" 
            onClick={handleApplyPromo}
            disabled={isApplyingPromo || !promoCode}
            className="border-brand-teal text-brand-teal"
          >
            {isApplyingPromo ? "Applying..." : "Apply"}
          </Button>
        </div>
      </div>
      
      {/* Total */}
      <div className="flex justify-between items-center font-medium mb-6 text-lg">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      
      {/* Checkout button */}
      <Button 
        className="w-full bg-brand-teal hover:bg-opacity-90"
        onClick={handleCheckout}
        disabled={isLoading || itemCount === 0}
      >
        {isLoading ? "Processing..." : "Proceed to Checkout"}
      </Button>
      
      {/* Accepted payment methods */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 mb-2">We accept</p>
        <div className="flex justify-center space-x-2">
          <div className="w-8 h-5 bg-gray-800 rounded"></div>
          <div className="w-8 h-5 bg-blue-600 rounded"></div>
          <div className="w-8 h-5 bg-red-500 rounded"></div>
          <div className="w-8 h-5 bg-yellow-500 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
