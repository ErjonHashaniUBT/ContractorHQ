// app/about/page.tsx

import React from "react";

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">
        About ContractorHQ
      </h1>

      <p className="text-lg mb-4">
        ContractorHQ is a modern e-commerce platform built specifically for
        construction professionals. Our mission is to streamline the process of
        purchasing tools and equipment by providing a fast, secure, and
        user-friendly online shopping experience.
      </p>

      <p className="text-lg mb-4">
        We proudly offer a wide selection of high-quality tools and heavy-duty
        gear from top-tier brands including Makita, DeWalt, Milwaukee, Bosch,
        and Stihl. Whether you&apos;re a contractor, builder, or DIY enthusiast,
        we’re here to make sure you get the right tools for the job —
        efficiently and reliably.
      </p>

      <p className="text-lg mb-4">
        ContractorHQ is built with the latest web technologies like Next.js,
        MongoDB, and Tailwind CSS, ensuring high performance, responsiveness,
        and scalability. With secure authentication, a powerful admin panel, and
        advanced features like product filtering and search, we aim to set the
        new standard in online tool retail.
      </p>

      <p className="text-lg">
        Thank you for choosing ContractorHQ — your trusted partner in
        construction.
      </p>
    </main>
  );
}
