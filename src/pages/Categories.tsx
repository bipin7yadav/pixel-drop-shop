import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';

type Category = Database['public']['Tables']['categories']['Row'];
type Product = Database['public']['Tables']['products']['Row'];

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryProducts, setCategoryProducts] = useState<Record<string, Product[]>>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
        return;
      }

      if (data) {
        setCategories(data);
        // Fetch products for each category
        data.forEach(category => {
          fetchProductsForCategory(category.id);
        });
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsForCategory = async (categoryId: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryId)
        .limit(4);

      if (error) {
        console.error(`Error fetching products for category ${categoryId}:`, error);
        return;
      }

      if (data) {
        setCategoryProducts(prev => ({
          ...prev,
          [categoryId]: data
        }));
      }
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
    }
  };

  return (
    <Layout>
      <div className="w-full min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">All Categories</h1>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map(category => (
                <div key={category.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative aspect-video">
                    <img
                      src={category.image_url || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h2 className="text-xl font-semibold text-white">{category.name}</h2>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {categoryProducts[category.id]?.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {categoryProducts[category.id].map(product => (
                          <div key={product.id} className="aspect-square">
                            <img
                              src={product.image_url || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-32 flex items-center justify-center text-gray-500">
                        No products in this category yet
                      </div>
                    )}
                    
                    <Link
                      to={`/products?category=${category.id}`}
                      className="block w-full text-center py-2 px-4 bg-brand-teal text-white rounded-md hover:bg-opacity-90 transition-colors"
                    >
                      View All Products
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories; 