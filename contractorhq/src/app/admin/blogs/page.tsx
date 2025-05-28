// app/admin/blogs/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useBlog } from "@/app/hooks/useBlog";
import { Button } from "@/components/ui/Button";

interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  image: string;
  isPublished: boolean;
  slug: string;
  publishedDate: Date;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [newBlog, setNewBlog] = useState<
    Omit<Blog, "_id" | "slug" | "publishedDate">
  >({
    title: "",
    content: "",
    category: "",
    image: "",
    isPublished: true,
  });
  const { createBlog, deleteBlog, loading, error } = useBlog();

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      await deleteBlog(id);
      fetchBlogs();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await createBlog({
      ...newBlog,
      slug: newBlog.title.toLowerCase().replace(/\s+/g, "-"),
    });

    if (result) {
      setNewBlog({
        title: "",
        content: "",
        category: "",
        image: "",
        isPublished: true,
      });
      fetchBlogs();
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-dark mb-6">Admin Blog Page</h1>
      {/* Blog Creation Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-light shadow-lg p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold text-dark mb-6">
          Create New Blog Post
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Title*
            </label>
            <input
              type="text"
              value={newBlog.title}
              onChange={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category*
            </label>
            <input
              type="text"
              value={newBlog.category}
              onChange={(e) =>
                setNewBlog({ ...newBlog, category: e.target.value })
              }
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
              required
            />
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Content*
          </label>
          <textarea
            value={newBlog.content}
            onChange={(e) =>
              setNewBlog({ ...newBlog, content: e.target.value })
            }
            className="w-full p-3 border border-gray-200 rounded-lg min-h-[200px] focus:ring-2 focus:ring-primary focus:border-primary transition"
            required
          />
        </div>

        <div className="space-y-2 mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            value={newBlog.image}
            onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
            placeholder="/images/blog-1.jpg"
          />
        </div>

        <div className="flex items-center space-x-3 mb-6">
          <input
            type="checkbox"
            checked={newBlog.isPublished}
            onChange={(e) =>
              setNewBlog({ ...newBlog, isPublished: e.target.checked })
            }
            className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label className="text-sm font-medium text-gray-700">
            Publish Immediately
          </label>
        </div>

        <Button type="submit" size="lg" loading={loading} className="w-full">
          Create Blog Post
        </Button>

        {error && (
          <div className="mt-4 p-4 bg-error/10 text-error rounded-lg">
            {error}
          </div>
        )}
      </form>

      {/* Blog List */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-dark mb-6">All Blog Posts</h2>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts found.</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition"
              >
                {blog.image && (
                  <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-xl text-dark">
                  {blog.title}
                </h3>
                <span className="inline-block px-2 py-1 text-xs font-medium text-primary-dark bg-primary-lighter/30 rounded-full mt-1">
                  {blog.category}
                </span>
                <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                  {blog.content}
                </p>

                <div className="mt-6 flex gap-4 pt-4 border-t border-gray-100">
                  <Link
                    href={`/admin/blogs/${blog._id}`}
                    className="text-primary hover:text-primary-dark flex items-center gap-2 text-sm font-medium"
                  >
                    <span>✏️</span>
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-error hover:text-error-dark flex items-center gap-2 text-sm font-medium"
                  >
                    <span>🗑</span>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
