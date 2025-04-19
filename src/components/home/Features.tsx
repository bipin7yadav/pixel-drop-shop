
import { Truck, ShieldCheck, RotateCcw, Clock } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Free Shipping",
    description: "Free shipping on all orders over $50",
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Secure Payment",
    description: "100% secure payment methods",
  },
  {
    icon: <RotateCcw className="w-8 h-8" />,
    title: "Easy Returns",
    description: "30-day money back guarantee",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "24/7 Support",
    description: "Customer service available 24/7",
  },
];

const Features = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-4"
            >
              <div className="text-brand-teal mb-3">
                {feature.icon}
              </div>
              <h3 className="font-medium text-lg mb-1">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
