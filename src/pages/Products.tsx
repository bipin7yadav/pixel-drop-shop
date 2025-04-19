
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import Layout from '@/components/layout/Layout';

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    search: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*');

    if (data) setCategories(data);
    if (error) console.error('Error fetching categories:', error);
  };

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase
      .from('products')
      .select('*, categories(name)');

    // Apply category filter
    if (filters.category) {
      query = query.eq('categories.name', filters.category);
    }

    // Apply price range filter
    query = query.gte('price', filters.minPrice).lte('price', filters.maxPrice);

    // Apply search filter
    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (data) setProducts(data);
    if (error) console.error('Error fetching products:', error);
    setLoading(false);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Our Products</h1>
        
        <ProductFilters 
          categories={categories} 
          onFilterChange={handleFilterChange}
          currentFilters={filters}
        />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No products found matching your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
