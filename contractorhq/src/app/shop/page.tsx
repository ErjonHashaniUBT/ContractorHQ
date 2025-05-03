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

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const products: Product[] = await getProducts(category);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header with Breadcrumbs */}
      <div className="mb-6">
        <nav className="flex items-center text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary">Shop</span>
          {category && (
            <>
              <span className="mx-2">/</span>
              <span className="capitalize">
                {category === "deals" ? "Special Deals" : "New Arrivals"}
              </span>
            </>
          )}
        </nav>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {!category || category === "all"
              ? "All Products"
              : category === "deals"
              ? "Special Deals"
              : "New Arrivals"}
          </h1>

          {/* Filter Button - matches your header style */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FiFilter className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700">Filter</span>
            </button>
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
