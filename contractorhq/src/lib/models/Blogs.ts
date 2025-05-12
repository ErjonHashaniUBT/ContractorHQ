import { Schema, model, Document, models } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  publishedDate: Date;
  category: string;
  image?: string;
  isPublished: boolean;
  slug: string; // For SEO-friendly URLs
}

// Check if the model already exists to prevent overwriting
const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, default: Date.now },
    category: { type: String, required: true },
    image: { type: String }, // Optional image for the blog post
    isPublished: { type: Boolean, default: true },
    slug: { type: String, required: true, unique: true }, // Slug for SEO-friendly URL
  },
  { timestamps: true } // This will automatically handle createdAt and updatedAt
);

// If the model is already defined, return the existing model, otherwise define it
export const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);
