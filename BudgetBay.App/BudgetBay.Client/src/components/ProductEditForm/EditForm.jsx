import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct, useUpdateProduct } from "../../hooks/product.hooks";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

const EditForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading: isLoadingProduct, error: productError } = useProduct(productId);
  const updateProductMutation = useUpdateProduct();

  const [formData, setFormData] = useState({
    name: "", description: "", imageUrl: "", condition: "0",
    endTime: "", startingPrice: "", currentPrice: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        imageUrl: product.imageUrl || "",
        condition: product.condition || "Used",
        endTime: product.endTime ? new Date(product.endTime).toISOString().slice(0, 16) : "",
        startingPrice: product.startingPrice?.toString() || "",
        currentPrice: product.currentPrice?.toString() || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, condition: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData = {
      name: formData.name,
      description: formData.description,
      imageUrl: formData.imageUrl,
      condition: formData.condition,
      endTime: formData.endTime ? new Date(formData.endTime).toISOString() : null,
      startingPrice: formData.startingPrice ? parseFloat(formData.startingPrice) : null,
      currentPrice: formData.currentPrice ? parseFloat(formData.currentPrice) : null,
    };
    updateProductMutation.mutate({ productId, data: updateData }, {
        onSuccess: () => setTimeout(() => navigate(`/products/${productId}`), 2000),
    });
  };

  if (isLoadingProduct) return <div className="text-center p-10">Loading product data...</div>;
  if (productError) return <div className="p-3 rounded-md text-center font-medium bg-destructive/10 text-destructive border-destructive/20">Failed to load product data: {productError.message}</div>;

  const isPending = updateProductMutation.isPending;

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {updateProductMutation.isSuccess && (
        <div className="p-3 rounded-md text-center font-medium bg-success/10 text-success border-success/20">
          Product updated successfully! Redirecting...
        </div>
      )}
      {updateProductMutation.isError && (
        <div className="p-3 rounded-md text-center font-medium bg-destructive/10 text-destructive border-destructive/20">
          Failed to update product: {updateProductMutation.error.message}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" name="name" value={formData.name} onChange={handleChange} disabled={isPending} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} disabled={isPending} rows="4" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input id="imageUrl" type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" disabled={isPending} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Condition</Label>
            <Select name="condition" value={formData.condition} onValueChange={handleSelectChange} disabled={isPending}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Condition" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Used">Used</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">End Time</Label>
          <Input id="endTime" type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} disabled={isPending} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="startingPrice">Starting Price ($)</Label>
          <Input id="startingPrice" type="number" name="startingPrice" value={formData.startingPrice} onChange={handleChange} min="0.01" step="0.01" placeholder="0.01" disabled={isPending} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currentPrice">Current Price ($)</Label>
          <Input id="currentPrice" type="number" name="currentPrice" value={formData.currentPrice} onChange={handleChange} min="0.01" step="0.01" placeholder="0.01" disabled={isPending} />
        </div>
      </div>
      <Button type="submit" disabled={isPending} className="w-full mt-2">
        {isPending ? 'Updating...' : 'Update Product'}
      </Button>
    </form>
  );
};

export default EditForm;