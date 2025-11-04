"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FeaturedYX1() {
  const [imageSrc, setImageSrc] = useState("/assets/home/mobile/image-earphones-yx1.jpg");

  // Detect screen width and set correct image
  useEffect(() => {
    const updateImage = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setImageSrc("/assets/home/desktop/image-earphones-yx1.jpg");
      } else if (width >= 640) {
        setImageSrc("/assets/home/tablet/image-earphones-yx1.jpg");
      } else {
        setImageSrc("/assets/home/mobile/image-earphones-yx1.jpg");
      }
    };

    updateImage();
    window.addEventListener("resize", updateImage);
    return () => window.removeEventListener("resize", updateImage);
  }, []);

  return (
    <section className="flex flex-col sm:flex-row justify-between items-center gap-6 px-6 sm:px-12 md:px-24 my-24">
      {/* Left Image Side */}
      <div className="w-full sm:w-1/2 h-[320px]">
        <Image
          src={imageSrc}
          alt="YX1 Earphones"
          width={600}
          height={320}
          className="rounded-lg object-cover w-full h-full"
        />
      </div>

      {/* Right Text Side */}
      <div className="bg-[#F1F1F1] rounded-lg flex flex-col justify-center p-10 w-full sm:w-1/2 h-[320px]">
        <h2 className="text-2xl font-bold uppercase tracking-wide mb-6">
          YX1 Earphones
        </h2>
        <Link
          href="/earphones/yx1-earphones"
          className="border w-max border-black px-5 py-2 uppercase tracking-widest text-sm hover:bg-black hover:text-white transition"
        >
          See Product
        </Link>
      </div>
    </section>
  );
}
