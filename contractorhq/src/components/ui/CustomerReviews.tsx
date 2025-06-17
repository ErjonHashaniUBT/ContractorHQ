"use client";

import { FaStar } from "react-icons/fa";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const reviewVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function CustomerReviews() {
  const reviews = [
    {
      rating: 5,
      text: "ContractorHQ is my go-to for urgent tool replacements. Ordered a Milwaukee impact driver at 2 PM, and it arrived at the job site by 10 AM the next day. Lifesaver!",
      author: "Javier R.",
      role: "Roofing Contractor",
    },
    {
      rating: 5,
      text: "The bulk pricing on DeWalt batteries cut our equipment costs by 20%. Their customer team even helped us compare models for our specific projects.",
      author: "Simone K.",
      role: "Electrical Contractor",
    },
    {
      rating: 5,
      text: "As a small remodeling biz, we appreciate how easy it is to reorder frequently used items. The 'Saved Tools' feature keeps our trailer stocked without the hassle.",
      author: "Darnell & Zoe W.",
      role: "DW Renovations",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-theme-hero p-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ x: -20 }}
          whileInView={{ x: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Icon
            icon="material-symbols:reviews"
            width={32}
            height={32}
            className="text-white"
          />
          <h3 className="text-3xl font-bold text-white">Customer Reviews</h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              variants={reviewVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={index}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FaStar
                      className={`${
                        i < review.rating ? "text-accent" : "text-gray-light"
                      } text-lg`}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.p
                className="text-gray-600 mb-5 italic text-lg leading-relaxed"
                whileHover={{ scale: 1.01 }}
              >
                &quot;{review.text}&quot;
              </motion.p>

              <p className="font-semibold text-primary-dark text-base">
                — {review.author}, {review.role}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-white text-sm uppercase tracking-wider">
            Trusted by over 10,000 construction professionals
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
