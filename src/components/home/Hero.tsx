
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="bg-brand-sage py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Find Perfect Products for Your Lifestyle
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Discover high-quality products at unbeatable prices, with fast delivery and exceptional customer service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products">
              <Button className="bg-brand-teal hover:bg-opacity-90 text-white px-6 py-5 text-base">
                Shop Now
              </Button>
            </Link>
            <Link to="/categories">
              <Button variant="outline" className="border-brand-teal text-brand-teal hover:bg-brand-sage px-6 py-5 text-base">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
