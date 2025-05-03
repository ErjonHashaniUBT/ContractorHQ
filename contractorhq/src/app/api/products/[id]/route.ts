import { connectToDatabase } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { NextResponse } from "next/server";

// GET: Fetch a product by ID
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch product";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE: Delete a product by ID
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    await Product.findByIdAndDelete(params.id);
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
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const updates = await req.json(); // Get the updates from the request body
    const updatedProduct = await Product.findByIdAndUpdate(params.id, updates, {
      new: true, // Return the updated document
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
