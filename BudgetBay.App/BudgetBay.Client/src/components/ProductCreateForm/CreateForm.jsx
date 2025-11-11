import { useState } from "react";
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
        if (name === "startingPrice") {
            updated.currentPrice = value;
        }
        return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFormData = { ...formData, sellerId: user?.sub };
    createProductMutation.mutate(finalFormData, {
      onSuccess: () => {
        setFormData({ ...initialFormData, sellerId: user?.sub || '' });
      },
      onError: (error) => {
        if (error.response?.status === 401) logout();
      }
    });
  };

  const isPending = createProductMutation.isPending;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {createProductMutation.isSuccess && (
        <div className="p-3 rounded-md text-center font-medium bg-green-100 text-green-800 border border-green-200">
          Product created successfully!
        </div>
      )}
      {createProductMutation.isError && (
        <div className="p-3 rounded-md text-center font-medium bg-red-100 text-red-800 border border-red-200">
          Failed to create product: {createProductMutation.error.message}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-base mb-1">Name</label>
        <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required disabled={isPending} className="input-base" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-text-base mb-1">Description</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required disabled={isPending} className="input-base" rows="4" />
      </div>
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-text-base mb-1">Image URL</label>
        <input id="imageUrl" type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} disabled={isPending} className="input-base" />
      </div>
      <div>
        <label htmlFor="condition" className="block text-sm font-medium text-text-base mb-1">Condition</label>
        <select id="condition" name="condition" value={formData.condition} onChange={handleChange} required disabled={isPending} className="input-base">
          <option value="">Select Condition</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-text-base mb-1">Start Time</label>
          <input id="startTime" type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required disabled={isPending} className="input-base" />
        </div>
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-text-base mb-1">End Time</label>
          <input id="endTime" type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required disabled={isPending} className="input-base" />
        </div>
      </div>
      <div>
        <label htmlFor="startingPrice" className="block text-sm font-medium text-text-base mb-1">Starting Price ($)</label>
        <input id="startingPrice" type="number" name="startingPrice" value={formData.startingPrice} onChange={handleChange} required min="0.01" step="0.01" disabled={isPending} className="input-base" />
      </div>
      <button type="submit" disabled={isPending} className="btn-primary w-full mt-2">
        {isPending ? 'Creating...' : 'Create Product'}
      </button>
    </form>
  );
};

export default CreateForm;