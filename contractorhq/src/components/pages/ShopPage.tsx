"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { FiFilter } from "react-icons/fi";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  isOnSale: boolean;
  brand: string;
  category: string;
}

async function getProducts(category?: string) {
  try {
    let endpoint = "/api/products";
    if (category === "deals") endpoint = "/api/deals";
    if (category === "new") endpoint = "/api/products/new";

    const res = await fetch(endpoint);
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryFromURL = searchParams.get("category") ?? "all";

  const [selectedCategory, setSelectedCategory] =
    useState<string>(categoryFromURL);
  const [products, setProducts] = useState<Product[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSelectedCategory(categoryFromURL);
  }, [categoryFromURL]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const fetchedProducts = await getProducts(selectedCategory);
      setProducts(fetchedProducts);
      setIsLoading(false);
    };
    fetchProducts();
  }, [selectedCategory]);

  const toggleFilterVisibility = () => setIsFilterVisible(!isFilterVisible);

  const handleCategoryChange = (newCategory: string) => {
    const url = new URL(window.location.href);
    if (newCategory === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", newCategory);
    }
    window.history.replaceState({}, "", url.toString());
    setSelectedCategory(newCategory);
    setIsFilterVisible(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex items-center text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary">Shop</span>
          {selectedCategory !== "all" && (
            <>
              <span className="mx-2">/</span>
              <span className="capitalize">
                {selectedCategory === "deals"
                  ? "Special Deals"
                  : selectedCategory === "new"
                  ? "New Arrivals"
                  : "All Products"}
              </span>
            </>
          )}
        </nav>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedCategory === "deals"
              ? "Special Deals"
              : selectedCategory === "new"
              ? "New Arrivals"
              : "All Products"}
          </h1>

          <div className="flex items-center gap-4 relative">
            <button
              onClick={toggleFilterVisibility}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiFilter className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700">Filter</span>
            </button>

            {isFilterVisible && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-20">
                <h3 className="text-lg font-semibold p-4 border-b border-gray-100">
                  Filter by Category
                </h3>
                <div className="flex flex-col p-4 gap-2">
                  {["all", "deals", "new"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`py-2 px-4 text-gray-700 rounded-lg hover:bg-gray-100 ${
                        selectedCategory === cat ? "bg-gray-200" : ""
                      }`}
                    >
                      {cat === "all"
                        ? "All Products"
                        : cat === "deals"
                        ? "Special Deals"
                        : "New Arrivals"}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product grid or loader */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen sm:min-h-auto sm:py-52">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center min-h-screen">
          <p className="text-lg text-gray-500">No products found</p>
          <Link
            href="/shop"
            className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={{
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                isOnSale: product.isOnSale,
                category: product.category,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
