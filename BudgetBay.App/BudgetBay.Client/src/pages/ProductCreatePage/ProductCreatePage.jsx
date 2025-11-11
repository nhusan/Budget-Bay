import CreateForm from '../../components/ProductCreateForm/CreateForm';

const ProductCreatePage = () => {
    return (
        <main className="bg-background py-10">
            <div className="card-base max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-text-base mb-6 pb-4 border-b border-border">
                    List a New Product
                </h1>
                <CreateForm />
            </div>
        </main>
    );
};

export default ProductCreatePage;