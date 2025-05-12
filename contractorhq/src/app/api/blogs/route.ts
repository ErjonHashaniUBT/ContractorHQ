/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Blog } from "@/lib/models/Blogs";

// Helper function to generate a slug from the title
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "") // Remove non-word characters
    .slice(0, 100); // Limit to 100 characters
};

// Ensure database connection before performing any actions
export async function GET() {
  await connectToDatabase();

  try {
    const blogs = await Blog.find({}); // Fetch all blog posts
    return NextResponse.json(blogs, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Error fetching blogs: ${err.message}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await connectToDatabase();

  try {
    const body = await request.json(); // Get the blog data from the request body

    // Ensure 'slug' is provided. If not, generate it from the title
    if (!body.slug) {
      body.slug = generateSlug(body.title); // Generate slug from the title
    }

    // Ensure 'author' is provided. If not, use a default value
    if (!body.author) {
      body.author = "Admin"; // Default to "Admin" if author is not provided
    }

    // Create a new blog post
    const newBlog = await Blog.create(body);

    return NextResponse.json(newBlog, { status: 201 });
  } catch (err: any) {
    console.error("Error creating blog:", err); // Log the full error to see what went wrong
    return NextResponse.json(
      { error: `Error creating blog: ${err.message}` },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  await connectToDatabase();

  try {
    const body = await request.json(); // Get the updated data
    const id = new URL(request.url).searchParams.get("id"); // Get the blog ID from the query parameter

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true }); // Update the blog post

    return updatedBlog
      ? NextResponse.json(updatedBlog, { status: 200 })
      : NextResponse.json({ error: "Blog not found" }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Error updating blog: ${err.message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  await connectToDatabase();

  try {
    const id = new URL(request.url).searchParams.get("id"); // Get the blog ID from the query parameter

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const deletedBlog = await Blog.findByIdAndDelete(id); // Delete the blog post

    return deletedBlog
      ? NextResponse.json(
          { message: "Blog deleted successfully" },
          { status: 200 }
        )
      : NextResponse.json({ error: "Blog not found" }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Error deleting blog: ${err.message}` },
      { status: 500 }
    );
  }
}
