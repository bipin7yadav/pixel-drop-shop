
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import ProductSort from "@/components/products/ProductSort";

// Mock data - would come from API in real implementation
const mockProducts = [
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
  {
    id: 5,
    name: "Ultra-light Running Shoes",
    price: 89.99,
    image: "/placeholder.svg",
    slug: "ultra-light-running-shoes",
    averageRating: 4.7,
  },
  {
    id: 6,
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    image: "/placeholder.svg",
    slug: "stainless-steel-water-bottle",
    averageRating: 4.4,
  },
  {
    id: 7,
    name: "Adjustable Standing Desk",
    price: 299.99,
    image: "/placeholder.svg",
    slug: "adjustable-standing-desk",
    averageRating: 4.9,
  },
  {
    id: 8,
    name: "Ergonomic Office Chair",
    price: 189.99,
    image: "/placeholder.svg",
    slug: "ergonomic-office-chair",
    averageRating: 4.5,
  },
];

const Products = () => {
  const [products, setProducts] = useState(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState("popular");
  const [filters, setFilters] = useState({
    price: [0, 1000],
    categories: [],
    brands: [],
  });
  
  const handleSortChange = (sortValue: string) => {
    setSortOption(sortValue);
    // Would make API call with new sort in real implementation
    // For demo, we'll just sort the mock data
    sortProducts(sortValue);
  };
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // Would make API call with new filters in real implementation
  };
  
  const sortProducts = (sortBy: string) => {
    const sortedProducts = [...products];
    
    switch (sortBy) {
      case "price-asc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // In a real app, would sort by date
        break;
      case "rating":
        sortedProducts.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
      default:
        // Most popular (default)
        break;
    }
    
    setProducts(sortedProducts);
  };

  useEffect(() => {
    // Would fetch products from API in real implementation
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar - mobile collapsible, desktop fixed */}
          <aside className="md:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilters onFilterChange={handleFilterChange} />
            </div>
          </aside>
          
          {/* Products grid */}
          <div className="flex-1">
            {/* Sort controls */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-500">
                Showing <span className="font-medium">{products.length}</span> products
              </p>
              <ProductSort onSortChange={handleSortChange} />
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((skeleton) => (
                  <div key={skeleton} className="border rounded-lg p-4 animate-pulse">
                    <div className="bg-gray-200 aspect-square w-full mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
