/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { NextResponse } from "next/server";

// GET: Fetch a product by ID
export async function GET(req: Request, context: { params: any }) {
  try {
    const { id } = await context.params;
    await connectToDatabase();
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error in GET /api/products/[id]:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// DELETE: Delete a product by ID
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    await connectToDatabase();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete product";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// PATCH: Update a product by ID
export async function PATCH(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    await connectToDatabase();
    const updates = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update product";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
