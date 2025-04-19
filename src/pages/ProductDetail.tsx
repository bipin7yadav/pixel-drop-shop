import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Star, Truck, ShieldCheck, RotateCcw, Minus, Plus, Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Database } from "@/integrations/supabase/types";

type Product = Database['public']['Tables']['products']['Row'];

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();
  const { addItem } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            id,
            name,
            slug
          )
        `)
        .eq('id', slug)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load product details. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url || "/placeholder.svg"
    });
    
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
    setIsAddingToCart(false);
  };
  
  const increaseQuantity = () => {
    if (product?.stock_quantity && quantity < product.stock_quantity) {
      setQuantity(quantity + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="w-full aspect-square" />
              <div className="flex space-x-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="w-20 h-20" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-10 w-1/2" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 mt-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden aspect-square">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.gallery && product.gallery.length > 0 && (
              <div className="flex space-x-4">
                {product.gallery.map((image, index) => (
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
            )}
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
                          i < Math.floor(product.average_rating || 0)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.average_rating?.toFixed(1)} ({product.review_count || 0} reviews)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold text-brand-teal">
                  ${product.price.toFixed(2)}
                </span>
                {product.original_price && (
                  <span className="text-gray-500 line-through">
                    ${product.original_price.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="mt-2 text-sm text-green-600 flex items-center">
                <span className="mr-1">●</span> In Stock ({product.stock_quantity} available)
              </div>
            </div>
            
            {/* Description */}
            <p className="text-gray-600">{product.description}</p>
            
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
                  disabled={product.stock_quantity ? quantity >= product.stock_quantity : false}
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
                {product.features?.map((feature, index) => (
                  <li key={index} className="text-gray-700">{feature}</li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="specifications">
              <h3 className="text-xl font-medium mb-4">Technical Specifications</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
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
                        {product.average_rating?.toFixed(1)}
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
                              i < Math.floor(product.average_rating || 0)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                    </div>
                    <p className="text-gray-500 mt-1">
                      Based on {product.review_count || 0} reviews
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
