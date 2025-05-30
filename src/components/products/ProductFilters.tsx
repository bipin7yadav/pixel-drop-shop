import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Database } from '@/integrations/supabase/types';

type Category = Database['public']['Tables']['categories']['Row'];

interface ProductFiltersProps {
  categories: Category[];
  onFilterChange: (filters: {
    category: string;
    minPrice: number;
    maxPrice: number;
    search: string;
  }) => void;
  onApplyFilters: () => void;
  currentFilters: {
    category: string;
    minPrice: number;
    maxPrice: number;
    search: string;
  };
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ 
  categories, 
  onFilterChange,
  onApplyFilters,
  currentFilters 
}) => {
  const [localFilters, setLocalFilters] = useState(currentFilters);

  useEffect(() => {
    // Update local filters when currentFilters change from parent
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const handleCategoryChange = (value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      category: value
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setLocalFilters(prev => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1]
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    onApplyFilters();
  };

  return (
    <div className="space-y-4">
      <div className="mb-6 space-y-4 md:space-y-0 md:flex md:flex-wrap md:gap-4 md:items-center">
        <Input 
          placeholder="Search products..." 
          className="w-full md:w-64"
          value={localFilters.search}
          onChange={handleSearchChange}
        />

        <Select 
          value={localFilters.category} 
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="w-full md:w-64">
          <div className="text-sm mb-2">
            Price Range: ${localFilters.minPrice} - ${localFilters.maxPrice}
          </div>
          <Slider
            defaultValue={[localFilters.minPrice, localFilters.maxPrice]}
            min={0}
            max={1000}
            step={10}
            value={[localFilters.minPrice, localFilters.maxPrice]}
            onValueChange={handlePriceChange}
          />
        </div>
      </div>

      <Button 
        className="w-full md:w-auto"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default ProductFilters;
