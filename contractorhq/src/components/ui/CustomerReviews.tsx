"use client";
import React from "react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "John Doe",
    review: "This platform made finding a contractor so much easier. 10/10!",
  },
  {
    name: "Jane Smith",
    review: "Super intuitive UI and reliable contractors. Highly recommend!",
  },
  {
    name: "Bob Johnson",
    review: "Had a great experience. Will definitely use this again.",
  },
];

const CustomerReviews = () => {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-700 italic">&quot;{review.review}&quot;</p>
              <p className="mt-4 font-semibold text-gray-900">
                - {review.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
