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
      throw new Error("Product not found");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default function ProductPageWrapper() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [showThumbnails, setShowThumbnails] = useState(true);

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
        <span className="text-primary">Loading Product...</span>
        <span>Please wait!</span>
      </div>
    );

  const images = [product.image, ...(product.images || [])];

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8 min-h-screen">
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
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Mobile thumbnail toggle button */}
          <button
            className="lg:hidden flex items-center gap-2 text-sm text-gray-600 mb-2"
            onClick={() => setShowThumbnails(!showThumbnails)}
          >
            {showThumbnails ? "Hide thumbnails" : "Show thumbnails"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${showThumbnails ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Thumbnails on the left - shown on desktop, toggleable on mobile */}
          {(showThumbnails || window.innerWidth >= 1024) && (
            <div className="flex flex-row sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:h-[500px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pb-2 sm:pb-0">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 border cursor-pointer rounded-md overflow-hidden transition-all ${
                    img === mainImage ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-gray-300"
                  }`}
                  onClick={() => setMainImage(img)}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}  // Fixed width for image
                    height={80}  // Fixed height for image
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Main Image */}
          <div className="flex-1 relative w-full h-80 sm:h-[500px]">
            {mainImage && (
              <Image
                src={mainImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-lg object-contain"
                priority
              />
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2">
            <span className={`text-xl sm:text-2xl ${product.isOnSale ? "text-red-500" : "text-gray-900"}`}>
              ${product.price}
            </span>
            {product.isOnSale && (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                SALE
              </span>
            )}
          </div>

          <div className="pt-4 border-t border-gray-200 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
