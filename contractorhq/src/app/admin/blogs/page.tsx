"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useBlog } from "@/app/hooks/useBlog";

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
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Admin Blog Management
      </h1>

      {/* Blog Creation Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-lg p-6 rounded-lg mb-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          Create New Blog Post
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Title*</label>
            <input
              type="text"
              value={newBlog.title}
              onChange={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Category*</label>
            <input
              type="text"
              value={newBlog.category}
              onChange={(e) =>
                setNewBlog({ ...newBlog, category: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Content*</label>
          <textarea
            value={newBlog.content}
            onChange={(e) =>
              setNewBlog({ ...newBlog, content: e.target.value })
            }
            className="w-full p-2 border rounded-lg min-h-[200px]"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            value={newBlog.image}
            onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
            className="w-full p-2 border rounded-lg"
            placeholder="/images/blog-1.jpg"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={newBlog.isPublished}
            onChange={(e) =>
              setNewBlog({ ...newBlog, isPublished: e.target.checked })
            }
            className="h-4 w-4"
          />
          <label className="text-sm font-medium">Publish Immediately</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Blog Post"}
        </button>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
        )}
      </form>

      {/* Blog List */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          All Blog Posts
        </h2>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col"
            >
              {blog.image && (
                <div className="relative h-48 w-full mb-4">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
              <h3 className="font-semibold text-xl text-gray-800">
                {blog.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{blog.category}</p>
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {blog.content}
              </p>

              <div className="mt-4 flex gap-4 pt-4 border-t">
                <Link
                  href={`/admin/blogs/edit/${blog._id}`}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
