import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct, useUpdateProduct } from "../../hooks/product.hooks";

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
        condition: product.condition === 'New' ? "0" : "1",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData = {
      name: formData.name || null,
      description: formData.description || null,
      imageUrl: formData.imageUrl || null,
      condition: parseInt(formData.condition) || 0,
      endTime: formData.endTime ? new Date(formData.endTime).toISOString() : null,
      startingPrice: formData.startingPrice ? parseFloat(formData.startingPrice) : null,
      currentPrice: formData.currentPrice ? parseFloat(formData.currentPrice) : null,
    };
    updateProductMutation.mutate({ productId, data: updateData }, {
        onSuccess: () => setTimeout(() => navigate(`/products/${productId}`), 2000),
    });
  };

  if (isLoadingProduct) return <div className="text-center p-10">Loading product data...</div>;
  if (productError) return <div className="p-3 rounded-md text-center font-medium bg-red-100 text-red-800 border border-red-200">Failed to load product data: {productError.message}</div>;

  const isPending = updateProductMutation.isPending;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {updateProductMutation.isSuccess && (
        <div className="p-3 rounded-md text-center font-medium bg-green-100 text-green-800 border border-green-200">
          Product updated successfully! Redirecting...
        </div>
      )}
      {updateProductMutation.isError && (
        <div className="p-3 rounded-md text-center font-medium bg-red-100 text-red-800 border border-red-200">
          Failed to update product: {updateProductMutation.error.message}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-base mb-1">Name</label>
        <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} disabled={isPending} className="input-base" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-text-base mb-1">Description</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} disabled={isPending} className="input-base" rows="4" />
      </div>
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-text-base mb-1">Image URL</label>
        <input id="imageUrl" type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" disabled={isPending} className="input-base" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="condition" className="block text-sm font-medium text-text-base mb-1">Condition</label>
          <select id="condition" name="condition" value={formData.condition} onChange={handleChange} disabled={isPending} className="input-base">
            <option value="0">New</option>
            <option value="1">Used</option>
          </select>
        </div>
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-text-base mb-1">End Time</label>
          <input id="endTime" type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} disabled={isPending} className="input-base" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startingPrice" className="block text-sm font-medium text-text-base mb-1">Starting Price ($)</label>
          <input id="startingPrice" type="number" name="startingPrice" value={formData.startingPrice} onChange={handleChange} min="0.01" step="0.01" placeholder="0.01" disabled={isPending} className="input-base" />
        </div>
        <div>
          <label htmlFor="currentPrice" className="block text-sm font-medium text-text-base mb-1">Current Price ($)</label>
          <input id="currentPrice" type="number" name="currentPrice" value={formData.currentPrice} onChange={handleChange} min="0.01" step="0.01" placeholder="0.01" disabled={isPending} className="input-base" />
        </div>
      </div>
      <button type="submit" disabled={isPending} className="btn-primary w-full mt-2">
        {isPending ? 'Updating...' : 'Update Product'}
      </button>
    </form>
  );
};

export default EditForm;