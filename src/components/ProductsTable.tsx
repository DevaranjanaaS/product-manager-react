
import React from "react";
import { useProducts } from "@/context/ProductsContext";
import { Product } from "@/types/product";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

const ProductsTable: React.FC = () => {
  const { 
    filteredProducts, 
    sortConfig, 
    setSortConfig,
    loading
  } = useProducts();

  const handleSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig(key, direction);
  };

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (filteredProducts.length === 0) {
    return <div className="text-center py-8">No products found.</div>;
  }

  return (
    <div className="w-full overflow-auto border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Image</TableHead>
            <TableHead>
              <Button 
                variant="ghost" 
                onClick={() => handleSort('title')}
                className="flex items-center gap-1"
              >
                Title {getSortIcon('title')}
              </Button>
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead>
              <Button 
                variant="ghost" 
                onClick={() => handleSort('price')}
                className="flex items-center gap-1"
              >
                Price {getSortIcon('price')}
              </Button>
            </TableHead>
            <TableHead>
              <Button 
                variant="ghost" 
                onClick={() => handleSort('stock')}
                className="flex items-center gap-1"
              >
                Stock {getSortIcon('stock')}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img 
                  src={product.thumbnail} 
                  alt={product.title} 
                  className="h-16 w-16 object-cover rounded"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "https://placehold.co/100x100?text=No+Image";
                  }}
                />
              </TableCell>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
