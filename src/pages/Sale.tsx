import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import ProductSort from '@/components/products/ProductSort';
import Layout from '@/components/layout/Layout';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';
import { toast } from 'sonner';

const Sale = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 12;
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 1000,
    search: ''
  });

  useEffect(() => {
    fetchCategories();
    fetchSaleProducts();
  }, []);

  useEffect(() => {
    fetchSaleProducts();
  }, [sortOrder, currentPage]);

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

      if (data) setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    }
  };

  const fetchSaleProducts = async () => {
    setLoading(true);
    try {
      // Count query for pagination
      let countQuery = supabase
        .from('products')
        .select('id', { count: 'exact' });
      
      if (filters.category && filters.category !== 'all') {
        countQuery = countQuery.eq('category_id', filters.category);
      }
      
      if (filters.minPrice !== undefined) {
        countQuery = countQuery.gte('price', filters.minPrice);
      }
      
      if (filters.maxPrice !== undefined) {
        countQuery = countQuery.lte('price', filters.maxPrice);
      }
      
      if (filters.search) {
        countQuery = countQuery.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }
      
      const { count, error: countError } = await countQuery;
      
      if (countError) {
        console.error('Error counting products:', countError);
      } else {
        setTotalPages(Math.ceil((count || 0) / productsPerPage));
      }

      // Main query for products
      let query = supabase
        .from('products')
        .select(`
          *,
          categories (
            id,
            name,
            slug
          )
        `);

      if (filters.category && filters.category !== 'all') {
        query = query.eq('category_id', filters.category);
      }

      if (filters.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice);
      }

      if (filters.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }

      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      // Apply sorting
      switch (sortOrder) {
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'price-asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price-desc':
          query = query.order('price', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      // Apply pagination
      const from = (currentPage - 1) * productsPerPage;
      const to = from + productsPerPage - 1;
      query = query.range(from, to);

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching sale products:', error);
        toast.error('Failed to load sale products');
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching sale products:', error);
      toast.error('Failed to load sale products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  const handleApplyFilters = () => {
    setCurrentPage(1); // Reset to first page when filters are applied
    fetchSaleProducts(); // Fetch products with new filters
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="w-full min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Special Offers</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover amazing deals and discounts on our featured products. Limited time offers available!
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <ProductFilters 
              categories={categories} 
              onFilterChange={handleFilterChange}
              onApplyFilters={handleApplyFilters}
              currentFilters={filters}
            />
            <div className="mt-4 md:mt-0">
              <ProductSort onSortChange={handleSortChange} />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-muted-foreground">No sale products found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or check back later for new deals</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image_url: product.image_url,
                      average_rating: product.average_rating
                    }}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {/* First page */}
                    <PaginationItem>
                      <PaginationLink 
                        isActive={currentPage === 1}
                        onClick={() => handlePageChange(1)}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>

                    {/* Show ellipsis if current page is far from start */}
                    {currentPage > 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* Middle pages */}
                    {[...Array(Math.min(5, totalPages - 2))].map((_, i) => {
                      const page = currentPage <= 3
                        ? i + 2
                        : currentPage >= totalPages - 2
                        ? totalPages - 4 + i
                        : currentPage - 2 + i;
                      
                      if (page > 1 && page < totalPages) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink 
                              isActive={currentPage === page}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      return null;
                    })}

                    {/* Show ellipsis if current page is far from end */}
                    {currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* Last page */}
                    {totalPages > 1 && (
                      <PaginationItem>
                        <PaginationLink 
                          isActive={currentPage === totalPages}
                          onClick={() => handlePageChange(totalPages)}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Sale; 