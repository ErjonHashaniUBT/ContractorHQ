"use client";

import React from "react";

export default function AboutPage() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto my-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-dark mb-4">
          About ContractorHQ
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Learn more about who we are, what we do, and why we do it.
        </p>
      </div>

      <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
        <p>
          <span className="font-semibold text-dark">ContractorHQ</span> is a
          modern e-commerce platform tailored for construction professionals.
          Our mission is to simplify the way tools and equipment are sourced by
          offering a fast, secure, and intuitive online experience.
        </p>

        <p>
          We proudly stock top-tier brands including{" "}
          <span className="font-medium text-dark">
            Makita, DeWalt, Milwaukee, Bosch, and Stihl
          </span>
          . Whether you&apos;re a seasoned contractor or a weekend DIYer, our
          platform ensures you get the right gear for the job.
        </p>

        <p>
          Built using cutting-edge technologies like{" "}
          <span className="text-dark font-medium">
            Next.js, MongoDB, and Tailwind CSS
          </span>
          , ContractorHQ delivers performance, scalability, and seamless design.
          Features like secure authentication, product filtering, and a powerful
          admin dashboard help us stay ahead.
        </p>

        <p>
          Thank you for choosing ContractorHQ —
          <span className="font-semibold text-dark">
            {" "}
            your trusted partner in construction.
          </span>
        </p>
      </div>
    </div>
  );
}
