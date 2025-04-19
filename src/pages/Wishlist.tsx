import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '@/contexts/WishlistContext';
import Layout from '@/components/layout/Layout';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const [loading, setLoading] = useState(false);

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      setLoading(true);
      await removeFromWishlist(productId);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        
        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-4">Add items to your wishlist to save them for later</p>
            <Button onClick={() => navigate('/products')}>Browse Products</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/products/${item.slug}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      disabled={loading}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist; 