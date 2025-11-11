import EditForm from "../../components/ProductEditForm/EditForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const ProductEditPage = () => {
  return (
    <main className="bg-background py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Edit Product
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EditForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default ProductEditPage;