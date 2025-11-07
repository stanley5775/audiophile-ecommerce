"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Categories from "../components/Categories";
import BestGear from "../components/BestGear";

export default function HeadphonesPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/assets/db.json")
      .then((res) => res.json())
      .then((json) => setData(json.data || []))
      .catch((err) => console.error("Failed to load data:", err));
  }, []);

  // Filter all headphones
  const headphones = data
    .filter((item) => item.category === "headphones")
    // Sort to match Figma order
    .sort((a, b) => {
      const order = [
        "xx99-mark-two-headphones",
        "xx99-mark-one-headphones",
        "xx59-headphones",
      ];
      return order.indexOf(a.slug) - order.indexOf(b.slug);
    });

  return (
    <main>
      {/* ===== Header Section ===== */}
      <section className="bg-black text-white text-center py-12 mt-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-widest uppercase">
          Headphones
        </h1>
      </section>

      {/* ===== Products Section ===== */}
      <section className="px-6 md:px-16 lg:px-32 py-20 space-y-28">
        {headphones.map((product, index) => (
          <div
            key={product.id}
            className={`flex flex-col-reverse md:flex-row ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            } items-center justify-between gap-12 md:gap-20`}
          >
            {/* ===== Product Image ===== */}
            <div className="w-full md:w-1/2">
              <Image
                src={product.image.desktop.replace("./", "/")}
                alt={product.name}
                width={540}
                height={560}
                className="rounded-lg w-full object-cover"
              />
            </div>

            {/* ===== Product Info ===== */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              {product.new && (
                <p className="uppercase text-orange-500 tracking-[8px] mb-4">
                  New Product
                </p>
              )}

              <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-sm mx-auto md:mx-0 leading-tight">
                {product.name}
              </h2>

              <p className="text-gray-500 mb-8 max-w-md mx-auto md:mx-0">
                {product.description}
              </p>

              <Link
                href={`/headphones/${product.slug}`}
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white uppercase text-sm tracking-widest px-8 py-4 rounded-sm"
              >
                See Product
              </Link>
            </div>
          </div>
        ))}
      </section>

      <Categories />
      <BestGear />
    </main>
  );
}
