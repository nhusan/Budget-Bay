import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCreateProduct } from "../../hooks/product.hooks";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

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

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, condition: value }));
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
    <form className="space-y-6" onSubmit={handleSubmit}>
      {createProductMutation.isSuccess && (
        <div className="p-3 rounded-md text-center font-medium bg-success/10 text-success border border-success/20">
          Product created successfully!
        </div>
      )}
      {createProductMutation.isError && (
        <div className="p-3 rounded-md text-center font-medium bg-destructive/10 text-destructive border border-destructive/20">
          Failed to create product: {createProductMutation.error.message}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required disabled={isPending} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required disabled={isPending} rows="4" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input id="imageUrl" type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} disabled={isPending} placeholder="https://example.com/image.jpg" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="condition">Condition</Label>
        <Select name="condition" value={formData.condition} onValueChange={handleSelectChange} required disabled={isPending}>
            <SelectTrigger>
                <SelectValue placeholder="Select Condition" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Used">Used</SelectItem>
            </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time</Label>
          <Input id="startTime" type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required disabled={isPending} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">End Time</Label>
          <Input id="endTime" type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required disabled={isPending} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="startingPrice">Starting Price ($)</Label>
        <Input id="startingPrice" type="number" name="startingPrice" value={formData.startingPrice} onChange={handleChange} required min="0.01" step="0.01" disabled={isPending} />
      </div>
      <Button type="submit" disabled={isPending} className="w-full mt-2">
        {isPending ? 'Creating...' : 'Create Product'}
      </Button>
    </form>
  );
};

export default CreateForm;