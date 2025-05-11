"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/styles/globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-4 sticky top-10 h-screen">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="space-y-2">
          <Link
            href="/admin"
            className={`block px-3 py-2 rounded ${pathname === "/admin" ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"}`}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className={`block px-3 py-2 rounded ${pathname.startsWith("/admin/products") ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"}`}
          >
            Products
          </Link>
          <Link
            href="/admin/blogs"
            className={`block px-3 py-2 rounded ${pathname.startsWith("/admin/blogs") ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"}`}
          >
            Blogs
          </Link>
          <Link
            href="/admin/news"
            className={`block px-3 py-2 rounded ${pathname.startsWith("/admin/news") ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"}`}
          >
            News
          </Link>
        </nav>
      </aside>

      {/* Page content */}
      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
