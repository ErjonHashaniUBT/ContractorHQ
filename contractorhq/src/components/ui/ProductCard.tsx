"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./Button";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    isOnSale: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="relative group border-2 border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/10">
      {/* Sale Ribbon (positioned absolutely) */}
      {product.isOnSale && (
        <div className="absolute top-0 right-0 z-10 bg-error text-white text-xs font-bold px-3 py-1 transform rotate-12 translate-x-2 -translate-y-2 shadow-md">
          SALE
        </div>
      )}

      {/* Product Image with Hover Zoom */}
      <Link href={`/shop/${product._id}`} className="block overflow-hidden">
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-transform duration-700 group-hover:scale-110 p-6"
            quality={90}
            priority={false}
            loading="lazy"
          />
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white/90 text-dark font-medium px-4 py-2 rounded-full backdrop-blur-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Quick View
            </span>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5 space-y-3 border-t border-gray-100">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-dark line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Price & CTA */}
        <div className="flex flex-wrap justify-between items-center pt-2 gap-2">
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Add to Cart Button */}
          <Button
            className="whitespace-nowrap px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300 group/button"
            onClick={(e) => {
              e.preventDefault();
              // Add to cart logic
            }}
          >
            <span className="relative z-10">Add to Cart</span>
          </Button>
        </div>
      </div>

      {/* Floating Rating (optional) */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
        <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
        <span className="text-xs font-medium">4.9</span>
      </div>
    </div>
  );
}

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
