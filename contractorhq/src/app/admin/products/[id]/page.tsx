"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  image: string;
  images?: string[];
  isOnSale: boolean;
}

const UpdateProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newImageInput, setNewImageInput] = useState("");

  // Fetch the product details when the page loads
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddImage = () => {
    if (!product) return;
    
    if (newImageInput.trim().startsWith("/images/products/")) {
      setProduct({
        ...product,
        images: [...(product.images || []), newImageInput.trim()]
      });
      setNewImageInput("");
    } else {
      console.error("Additional images must be relative to /images/products/");
    }
  };

  const handleRemoveImage = (index: number) => {
    if (!product) return;
    
    setProduct({
      ...product,
      images: (product.images || []).filter((_, i) => i !== index)
    });
  };

  // Handle form submission
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    // Validate required fields
    if (!product.name || !product.price || !product.description || !product.category || !product.brand) {
      console.error("Please fill in all required fields");
      return;
    }

    // Validate image URL format
    if (product.image && !product.image.startsWith("/images/products/")) {
      console.error("Main image must be relative to /images/products/");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      router.push("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !product) {
    return (
      <div className="p-4 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold">Product not found</h2>
        <Button 
          onClick={() => router.push("/admin/products")}
          className="mt-4"
          variant="primary"
        >
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Update Product</h1>
        <Button
          variant="secondary"
          onClick={() => router.push("/admin/products")}
        >
          Back to Products
        </Button>
      </div>
      
      <form onSubmit={handleUpdate} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Name *</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Price *</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: Number(e.target.value) })
              }
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category *</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Brand *</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={product.brand}
              onChange={(e) => setProduct({ ...product, brand: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Main Image URL</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
            placeholder="/images/products/example.jpg"
          />
          {product.image && (
            <div className="mt-2">
              <div className="text-sm text-gray-500 mb-1">Image Preview:</div>
              <Image 
                src={product.image}
                width={200}
                height={200} 
                alt="Preview" 
                className="h-32 object-contain border rounded"
              />
            </div>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Additional Images</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="input input-bordered flex-1"
              value={newImageInput}
              onChange={(e) => setNewImageInput(e.target.value)}
              placeholder="/images/products/extra1.jpg"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="btn btn-secondary"
            >
              Add Image
            </button>
          </div>
          
          {product.images && product.images.length > 0 && (
            <div className="mt-3 space-y-2">
              {product.images.map((img, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm truncate">{img}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description *</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full h-32"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            required
          />
        </div>

        <div className="form-control">
          <label className="label cursor-pointer flex items-center gap-2">
            <span className="label-text">On Sale</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={product.isOnSale}
              onChange={(e) =>
                setProduct({ ...product, isOnSale: e.target.checked })
              }
            />
          </label>
        </div>

        <div className="flex gap-4 justify-end pt-4">
          <Button
            type="button"
            variant="danger"
            onClick={() => router.push("/admin/products")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductPage;
