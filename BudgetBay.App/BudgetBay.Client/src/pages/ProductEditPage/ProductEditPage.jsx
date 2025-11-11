import EditForm from "../../components/ProductEditForm/EditForm";

const ProductEditPage = () => {
  return (
    <main className="bg-background py-10">
      <div className="card-base max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-text-base mb-6 pb-4 border-b border-border">
            Edit Product
        </h1>
        <EditForm />
      </div>
    </main>
  );
};

export default ProductEditPage;