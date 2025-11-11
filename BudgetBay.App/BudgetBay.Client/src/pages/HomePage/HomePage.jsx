import SearchBar from "../../components/common/SearchBar";
import CatalogProduct from "../../components/catalogproduct/CatalogProduct";
import { useProducts } from "../../hooks/product.hooks";

const HomePage = () => {
  const { data: products, isLoading, error } = useProducts();

  return (
    <main className="bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <div className="py-16">
          <h1 className="text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Find Your Next Great Deal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            BudgetBay is the ultimate online auction marketplace. Bid on unique items or list your own for sale.
          </p>
        </div>
        
        <SearchBar />

        <div className="mt-8">
          {isLoading && <p className="py-10 text-muted-foreground">Loading products...</p>}
          {error && <p className="py-10 text-destructive">Error loading products: {error.message}</p>}
          {products && <CatalogProduct onHome={true} Products={products} />}
        </div>
      </div>
    </main>
  );
};

export default HomePage;