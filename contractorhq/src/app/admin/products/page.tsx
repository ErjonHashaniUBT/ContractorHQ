"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  brand: string;
  isOnSale: boolean;
  image: string;
  images?: string[];
  description: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "_id">>({
    name: "",
    price: 0,
    category: "",
    brand: "",
    isOnSale: false,
    image: "",
    images: [],
    description: "",
  });

  const [newImageInput, setNewImageInput] = useState<string>("");

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const handleAddImage = () => {
    if (newImageInput.trim().startsWith("/images/products/")) {
      setNewProduct((prev) => ({
        ...prev,
        images: [...(prev.images || []), newImageInput.trim()],
      }));
      setNewImageInput("");
    } else {
      alert("Additional images must be relative to /images/products/");
    }
  };

  const handleRemoveImage = (index: number) => {
    setNewProduct((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newProduct.image.startsWith("/images/products/")) {
      alert(
        "Please provide a valid main image URL (relative to /images/products/)."
      );
      return;
    }

    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: { "Content-Type": "application/json" },
    });

    setNewProduct({
      name: "",
      price: 0,
      category: "",
      brand: "",
      isOnSale: false,
      image: "",
      images: [],
      description: "",
    });

    fetchProducts();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛠️ Admin: Products</h1>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-6 border p-4 rounded-lg"
      >
        <h2 className="text-lg font-semibold">Add New Product</h2>

        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="input"
        />

        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
          }
          className="input"
        />

        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          className="input"
        />

        <input
          type="text"
          placeholder="Brand"
          value={newProduct.brand}
          onChange={(e) =>
            setNewProduct({ ...newProduct, brand: e.target.value })
          }
          className="input"
        />

        <input
          type="text"
          placeholder="Main Image URL (/images/products/...)"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
          className="input"
        />

        {/* Additional Images Input */}
        <div className="space-y-2">
          <label className="block font-medium">Additional Images</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="/images/products/extra1.png"
              value={newImageInput}
              onChange={(e) => setNewImageInput(e.target.value)}
              className="input flex-1"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
            >
              Add
            </button>
          </div>

          <ul className="list-disc pl-6 text-sm text-gray-700">
            {(newProduct.images || []).map((img, i) => (
              <li key={i} className="flex justify-between items-center">
                <span>{img}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="text-red-500 text-xs"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>

        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="input p-2 h-32 resize-none"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={newProduct.isOnSale}
            onChange={(e) =>
              setNewProduct({ ...newProduct, isOnSale: e.target.checked })
            }
          />
          On Sale
        </label>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>

      {/* Product List */}
      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-600">
                ${product.price} – {product.brand}
              </p>
            </div>
            <Link
              href={`/admin/products/${product._id}`}
              className="text-blue-600 hover:text-blue-800"
            >
              ✏️ Edit
            </Link>
            <button
              onClick={() => handleDelete(product._id)}
              className="text-red-500 hover:text-red-700"
            >
              🗑 Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
