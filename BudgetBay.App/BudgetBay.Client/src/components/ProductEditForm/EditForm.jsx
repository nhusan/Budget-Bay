import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditForm.css";
import { useProduct, useUpdateProduct } from "../../hooks/product.hooks";


const EditForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading: isLoadingProduct, error: productError } = useProduct(productId);
  const updateProductMutation = useUpdateProduct();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    condition: "0",
    endTime: "",
    startingPrice: "",
    currentPrice: "",
  });

  // Populate form state when product data is loaded
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        imageUrl: product.imageUrl || "",
        condition: product.condition !== undefined ? (product.condition === 'New' ? "0" : "1") : "0",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data according to UpdateProductDto
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
        onSuccess: () => {
             setTimeout(() => {
                navigate(`/products/${productId}`);
            }, 2000);
        }
    });
  };

  if (isLoadingProduct) {
    return <div className="loading">Loading product data...</div>;
  }

  if (productError) {
      return <div className="message error">Failed to load product data: {productError.message}</div>
  }

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      {updateProductMutation.isSuccess && (
        <div className="message success">
          Product updated successfully! Redirecting...
        </div>
      )}
       {updateProductMutation.isError && (
        <div className="message error">
          Failed to update product: {updateProductMutation.error.message}
        </div>
      )}

      <label>Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        disabled={updateProductMutation.isPending}
      />

      <label>Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        disabled={updateProductMutation.isPending}
      />

      <label>Image URL</label>
      <input 
        type="url" 
        name="imageUrl" 
        value={formData.imageUrl}
        onChange={handleChange} 
        placeholder="https://example.com/image.jpg"
        disabled={updateProductMutation.isPending}
      />

      <label>Condition</label>
      <select
        name="condition"
        value={formData.condition}
        onChange={handleChange}
        disabled={updateProductMutation.isPending}
      >
        <option value="0">New</option>
        <option value="1">Used</option>
      </select>

      <label>End Time</label>
      <input
        type="datetime-local"
        name="endTime"
        value={formData.endTime}
        onChange={handleChange}
        disabled={updateProductMutation.isPending}
      />

      <label>Starting Price</label>
      <input
        type="number"
        name="startingPrice"
        value={formData.startingPrice}
        onChange={handleChange}
        min="0.01"
        step="0.01"
        placeholder="0.01"
        disabled={updateProductMutation.isPending}
      />

      <label>Current Price</label>
      <input
        type="number"
        name="currentPrice"
        value={formData.currentPrice}
        onChange={handleChange}
        min="0.01"
        step="0.01"
        placeholder="0.01"
        disabled={updateProductMutation.isPending}
      />

      <button type="submit" disabled={updateProductMutation.isPending}>
          {updateProductMutation.isPending ? 'Updating...' : 'Update Product'}
      </button>
    </form>
  );
};

export default EditForm;