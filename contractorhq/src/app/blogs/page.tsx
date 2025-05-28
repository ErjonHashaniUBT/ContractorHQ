/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useBlog } from "../hooks/useBlog";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { deleteBlog, loading, error } = useBlog();

  const router = useRouter();

  // Fetch blogs on client-side with revalidation
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs", {
          next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
        });
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await deleteBlog(id);
    if (result.message === "Blog deleted successfully") {
      setBlogs(blogs.filter((blog) => blog._id !== id));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
          Latest Blogs
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {blog.image && (
              <div className="relative h-60 w-full">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority={false}
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p className="text-gray-600 mt-2 line-clamp-3">{blog.content}</p>
              <Button
                variant="danger"
                onClick={() => handleDelete(blog._id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push(`/blogs/${blog._id}`)}
                className="mt-2 ml-4"
              >
                View Blog
              </Button>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}
