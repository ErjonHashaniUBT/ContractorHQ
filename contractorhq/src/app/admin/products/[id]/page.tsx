"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  image: string;
  isOnSale: boolean;
}

const UpdateProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  // Handle form submission
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

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
      alert("Error updating product");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!product) {
    return <div className="p-4">Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Product</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="form-control">
          <label className="label">Product Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Price</label>
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

        <div className="form-control">
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Category</label>
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
          <label className="label">Brand</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={product.brand}
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Image URL</label>
          <input
            type="url"
            className="input input-bordered w-full"
            value={product.image || ""}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
            placeholder="Optional image URL"
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

        <div className="flex gap-2">
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="w-52"
          >
            {isLoading ? "Updating..." : "Update Product"}
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={() => router.push("/admin/products")}
            className="w-52"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductPage;
