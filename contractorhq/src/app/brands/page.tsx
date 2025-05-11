import Link from "next/link";
import Image from "next/image";

const brands = ["Makita", "Milwaukee", "DeWalt", "Bosch", "Stihl"];

const brandLogos: { [key: string]: string } = {
  Makita: "/images/brands/makita-logo.png",
  Milwaukee: "/images/brands/milwaukee-logo.png",
  DeWalt: "/images/brands/dewalt-logo.png",
  Bosch: "/images/brands/bosch-logo.png",
  Stihl: "/images/brands/stihl-logo.png",
};

const brandColors: { [key: string]: string } = {
  Makita: "from-teal-400 to-primary",
  Milwaukee: "from-red-600 to-red-400",
  DeWalt: "from-yellow-600 to-yellow-400",
  Bosch: "from-blue-700 to-blue-500",
  Stihl: "from-orange-600 to-orange-400",
};

const BrandOverviewPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              Premium Tool Brands
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover top-quality tools from industry-leading manufacturers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-10">
          {brands.map((brand) => (
            <Link
              key={brand}
              href={`/brands/${brand}`}
              className="group relative h-full min-h-[380px] overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-3xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br opacity-90 group-hover:opacity-100 transition-opacity duration-500 ${brandColors[brand]}`}></div>
              
              <div className="relative z-10 flex flex-col items-center justify-center p-10 h-full">
                <div className="mb-10 w-48 h-48 bg-gray-200 rounded-full backdrop-blur-sm flex items-center justify-center p-5 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                  <Image
                    src={brandLogos[brand]}
                    alt={`${brand} logo`}
                    width={140}
                    height={140}
                    className="object-contain drop-shadow-lg"
                    priority
                  />
                </div>
                
                <div className="mt-auto text-center">
                  <h3 className="text-3xl font-bold text-white mb-3">{brand}</h3>
                  <span className="inline-block px-5 py-2 text-sm font-semibold tracking-wider text-white bg-black/20 rounded-full group-hover:bg-white/20 transition-colors duration-300">
                    Explore Products
                  </span>
                </div>
              </div>
              
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-white/30 transition-all duration-500 rounded-3xl pointer-events-none"></div>
            </Link>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-500 italic text-lg">
            Trusted by professionals worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandOverviewPage;