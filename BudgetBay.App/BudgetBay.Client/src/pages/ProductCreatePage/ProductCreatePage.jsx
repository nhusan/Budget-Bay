import CreateForm from '../../components/ProductCreateForm/CreateForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const ProductCreatePage = () => {
    return (
        <main className="py-10">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-center text-3xl font-bold">List a New Product</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateForm />
                </CardContent>
            </Card>
        </main>
    );
};

export default ProductCreatePage;