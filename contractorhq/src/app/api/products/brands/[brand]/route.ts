// app/api/products/brands/[brand]/route.ts

import { connectToDatabase } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { NextResponse } from "next/server";

// GET: Fetch products by brand
export async function GET(
  _req: Request,
  { params }: { params: { brand: string } }
) {
  const { brand } = params; // Retrieve brand from URL params

  try {
    await connectToDatabase();

    // List of valid brands (you can expand this list)
    const validBrands = ["Makita", "Milwaukee", "DeWalt", "Bosch", "Stihl"];

    // Check if the brand is valid
    if (!validBrands.includes(brand)) {
      return NextResponse.json({ error: "Invalid brand" }, { status: 400 });
    }

    // Fetch products from the database for the specific brand
    const filteredProducts = await Product.find({ brand }).exec();

    // If no products are found for this brand
    if (filteredProducts.length === 0) {
      return NextResponse.json([]); // Empty array for no products found
    }

    return NextResponse.json(filteredProducts); // Return filtered products
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
