import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { Loader2, Save, X } from 'lucide-react';

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
  is_on_sale: boolean;
  sale_price?: number;
}

export default function AddEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<Product>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image_url: '',
    stock: 0,
    is_on_sale: false,
    sale_price: 0
  });

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setProduct(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch product details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(product)
          .eq('id', id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Product updated successfully.",
        });
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert([product]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Product created successfully.",
        });
      }
      navigate('/products');
    } catch (error) {
      toast({
        title: "Error",
        description: id ? "Failed to update product." : "Failed to create product.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {id ? 'Edit Product' : 'Add New Product'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={product.image_url}
                onChange={(e) => setProduct({ ...product, image_url: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={product.stock}
                onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) })}
                required
                min="0"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_on_sale"
                checked={product.is_on_sale}
                onChange={(e) => setProduct({ ...product, is_on_sale: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="is_on_sale">On Sale</Label>
            </div>

            {product.is_on_sale && (
              <div>
                <Label htmlFor="sale_price">Sale Price</Label>
                <Input
                  id="sale_price"
                  type="number"
                  value={product.sale_price}
                  onChange={(e) => setProduct({ ...product, sale_price: parseFloat(e.target.value) })}
                  min="0"
                  step="0.01"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => navigate('/products')}
              disabled={isLoading}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 