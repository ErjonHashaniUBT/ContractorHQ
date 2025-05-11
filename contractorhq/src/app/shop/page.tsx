"use client";
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

    // Create absolute URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000";

    const res = await fetch(`${baseUrl}${endpoint}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Fetch products whenever the category changes
  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts(selectedCategory);
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, [selectedCategory]);

  // Toggle filter dropdown visibility
  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  // Handle category change
  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    setIsFilterVisible(false); // Close the filter after selection
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Page Header with Breadcrumbs */}
      <div className="mb-6">
        <nav className="flex items-center text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary">Shop</span>
          {selectedCategory && (
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
            {selectedCategory === "all"
              ? "All Products"
              : selectedCategory === "deals"
              ? "Special Deals"
              : selectedCategory === "new"
              ? "New Arrivals"
              : "Shop"}
          </h1>

          {/* Filter Button */}
          <div className="flex items-center gap-4 relative">
            <button
              onClick={toggleFilterVisibility}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiFilter className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700">Filter</span>
            </button>

            {/* Filter Dropdown */}
            {isFilterVisible && (
              <div
                className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-20 transition-all duration-300 ease-in-out"
                style={{
                  transform: isFilterVisible ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: "top",
                }}
              >
                <h3 className="text-lg font-semibold p-4 border-b border-gray-100">
                  Filter by Category
                </h3>
                <div className="flex flex-col p-4 gap-2">
                  <button
                    onClick={() => handleCategoryChange("all")}
                    className={`py-2 px-4 text-gray-700 rounded-lg hover:bg-gray-100 ${
                      selectedCategory === "all" ? "bg-gray-200" : ""
                    }`}
                  >
                    All Products
                  </button>
                  <button
                    onClick={() => handleCategoryChange("deals")}
                    className={`py-2 px-4 text-gray-700 rounded-lg hover:bg-gray-100 ${
                      selectedCategory === "deals" ? "bg-gray-200" : ""
                    }`}
                  >
                    Special Deals
                  </button>
                  <button
                    onClick={() => handleCategoryChange("new")}
                    className={`py-2 px-4 text-gray-700 rounded-lg hover:bg-gray-100 ${
                      selectedCategory === "new" ? "bg-gray-200" : ""
                    }`}
                  >
                    New Arrivals
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
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
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
