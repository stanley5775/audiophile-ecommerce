"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutSection() {
  const [imageSrc, setImageSrc] = useState(
    "/assets/shared/mobile/image-best-gear.jpg"
  );

  useEffect(() => {
    const updateImage = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setImageSrc("/assets/shared/desktop/image-best-gear.jpg");
      } else if (width >= 640) {
        setImageSrc("/assets/shared/tablet/image-best-gear.jpg");
      } else {
        setImageSrc("/assets/shared/mobile/image-best-gear.jpg");
      }
    };

    updateImage();
    window.addEventListener("resize", updateImage);
    return () => window.removeEventListener("resize", updateImage);
  }, []);

  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20 px-6 sm:px-12 md:px-24 my-28">
      {/* Text Section */}
      <div className="text-center lg:text-left lg:w-1/2">
        <h2 className="uppercase text-3xl sm:text-4xl font-bold tracking-wide mb-6">
          Bringing you the <span className="text-orange-500">best</span> audio
          gear
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Located at the heart of New York City, Audiophile is the premier store
          for high-end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2">
        <Image
          src={imageSrc}
          alt="Man wearing headphones"
          width={540}
          height={588}
          className="rounded-lg object-cover w-full h-full"
        />
      </div>
    </section>
  );
}
