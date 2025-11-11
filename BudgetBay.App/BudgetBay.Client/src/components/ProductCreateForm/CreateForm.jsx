import { useState } from "react";
import "./CreateForm.css";
import { useAuth } from "../../hooks/useAuth";
import { useCreateProduct } from "../../hooks/product.hooks";


const initialFormData = {
  name: "",
  description: "",
  imageUrl: "",
  condition: "",
  startTime: "",
  endTime: "",
  sellerId: "",
  startingPrice: "0.01",
  currentPrice: "0.01",
};

const CreateForm = () => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({ ...initialFormData, sellerId: user?.sub || '' });
  
  const createProductMutation = useCreateProduct();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
        const updated = { ...prev, [name]: value };
        // If starting price changes, update current price to match
        if (name === "startingPrice") {
            updated.currentPrice = value;
        }
        return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ensure sellerId is set
    const finalFormData = { ...formData, sellerId: user?.sub };

    createProductMutation.mutate(finalFormData, {
      onSuccess: () => {
        setFormData({ ...initialFormData, sellerId: user?.sub || '' }); // Reset form
      },
      onError: (error) => {
        // Handle specific errors like token expiration
        if (error.response?.status === 401) {
          logout();
        }
      }
    });
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      
      {createProductMutation.isSuccess && (
        <div className="message success">
          Product created successfully!
        </div>
      )}

      {createProductMutation.isError && (
        <div className="message error">
          Failed to create product: {createProductMutation.error.message}
        </div>
      )}

      <label>Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        disabled={createProductMutation.isPending}
      />

      <label>Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        disabled={createProductMutation.isPending}
      />

      <label>ImageUrl</label>
      <input 
        type="text" 
        name="imageUrl" 
        value={formData.imageUrl}
        onChange={handleChange} 
        disabled={createProductMutation.isPending}
      />

      <label>Condition</label>
      <select
        name="condition"
        value={formData.condition}
        onChange={handleChange}
        required
        disabled={createProductMutation.isPending}
      >
        <option value="">Select Condition</option>
        <option value="New">New</option>
        <option value="Used">Used</option>
      </select>

      <label>Start Time</label>
      <input
        type="datetime-local"
        name="startTime"
        value={formData.startTime}
        onChange={handleChange}
        required
        disabled={createProductMutation.isPending}
      />

      <label>End Time</label>
      <input
        type="datetime-local"
        name="endTime"
        value={formData.endTime}
        onChange={handleChange}
        required
        disabled={createProductMutation.isPending}
      />

      <label>Starting Price</label>
      <input
        type="number"
        name="startingPrice"
        value={formData.startingPrice}
        onChange={handleChange}
        required
        min="0.01"
        step="0.01"
        disabled={createProductMutation.isPending}
      />

      <button type="submit" disabled={createProductMutation.isPending}>
        {createProductMutation.isPending ? 'Creating...' : 'Create Product'}
      </button>
    </form>
  );
};

export default CreateForm;