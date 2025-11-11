import { useState, useEffect } from "react";
import CatalogItem from "../catalogitem/CatalogItem";

const CatalogProduct = ({ Products, name, onHome }) => {
  const [FilteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!name || name.trim() === "") {
      setFilteredProducts(Products);
    } else if (Products && name) {
      const filtered = Products.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [Products, name]);

  return (
    <div className="bg-surface p-6 rounded-lg shadow-lg max-w-5xl mx-auto my-8 space-y-4">
      {!onHome && (
        <h3 className="text-xl font-semibold text-text-base pb-4 border-b border-border">
          {FilteredProducts.length} Results for "{name}"
        </h3>
      )}
      
      {FilteredProducts.length > 0 ? (
        FilteredProducts.map((product) => (
          <CatalogItem key={product.id} Product={product} />
        ))
      ) : (
        <p className="text-center text-text-muted py-8">No products found.</p>
      )}
    </div>
  );
};

export default CatalogProduct;