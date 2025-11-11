import { useState, useEffect } from "react";
import CatalogItem from "../catalogitem/CatalogItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

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

  if (onHome) {
    // Render without a wrapping card on the homepage for a cleaner look
    return (
        <div className="space-y-4">
            {FilteredProducts.length > 0 ? (
                FilteredProducts.map((product) => (
                    <CatalogItem key={product.id} Product={product} />
                ))
            ) : (
                <p className="text-center text-muted-foreground py-8">No products found.</p>
            )}
        </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {FilteredProducts.length} Results for "{name}"
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {FilteredProducts.length > 0 ? (
          FilteredProducts.map((product) => (
            <CatalogItem key={product.id} Product={product} />
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">No products found.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CatalogProduct;