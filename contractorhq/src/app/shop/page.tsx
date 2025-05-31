// app/shop/page.tsx
import { Suspense } from "react";
import ShopPage from "@/components/pages/ShopPage";

export default function ShopPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="py-32 text-center text-gray-500">Loading shop...</div>
      }
    >
      <ShopPage />
    </Suspense>
  );
}
