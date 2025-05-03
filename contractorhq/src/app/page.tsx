import { HeroSection } from "@/components/ui/HeroSection";
import ProductCard from "@/components/ui/ProductCard";
import Head from "next/head";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  isOnSale: boolean;
}

export default async function Home() {
  let products: Product[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/products`,
      {
        next: { revalidate: 60 },
      }
    );

    // Check if response is OK (status 200-299)
    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error:", errorText);
      throw new Error(`API request failed with status ${res.status}`);
    }

    // Parse as JSON
    products = await res.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <>
      <Head>
        <title>ContractorHQ | Home</title>
        <meta
          name="description"
          content="The best contractor-grade tools and equipment"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="ContractorHQ | Home" />
        <meta
          property="og:description"
          content="Find the best contractor-grade tools and equipment here"
        />
        <meta property="og:image" content="/images/hero/hero-1.png" />
      </Head>
      <section>
        <HeroSection />
        <section className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </section>
    </>
  );
}

Home.displayName = "Home | ContractorHQ";
