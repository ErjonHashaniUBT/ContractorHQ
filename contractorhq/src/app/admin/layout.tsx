// app/admin/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/styles/globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-dark text-white p-6 space-y-8 sticky top-0 h-screen border-r border-gray-200">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="space-y-1">
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              pathname === "/admin"
                ? "bg-primary text-white"
                : "hover:bg-primary/10"
            }`}
          >
            <span>📊</span>
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/products"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              pathname.startsWith("/admin/products")
                ? "bg-primary text-white"
                : "hover:bg-primary/10"
            }`}
          >
            <span>🛍️</span>
            <span>Products</span>
          </Link>
          <Link
            href="/admin/blogs"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              pathname.startsWith("/admin/blogs")
                ? "bg-primary text-white"
                : "hover:bg-primary/10"
            }`}
          >
            <span>✏️</span>
            <span>Blogs</span>
          </Link>
          <Link
            href="/admin/messages"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              pathname.startsWith("/admin/messages")
                ? "bg-primary text-white"
                : "hover:bg-primary/10"
            }`}
          >
            <span>📩</span>
            <span>Messages</span>
          </Link>
        </nav>
      </aside>

      {/* Page content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
