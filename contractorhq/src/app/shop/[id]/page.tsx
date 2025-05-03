"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  isOnSale: boolean;
  brand: string;
  category: string;
  description: string;
}

async function getProduct(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/products/${id}`);

    if (!res.ok) {
      // Handle the error if product not found
      throw new Error("Product not found");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null; // Returning null in case of error
  }
}

export default function ProductPageWrapper() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProduct(id);
      setProduct(data);
      if (data) {
        setMainImage(data.image);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <div className="mx-auto flex flex-col justify-center items-center gap-2 py-52">
        <span className="text-primary text-">Loading Product...</span>
        <span>Please wait!</span>
      </div>
    );

  const images = [product.image, ...(product.images || [])];

  return (
    <div className="container mx-auto px-8 py-8 min-h-screen">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-primary">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-primary">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="flex flex-wrap gap-4">
          {/* Thumbnails on the left */}
          {images.length > 1 && (
            <div className="flex h-full flex-col gap-4 overflow-y-auto scrollbar-square">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`relative w-24 h-24 border cursor-pointer rounded-md overflow-hidden transition-transform hover:scale-105 ${
                    img === mainImage ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Main Image */}
          <div className="flex-1 relative w-full h-96">
            {mainImage && (
              <Image
                src={mainImage}
                alt={product.name}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2">
              <span
                className={`text-2xl ${
                  product.isOnSale ? "text-red-500" : "text-gray-900"
                }`}
              >
                ${product.price}
              </span>
              {product.isOnSale && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                  SALE
                </span>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200 max-h-[calc(100vh-400px)] overflow-y-auto scroll-smooth scrollbar-square">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

          <button className="mt-6 w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
