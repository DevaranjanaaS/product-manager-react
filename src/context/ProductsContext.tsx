
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, NewProduct } from "@/types/product";
import { fetchProducts, fetchCategories } from "@/services/productsAPI";
import { toast } from "@/components/ui/use-toast";

interface Category {
  slug: string;
  name: string;
  url: string;
}

interface ProductsContextType {
  products: Product[];
  filteredProducts: Product[];
  categories: Category[] | string[];
  searchTerm: string;
  selectedCategory: string;
  sortConfig: {
    key: string;
    direction: string;
  };
  loading: boolean;
  error: string | null;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortConfig: (key: string, direction: string) => void;
  addProduct: (product: NewProduct) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[] | string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all-categories");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const productsData = await fetchProducts();
        setProducts(productsData.products);
        setFilteredProducts(productsData.products);
        
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all-categories') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Product];
        const bValue = b[sortConfig.key as keyof Product];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'ascending' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'ascending' 
            ? aValue - bValue 
            : bValue - aValue;
        }
        return 0;
      });
    }

    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, sortConfig]);

  const handleSetSortConfig = (key: string, direction: string) => {
    setSortConfig({ key, direction });
  };

  const addProduct = (newProduct: NewProduct) => {
    const product: Product = {
      id: Math.max(...products.map(p => p.id)) + 1,
      title: newProduct.title,
      description: "Product description",
      price: newProduct.price,
      discountPercentage: 0,
      rating: 0,
      stock: newProduct.stock,
      brand: "Brand",
      category: newProduct.category,
      thumbnail: newProduct.thumbnail || "https://placehold.co/100x100",
      images: [newProduct.thumbnail || "https://placehold.co/100x100"],
    };

    setProducts(prev => [product, ...prev]);
    toast({
      title: "Success",
      description: "Product added successfully!",
    });
  };

  const value = {
    products,
    filteredProducts,
    categories,
    searchTerm,
    selectedCategory,
    sortConfig,
    loading,
    error,
    setSearchTerm,
    setSelectedCategory,
    setSortConfig: handleSetSortConfig,
    addProduct,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
