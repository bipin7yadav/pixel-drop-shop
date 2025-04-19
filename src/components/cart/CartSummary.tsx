import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface CartSummaryProps {
  subtotal: number;
  itemCount: number;
}

const CartSummary = ({ subtotal, itemCount }: CartSummaryProps) => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const handleApplyPromo = () => {
    if (!promoCode) {
      toast.error("Please enter a promo code");
      return;
    }

    setIsApplyingPromo(true);
    // Simulate API call
    setTimeout(() => {
      toast.error("Invalid promo code");
      setIsApplyingPromo(false);
    }, 1000);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Items ({itemCount})</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          {shipping > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              Add ${(100 - subtotal).toFixed(2)} more to get free shipping
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button
              variant="outline"
              onClick={handleApplyPromo}
              disabled={isApplyingPromo}
            >
              Apply
            </Button>
          </div>
        </div>
        
        <Button 
          className="w-full bg-brand-teal hover:bg-opacity-90"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
