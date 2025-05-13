
import React from "react";
import { ProductsProvider } from "@/context/ProductsContext";
import ProductsTable from "./ProductsTable";
import SearchBar from "./SearchBar";
import AddProductModal from "./AddProductModal";

const ProductDashboard: React.FC = () => {
  return (
    <ProductsProvider>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Product Manager</h1>
          <AddProductModal />
        </div>
        <SearchBar />
        <ProductsTable />
      </div>
    </ProductsProvider>
  );
};

export default ProductDashboard;
