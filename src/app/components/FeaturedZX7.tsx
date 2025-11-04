import Image from "next/image";
import Link from "next/link";

export default function FeaturedZX7() {
  return (
    <section className="relative mt-10 mx-6 sm:mx-12 md:mx-24 rounded-lg overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/home/desktop/image-speaker-zx7.jpg"
          alt="ZX7 Speaker"
          fill
          className="object-cover object-center md:object-left"
        />
      </div>

      {/* Overlay Content */}
      <div className="relative px-8 py-24 sm:px-16 md:px-20 flex flex-col items-start text-left">
        <h2 className="text-3xl font-bold uppercase tracking-wider text-black">
          ZX7 Speaker
        </h2>
        <Link
          href="/speakers"
          className="mt-8 border border-black text-black px-6 py-2 tracking-widest uppercase font-semibold hover:bg-black hover:text-white transition"
        >
          See Product
        </Link>
      </div>
    </section>
  );
}
