// app/admin/page.tsx
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-dark mb-4">
        Welcome to the Admin Dashboard
      </h1>
      <p className="text-gray-600 mb-8">
        Select a section from the sidebar to manage content.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-primary-lighter/10 p-6 rounded-lg border border-primary-lighter">
          <h2 className="font-semibold text-primary-dark mb-2">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <Link href="/admin/products">Add New Product</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Link href="/admin/blogs">Create Blog Post</Link>
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="font-semibold text-dark mb-2">Recent Activity</h2>
          <p className="text-gray-600 text-sm">No recent activity</p>
        </div>
      </div>
    </div>
  );
}
