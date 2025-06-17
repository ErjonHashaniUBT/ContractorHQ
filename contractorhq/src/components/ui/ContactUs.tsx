// app/components/ui/ContactUs.tsx
"use client";

import { Button } from "@/components/ui/Button";

export default function ContactUs() {


  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-dark mb-3">Contact Us</h2>
        <p className="text-gray-600">
          Have a question or need support? Send us a message and we&apos;ll
          respond within 24 hours.
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
            required
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
            required
          />
        </div>

        <Button
          size="lg"
          className="w-full sm:w-auto"
        >
          Send Message
        </Button>

      </form>
    </div>
  );
}
