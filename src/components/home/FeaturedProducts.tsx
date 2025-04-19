
import ProductCard from "../products/ProductCard";

// Mock data - would come from API in real implementation
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    price: 59.99,
    image: "/placeholder.svg",
    slug: "wireless-bluetooth-earbuds",
    averageRating: 4.5,
  },
  {
    id: 2,
    name: "Minimalist Analog Watch",
    price: 79.99,
    image: "/placeholder.svg",
    slug: "minimalist-analog-watch",
    averageRating: 4.8,
  },
  {
    id: 3,
    name: "HD Webcam with Microphone",
    price: 49.99,
    image: "/placeholder.svg",
    slug: "hd-webcam-with-microphone",
    averageRating: 4.2,
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    price: 39.99,
    image: "/placeholder.svg",
    slug: "portable-bluetooth-speaker",
    averageRating: 4.6,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Featured Products
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Explore our handpicked selection of top products
        </p>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <a 
            href="/products" 
            className="inline-block px-6 py-3 rounded-md bg-brand-teal text-white hover:bg-opacity-90 transition-colors"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
