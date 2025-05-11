import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI missing in .env");
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
}

const cached = global.mongoose || { conn: null, promise: null };

// Connect to the database
export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn; // Return cached connection if exists
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise; // Cache the connection
  return cached.conn;
};
