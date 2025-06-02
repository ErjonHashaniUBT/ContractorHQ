"use client";

import Link from "next/link";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiHome,
  FiShoppingBag,
  FiHelpCircle,
} from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const shopLinks = {
    allProducts: "/shop", // matches GET /api/products
    specialDeals: "/shop?category=deals", // matches GET /api/deals
    newArrivals: "/shop?category=new", // matches GET /api/products/new
  };

  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo with Image */}
        <Link
          href="/"
          className="flex items-center hover:scale-105 duration-200"
        >
          <Image
            src="/images/logos/contractor-logo.png"
            alt="ContractorHQ Logo"
            width={160}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="font-medium text-black dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors duration-200 flex items-center gap-1"
          >
            <FiHome className="w-4 h-4" />
            Home
          </Link>

          {/* Shop Dropdown */}
          <div className="relative group">
            <div className="font-medium text-black dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors duration-200 flex items-center gap-1 cursor-pointer">
              <FiShoppingBag className="w-4 h-4" />
              <Link href="/shop">Shop</Link>
              <FiChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </div>

            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[240px] bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50 border border-gray-100 dark:border-gray-700 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-y-0 translate-y-1">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-black dark:text-gray-100">
                  Shop Categories
                </h3>
              </div>

              {/* Primary Shop Links */}
              <Link
                href={shopLinks.allProducts}
                className="block px-4 py-2.5 text-sm text-black dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 group/item"
              >
                <span className="group-hover/item:ml-1 transition-all duration-150">
                  All Products
                </span>
              </Link>
              <Link
                href={shopLinks.specialDeals}
                className="block px-4 py-2.5 text-sm text-black dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 group/item"
              >
                <span className="group-hover/item:ml-1 transition-all duration-150">
                  Special Deals
                </span>
              </Link>
              <Link
                href={shopLinks.newArrivals}
                className="block px-4 py-2.5 text-sm text-black dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 group/item"
              >
                <span className="group-hover/item:ml-1 transition-all duration-150">
                  New Arrivals
                </span>
              </Link>

              {/* Nested Brands Dropdown */}
              <div className="relative group/brands">
                <div className="flex justify-between items-center px-4 py-2.5 text-sm text-black dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer">
                  <span className="group-hover/brands:ml-1 transition-all duration-150">
                    Brands
                  </span>
                  <FiChevronDown className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/brands:rotate-180" />
                </div>

                <div className="absolute top-0 left-full ml-1 w-64 bg-white rounded-r-lg shadow-xl border border-gray-100 opacity-0 group-hover/brands:opacity-100 invisible group-hover/brands:visible transition-all duration-200 transform group-hover/brands:translate-x-0 -translate-x-1">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-black dark:text-gray-100">
                      Featured Brands
                    </h3>
                  </div>
                  <Link
                    href="/brands/Makita"
                    className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    <div className="relative w-[120px] h-6">
                      <Image
                        src="/images/brands/makita-logo.png"
                        alt="Makita"
                        fill
                        className="object-contain object-left"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <Link
                    href="/brands/DeWalt"
                    className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    <div className="relative h-6 w-[120px]">
                      <Image
                        src="/images/brands/dewalt-logo.png"
                        alt="DeWalt"
                        fill
                        className="object-contain object-left"
                        sizes="120px"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <Link
                    href="/brands/Milwaukee"
                    className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    <div className="relative h-6 w-[120px]">
                      <Image
                        src="/images/brands/milwaukee-logo.png"
                        alt="Milwaukee"
                        fill
                        className="object-contain object-left"
                        sizes="120px"
                        loading="lazy"
                      />
                    </div>
                  </Link>

                  <Link
                    href="/brands"
                    className="block px-4 py-2.5 text-sm font-medium text-black dark:text-gray-100 mt-1 transition-colors duration-150"
                  >
                    View All Brands →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Blogs */}
          <Link
            href="/blogs"
            className="font-medium text-black dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors duration-200 flex gap-1 items-center"
          >
            <FaRegNewspaper className="w-4 h-4" />
            Blogs
          </Link>

          {/* Support Dropdown */}
          <div className="relative group">
            <div className="font-medium text-black dark:text-gray-200 hover:text-primary dark:hover:text-primary-light cursor-pointer">
              <Link href="/support" className="flex items-center gap-1">
                <FiHelpCircle className="w-4 h-4" />
                Support
                <FiChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </Link>
            </div>

            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50 border border-gray-100 dark:border-gray-700 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-y-0 translate-y-1">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-black dark:text-gray-100">
                  Support Center
                </h3>
              </div>
              <Link
                href="/support#contact"
                className="block px-4 py-2.5 text-sm text-black dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 group/item"
              >
                <span className="group-hover/item:ml-1 transition-all duration-150">
                  Contact Us
                </span>
              </Link>
              <Link
                href="/support#faq"
                className="block px-4 py-2.5 text-sm text-black dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 group/item"
              >
                <span className="group-hover/item:ml-1 transition-all duration-150">
                  FAQ
                </span>
              </Link>
              <Link
                href="/support#returns"
                className="block px-4 py-2.5 text-sm text-black dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 group/item"
              >
                <span className="group-hover/item:ml-1 transition-all duration-150">
                  Returns Policy
                </span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Right side icons */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="group relative flex items-center">
            <div className="z-10 p-2 group-hover:pr-3 transition-all duration-300">
              <FiSearch
                className="h-5 w-5 text-black dark:text-gray-400 group-hover:text-primary cursor-pointer"
                onClick={() => {
                  if (searchTerm.trim()) {
                    router.push(
                      `/search?q=${encodeURIComponent(
                        searchTerm.trim()
                      )}&t=${Date.now()}`
                    );
                  }
                }}
              />
            </div>
            <div className="absolute right-0 w-0 group-hover:w-64 overflow-hidden transition-all duration-300 ease-in-out">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchTerm.trim()) {
                    router.replace(
                      `/search?q=${encodeURIComponent(searchTerm.trim())}`
                    );
                  }
                }}
                className="w-full h-10 pl-10 pr-4 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-gray-200 rounded-full focus:border-primary dark:focus:border-primary-light"
              />
            </div>
          </div>

          <ThemeToggle />
          
          <Link
            href="/cart"
            className="relative text-black dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
          >
            <FiShoppingCart className="w-6 h-6" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              3
            </span>
          </Link>
          
          <Link
            href="/account"
            className="text-black dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
          >
            <FiUser className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </header>
  );
}
