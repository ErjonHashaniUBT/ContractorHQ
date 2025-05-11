"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
    if (confirm("Are you sure you want to delete this product?")) {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      fetchProducts();
    }
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
      alert("Please provide a valid main image URL.");
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
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Product Page</h1>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-lg p-6 rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Add New Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="input"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            className="input"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="input"
          />
          <input
            type="text"
            placeholder="Brand"
            value={newProduct.brand}
            onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
            className="input"
          />
        </div>

        <input
          type="text"
          placeholder="Main Image URL (/images/products/...)"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          className="input"
        />

        {/* Additional Images Input */}
        <div>
          <label className="block text-gray-700 font-medium">Additional Images</label>
          <div className="flex gap-3 mt-2">
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
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Add Image
            </button>
          </div>

          <ul className="mt-3 space-y-2">
            {(newProduct.images || []).map((img, i) => (
              <li key={i} className="flex justify-between items-center text-gray-700">
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
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="input p-3 h-40 resize-none"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={newProduct.isOnSale}
            onChange={(e) => setNewProduct({ ...newProduct, isOnSale: e.target.checked })}
            className="h-4 w-4"
          />
          <span className="text-gray-700">On Sale</span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Product
        </button>
      </form>

      {/* Product List */}
      <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="w-32 h-32 object-cover mb-4 rounded-md"
            />
            <h3 className="font-semibold text-xl text-gray-800">{product.name}</h3>
            <p className="text-gray-600 text-sm">${product.price}</p>
            <p className="text-gray-500 text-xs">{product.category}</p>

            <div className="mt-4 flex gap-4">
              <Link
                href={`/admin/products/${product._id}`}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                ✏️ Edit
              </Link>
              <button
                onClick={() => handleDelete(product._id)}
                className="text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
