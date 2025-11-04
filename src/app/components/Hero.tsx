import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-black text-white overflow-hidden h-[600px] md:h-[720px] lg:h-[800px]">
      {/* Background Image */}
      <Image
        src="/assets/home/desktop/image-hero.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover opacity-80 hidden lg:block"
      />
      {/* Mobile */}
      <Image
        src="/assets/home/mobile/image-header.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover object-center sm:hidden"
      />
      {/* Tablet */}
      <Image
        src="/assets/home/tablet/image-header.jpg"
        alt="Hero background tablet"
        fill
        priority
        className="object-cover object-center hidden  md:block lg:hidden"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90 md:bg-gradient-to-r md:from-black/80 md:to-transparent" />

      {/* Content wrapper (fixed width/height box) */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex justify-center lg:justify-start items-center h-full">
        <div className="w-[398px] h-[346px] flex flex-col justify-center items-center lg:items-start text-center md:text-left">
          <p className="uppercase text-gray-400 tracking-[8px] mb-6">
            New Product
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            XX99 Mark II Headphones
          </h1>

          <p className="text-gray-300 mb-10">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>

          <Link
            href="/headphones"
            className="bg-orange-600 text-white uppercase tracking-widest px-8 py-4 hover:bg-orange-500 transition-all"
          >
            See Product
          </Link>
        </div>
      </div>
    </section>
  );
}
