import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error("MONGODB_URI missing in .env");

// Cache the connection (using `const` + type assertion)
const cached =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).mongoose ||
  ({ conn: null, promise: null } as {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  });

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
