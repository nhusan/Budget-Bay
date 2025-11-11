import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../hooks/product.hooks';
import CatalogProduct from '../../components/catalogproduct/CatalogProduct';
import SearchBar from '../../components/common/SearchBar';

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const { data: allProducts, isLoading, error } = useProducts();

    return (
        <main className="bg-background min-h-screen">
            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                <SearchBar/>
                <div className="mt-8">
                    {isLoading ? (
                        <p className="text-center text-text-muted py-8">Loading products...</p>
                    ) : error ? (
                        <p className="text-center text-error py-8">Error: {error.message}</p>
                    ) : (
                        <CatalogProduct Products={allProducts || []} name={query} onHome={false} />
                    )}
                </div>
            </div>
        </main>
    );
};

export default SearchResultsPage;