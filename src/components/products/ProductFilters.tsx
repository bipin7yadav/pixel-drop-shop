
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterProps {
  onFilterChange: (filters: any) => void;
}

// Sample filter data
const categories = [
  { id: "electronics", label: "Electronics" },
  { id: "clothing", label: "Clothing" },
  { id: "home", label: "Home & Kitchen" },
  { id: "beauty", label: "Beauty & Personal Care" },
  { id: "sports", label: "Sports & Outdoors" },
];

const brands = [
  { id: "apple", label: "Apple" },
  { id: "samsung", label: "Samsung" },
  { id: "sony", label: "Sony" },
  { id: "nike", label: "Nike" },
  { id: "adidas", label: "Adidas" },
];

const ProductFilters = ({ onFilterChange }: FilterProps) => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [showCategories, setShowCategories] = useState(true);
  const [showBrands, setShowBrands] = useState(true);
  const [showPriceFilter, setShowPriceFilter] = useState(true);
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    applyFilters({ price: values });
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter(id => id !== categoryId);
    
    setSelectedCategories(newCategories);
    applyFilters({ categories: newCategories });
  };
  
  const handleBrandChange = (brandId: string, checked: boolean) => {
    const newBrands = checked
      ? [...selectedBrands, brandId]
      : selectedBrands.filter(id => id !== brandId);
    
    setSelectedBrands(newBrands);
    applyFilters({ brands: newBrands });
  };
  
  const applyFilters = (updatedFilter: any) => {
    onFilterChange({
      price: updatedFilter.price || priceRange,
      categories: updatedFilter.categories || selectedCategories,
      brands: updatedFilter.brands || selectedBrands,
    });
  };
  
  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    onFilterChange({
      price: [0, 1000],
      categories: [],
      brands: [],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={resetFilters}
          className="text-sm text-brand-teal hover:text-brand-teal hover:bg-brand-sage"
        >
          Reset All
        </Button>
      </div>
      
      {/* Categories */}
      <div className="border-b pb-4">
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => setShowCategories(!showCategories)}
        >
          <h4 className="font-medium">Categories</h4>
          {showCategories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {showCategories && (
          <div className="mt-2 space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => 
                    handleCategoryChange(category.id, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`category-${category.id}`}
                  className="text-sm cursor-pointer"
                >
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Brands */}
      <div className="border-b pb-4">
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => setShowBrands(!showBrands)}
        >
          <h4 className="font-medium">Brands</h4>
          {showBrands ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {showBrands && (
          <div className="mt-2 space-y-2">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand.id}`}
                  checked={selectedBrands.includes(brand.id)}
                  onCheckedChange={(checked) => 
                    handleBrandChange(brand.id, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`brand-${brand.id}`}
                  className="text-sm cursor-pointer"
                >
                  {brand.label}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Price Range */}
      <div>
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => setShowPriceFilter(!showPriceFilter)}
        >
          <h4 className="font-medium">Price Range</h4>
          {showPriceFilter ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {showPriceFilter && (
          <div className="mt-4 px-1">
            <Slider
              defaultValue={[0, 1000]}
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={handlePriceChange}
            />
            <div className="flex items-center justify-between mt-4">
              <Input
                type="number"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange([Number(e.target.value), priceRange[1]])}
                className="w-20 h-8 text-sm"
                min={0}
              />
              <span className="text-sm text-muted-foreground">to</span>
              <Input
                type="number"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange([priceRange[0], Number(e.target.value)])}
                className="w-20 h-8 text-sm"
                max={1000}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
