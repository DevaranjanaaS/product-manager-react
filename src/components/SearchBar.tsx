
import React from "react";
import { useProducts } from "@/context/ProductsContext";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const SearchBar: React.FC = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    categories, 
    selectedCategory, 
    setSelectedCategory 
  } = useProducts();

  // Helper function to safely format category names
  const formatCategoryName = (category: any): string => {
    if (typeof category === 'string') {
      return category.charAt(0).toUpperCase() + category.slice(1);
    } else if (typeof category === 'object' && category !== null && 'name' in category) {
      // Handle case where category might be an object with a name property
      return category.name;
    }
    // Fallback for other cases
    return String(category);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      <Select
        value={selectedCategory}
        onValueChange={setSelectedCategory}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-categories">All Categories</SelectItem>
          {categories.map((category) => {
            // Check if category is a valid string or object
            const categoryValue = typeof category === 'object' && category !== null && 'slug' in category 
              ? category.slug 
              : String(category);
              
            const displayName = formatCategoryName(category);
              
            return (
              <SelectItem key={categoryValue} value={categoryValue}>
                {displayName}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchBar;
