"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { Button } from "./Button";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  isOnSale: boolean;
  category: string;
}

export default function FeaturedSection({ products }: { products: Product[] }) {
  return (
    <motion.section
      className="py-20 px-6 bg-light"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark mb-4">
            <span className="text-primary">Featured</span> Products
          </h1>
          <p className="text-lg text-gray-six max-w-2xl mx-auto">
            Discover our handpicked selection of contractor-approved tools and
            equipment
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-14">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-2xl h-px bg-gray-light mb-12">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Link href="/shop">
                <Button
                  variant="primary"
                  size="lg"
                  className="transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Browse Full Catalog
                </Button>
              </Link>
            </div>
          </div>

          <p className="text-gray-five text-sm">
            Trusted by over 10,000 professional contractors nationwide
          </p>
        </div>
      </div>
    </motion.section>
  );
}
