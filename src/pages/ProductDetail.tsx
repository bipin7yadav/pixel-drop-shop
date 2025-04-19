
import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Star, Truck, ShieldCheck, RotateCcw, Minus, Plus, Heart, ShoppingCart } from "lucide-react";

// Mock product data - would come from API in real implementation
const product = {
  id: 1,
  name: "Wireless Bluetooth Earbuds",
  price: 59.99,
  originalPrice: 79.99,
  description: "High-quality wireless earbuds with noise cancellation technology, long battery life, and crystal-clear sound quality. Perfect for workouts, commuting, or everyday use.",
  images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  averageRating: 4.5,
  reviewCount: 128,
  stock: 15,
  features: [
    "Active noise cancellation",
    "Up to 8 hours of battery life",
    "Water and sweat resistant (IPX4)",
    "Touch controls for music and calls",
    "Compact charging case included",
    "Bluetooth 5.0 connectivity"
  ],
  variants: {
    colors: ["Black", "White", "Blue"],
    sizes: []
  },
  specifications: {
    "Bluetooth Version": "5.0",
    "Battery Life": "Up to 8 hours (earbuds) + 24 hours (case)",
    "Charging Time": "1.5 hours",
    "Water Resistance": "IPX4",
    "Microphones": "Dual microphone with noise reduction",
    "Weight": "5g per earbud, 45g charging case"
  },
  brand: "SoundTech",
  sku: "ST-EAR-001"
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedColor, setSelectedColor] = useState(product.variants.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();
  
  // In a real app, we'd fetch the product by slug
  console.log(`Fetching product with slug: ${slug}`);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Simulate adding to cart
    setTimeout(() => {
      toast({
        title: "Added to cart!",
        description: `${quantity} x ${product.name} (${selectedColor}) added to your cart.`,
      });
      setIsAddingToCart(false);
    }, 1000);
  };
  
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden aspect-square">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`border rounded-md overflow-hidden cursor-pointer w-20 h-20 ${
                    selectedImage === index ? "border-brand-teal" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            {/* Basic details */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={`${
                          i < Math.floor(product.averageRating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.averageRating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold text-brand-teal">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="mt-2 text-sm text-green-600 flex items-center">
                <span className="mr-1">●</span> In Stock ({product.stock} available)
              </div>
            </div>
            
            {/* Short description */}
            <p className="text-gray-600">{product.description}</p>
            
            {/* Color selection */}
            {product.variants.colors.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Color: {selectedColor}</h3>
                <div className="flex space-x-3">
                  {product.variants.colors.map((color) => (
                    <button
                      key={color}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-brand-teal"
                          : "border-transparent"
                      }`}
                      style={{
                        backgroundColor:
                          color.toLowerCase() === "black"
                            ? "#000"
                            : color.toLowerCase() === "white"
                            ? "#fff"
                            : color.toLowerCase(),
                      }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </Button>
                <span className="mx-4 text-lg min-w-[2rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="bg-brand-teal hover:bg-opacity-90 flex-1"
                size="lg"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
            </div>
            
            {/* Shipping & Returns */}
            <div className="border-t pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-brand-teal" />
                  <span className="text-sm">Free shipping over $100</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-2 text-brand-teal" />
                  <span className="text-sm">Secure checkout</span>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="h-5 w-5 mr-2 text-brand-teal" />
                  <span className="text-sm">30-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="mt-12">
          <Tabs defaultValue="features">
            <TabsList className="mb-6">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="space-y-4">
              <h3 className="text-xl font-medium">Key Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">{feature}</li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="specifications">
              <h3 className="text-xl font-medium mb-4">Technical Specifications</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b pb-2">
                    <span className="text-gray-600 font-medium">{key}:</span>{" "}
                    <span className="text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <h3 className="text-xl font-medium mb-4">Customer Reviews</h3>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div>
                    <div className="flex items-center">
                      <span className="text-5xl font-bold text-gray-900">
                        {product.averageRating}
                      </span>
                      <span className="text-lg text-gray-600 ml-2">/ 5</span>
                    </div>
                    <div className="flex mt-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={`${
                              i < Math.floor(product.averageRating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                    </div>
                    <p className="text-gray-500 mt-1">
                      Based on {product.reviewCount} reviews
                    </p>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-center sm:text-left mb-4">
                      Would you like to share your experience with this product?
                    </p>
                    <Button variant="outline">Write a Review</Button>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <p className="text-gray-500 text-center">
                    Sign in to view customer reviews
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
