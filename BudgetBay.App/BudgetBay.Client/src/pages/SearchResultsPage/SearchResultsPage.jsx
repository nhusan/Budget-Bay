import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../hooks/product.hooks';
import CatalogProduct from '../../components/catalogproduct/CatalogProduct';
import SearchBar from '../../components/common/SearchBar';

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const { data: allProducts, isLoading, error } = useProducts();

    return (
        <div className="bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-5xl mx-auto space-y-6">
                    <SearchBar/>
                    <div> 
                        {isLoading ? (
                            <p className="text-center text-muted-foreground py-8">Loading products...</p>
                        ) : error ? (
                            <p className="text-center text-destructive py-8">Error: {error.message}</p>
                        ) : (
                            <CatalogProduct Products={allProducts || []} name={query} onHome={false} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultsPage;