"use client";
import { useState, useEffect, JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const PRODUCT_GRID = [
  {
    src: "/images/hero/hero-1.png",
    alt: "Professional power tools collection",
    width: 600,
    height: 600,
  },
  {
    src: "/images/hero/hero-2.png",
    alt: "Contractor using high-quality equipment",
    width: 600,
    height: 600,
  },
  {
    src: "/images/hero/hero-3.png",
    alt: "Latest model cordless drills",
    width: 600,
    height: 600,
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [particles, setParticles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    // Set up interval to change slides every 3 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PRODUCT_GRID.length);
    }, 3000);

    // Create floating particles with random styles
    const generatedParticles = [...Array(30)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${Math.random() * 15 + 10}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ));
    setParticles(generatedParticles);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="relative overflow-hidden bg-primary-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc05_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc05_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-pan" />
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 opacity-20">{particles}</div>

        {/* Gradient Glows */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-[100px]" />
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-primary-light/20 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-12 lg:flex lg:items-center lg:gap-x-16 lg:px-8 lg:py-8">
        {/* Left Content */}
        <motion.div
          className="lg:w-1/2 z-10"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl [text-wrap:balance]">
            <span className="block">Contractor-Grade</span>
            <span className="text-accent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
              Tools & Equipment
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-primary-lighter">
            Authorized distributor for{" "}
            <strong className="text-white">Makita</strong>,
            <strong className="text-white"> Milwaukee</strong>, and{" "}
            <strong className="text-white">10+</strong>
            professional brands.{" "}
            <span className="block mt-2 text-white font-medium">
              Free next-day delivery on qualifying orders.
            </span>
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Browse Catalog <ArrowIcon />
            </Link>
            <Link
              href="/deals"
              className="rounded-md bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-white/20 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
            >
              Limited-Time Offers
            </Link>
          </div>
        </motion.div>

        {/* Enhanced Image Slider */}
        <motion.div
          className="relative lg:w-1/2 h-[300px] lg:h-[500px] mt-8 lg:mt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {PRODUCT_GRID.map((product, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.83,0,0.17,1)] ${
                  i === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={product.src}
                  alt={product.alt}
                  fill
                  className="object-contain"
                  quality={100}
                  priority={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Brand Marquee */}
      <motion.div
        className="relative border-t border-white/10 py-6 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex animate-marquee items-center gap-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex shrink-0 gap-12">
              {["makita", "dewalt", "milwaukee", "bosch", "stihl"].map(
                (brand) => (
                  <div
                    key={brand}
                    className="relative h-8 w-24 opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <Image
                      src={`/images/brands/${brand}-logo.png`}
                      alt={`${brand} logo`}
                      fill
                      className="object-contain"
                      loading="eager"
                    />
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M6 12L10 8L6 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
