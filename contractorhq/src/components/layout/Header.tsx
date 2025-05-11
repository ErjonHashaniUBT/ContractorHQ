"use client";

import Link from "next/link";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";
import Image from "next/image";

export default function Header() {
  const shopLinks = {
    allProducts: "/shop", // matches GET /api/products
    specialDeals: "/shop?category=deals", // matches GET /api/deals
    newArrivals: "/shop?category=new", // matches GET /api/products/new
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
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
            className="h-14 w-auto"
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="font-medium text-dark hover:text-primary transition-colors"
          >
            Home
          </Link>

          {/* Shop drop menu */}
          <div className="relative group">
            <div className="font-medium text-dark hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
              Shop
              <FiChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </div>

            <div className="absolute top-full left-0 w-48 bg-white shadow-lg py-1 z-50 border border-gray-100 invisible group-hover:visible">
              <Link
                href={shopLinks.allProducts}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                All Products
              </Link>
              <Link
                href={shopLinks.specialDeals}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Special Deals
              </Link>
              <Link
                href={shopLinks.newArrivals}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                New Arrivals
              </Link>
            </div>
          </div>

          {/* Brands Dropdown */}
          <div className="relative group">
            {/* Dropdown trigger */}
            <div className="font-medium text-dark hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
              Brands
              <FiChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </div>

            {/* Dropdown menu */}
            <div className="absolute top-full left-0 w-48 bg-white shadow-lg py-2 z-50 border border-gray-100 invisible group-hover:visible transition-opacity duration-200 group-hover:opacity-100 opacity-0">
              {/* Brand logo links */}
              <Link
                href="/brands/Makita"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <div className="relative h-6 w-[120px]">
                  {" "}
                  <Image
                    src="/images/brands/makita-logo.png"
                    alt="Makita"
                    fill
                    className="object-contain object-left"
                    sizes="120px"
                    loading="lazy"
                  />
                </div>
              </Link>

              <Link
                href="/brands/DeWalt"
                className="block px-4 py-2 hover:bg-gray-100"
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
                className="block px-4 py-2 hover:bg-gray-100"
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

              {/* View All link */}
              <Link
                href="/brands"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100 mt-1"
              >
                View All Brands →
              </Link>
            </div>
          </div>

          {/* Support Dropdown */}
          <div className="relative group">
            <div className="font-medium text-dark hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
              Support
              <FiChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </div>

            <div className="absolute top-full left-0 w-48 bg-white shadow-lg py-1 z-50 border border-gray-100 invisible group-hover:visible">
              <Link
                href="/support/contact"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Contact Us
              </Link>
              <Link
                href="/support/faq"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                FAQ
              </Link>
              <Link
                href="/support/returns"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Returns Policy
              </Link>
            </div>
          </div>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <button
            aria-label="Search"
            className="p-2 text-gray-600 hover:text-primary transition-colors"
          >
            <FiSearch className="h-5 w-5" />
          </button>
          <button
            aria-label="Cart"
            className="p-2 text-gray-600 hover:text-primary transition-colors relative"
          >
            <FiShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-white">
              3
            </span>
          </button>
          <button
            aria-label="Account"
            className="p-2 text-gray-600 hover:text-primary transition-colors"
          >
            <Link href="/admin">
              <FiUser className="h-5 w-5" />
            </Link>
          </button>
        </div>
      </div>
    </header>
  );
}
