import { useAuth } from "../../hooks/useAuth";
import styles from "./HomePage.module.css";
import SearchBar from "../../components/common/SearchBar";
import CatalogProduct from "../../components/catalogproduct/CatalogProduct";
import { useProducts } from "../../hooks/product.hooks";

const HomePage = () => {
  const { token } = useAuth();
  const { data: products, isLoading, error } = useProducts();

  return (
    <main>
      <div className={styles.homepageContainer}>
        <div className={styles.headerBlock}></div>
        {token ? (
          <div>
            <h1>Welcome Back!</h1>
            <p>You are logged in.</p>
          </div>
        ) : (
          <div>
            <h1>Welcome to BudgetBay</h1>
            <p>Please log in to manage your budget.</p>
          </div>
        )}
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
        <div className={styles.productListContainer}>
          {isLoading && <p>Loading products...</p>}
          {error && <p>Error loading products: {error.message}</p>}
          {products && <CatalogProduct onHome={true} Products={products} />}
        </div>
      </div>
    </main>
  );
};

export default HomePage;