import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../hooks/product.hooks';
import styles from './SearchResultsPage.module.css';
import CatalogProduct from '../../components/catalogproduct/CatalogProduct';
import SearchBar from '../../components/common/SearchBar';

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const { data: allProducts, isLoading, error } = useProducts();

    return (
        <main className={styles.mainbackground}>
            <div className={styles.resultsContainer}>
                <SearchBar/>
                {isLoading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : (
                    <CatalogProduct Products={allProducts || []} name={query} />
                )}
            </div>
        </main>
    );
};

export default SearchResultsPage;