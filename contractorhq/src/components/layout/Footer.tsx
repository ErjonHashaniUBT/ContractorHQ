"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaChevronRight } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer 
    initial={{opacity:0, y:20}}
    whileInView={{opacity:1, y:20}}
    transition={{duration:0.6}}
    viewport={{ once: true, margin: "-50px" }}
    className="bg-theme-hero text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold">
                <span className="text-dark">Contractor</span>
                <span className="text-primary-light">HQ</span>
              </span>
            </Link>
            <p className="text-primary-lighter/90 mb-6 max-w-md">
              Premium tools and equipment for professional contractors. Quality
              you can trust for every job.
            </p>
            <div className="flex gap-5">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-2 rounded-full bg-primary-light/20 hover:bg-primary-light/30 text-primary-lighter hover:text-white transition-all"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white border-b border-primary-light pb-2">
              Shop
            </h3>
            <ul className="space-y-3">
              {["All Products", "Brands", "Special Deals", "New Arrivals"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-primary-lighter/90 hover:text-white transition-colors flex items-start gap-2"
                    >
                      <span className="mt-1 h-1 w-1 rounded-full bg-accent-light opacity-0 hover:opacity-100 transition-opacity" />
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5 text-white border-b border-primary-light pb-2">
              Support
            </h3>
            <ul className="space-y-3">
              {["Contact Us", "FAQ", "Returns Policy"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/support#${item.toLowerCase().replace(" ", "")}`}
                    className="text-primary-lighter/90 hover:text-white transition-colors flex items-start gap-2"
                  >
                    <span className="mt-1 h-1 w-1 rounded-full bg-accent-light opacity-0 hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer CTA*/}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white border-b border-primary-light pb-2">
              Contractor Resources
            </h3>
            <div className="space-y-4">
              <p className="text-primary-lighter/90">
                Get exclusive business pricing and bulk order discounts.
              </p>

              <Link
                href="/auth/signup"
                className="inline-block bg-accent hover:bg-accent-dark text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                Create Account
              </Link>

              <div className="pt-4 border-t border-primary-light/20">
                <p className="text-sm text-primary-lighter/80 mb-2">
                  Already have an account?
                </p>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center text-primary-light hover:text-white transition-colors font-medium"
                >
                  Contractor Sign In
                  <FaChevronRight className="ml-1 w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-primary-light/30 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-lighter/80">
              © {new Date().getFullYear()} ContractorHQ. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/legal"
                className="text-sm text-primary-lighter/80 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/legal"
                className="text-sm text-primary-lighter/80 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/legal/sitemap"
                className="text-sm text-primary-lighter/80 hover:text-white transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
