import Image from "next/image";
import Link from "next/link";

export default function FeaturedZX9() {
  return (
    <section className="relative bg-[#D87D4A] text-white rounded-lg overflow-hidden mt-24 mx-6 sm:mx-12 md:mx-24 flex flex-col lg:flex-row items-center justify-center md:gap-24 text-center md:text-left">
      {/* Background circles */}
      <div className="absolute inset-0 flex justify-center items-center -z-0 opacity-30">
        <Image
          src="/assets/home/desktop/pattern-circles.svg"
          alt="Pattern Circles"
          width={944}
          height={944}
          className="object-contain scale-150 md:scale-100"
        />
      </div>

      {/* ZX9 Speaker Image */}
      <div className="justify-center md:justify-start md:ml-20 mt-16 md:mt-0 z-10 hidden lg:flex">
        <Image
          src="/assets/home/desktop/image-speaker-zx9.png"
          alt="ZX9 Speaker"
          width={410}
          height={493}
          className="object-contain w-[172px] sm:w-[250px] md:w-[350px]"
        />
      </div>
      <div className="flex justify-center md:justify-start md:ml-20 mt-16 md:mt-0 z-10 md:hidden">
        <Image
          src="/assets/home/mobile/image-speaker-zx9.png"
          alt="ZX9 Speaker"
          width={410}
          height={493}
          className="object-contain w-[172px] sm:w-[250px] md:w-[350px]"
        />
      </div>
      <div className="hidden justify-center  md:ml-20 mt-16 md:mt-0 z-10 lg:hidden md:flex">
        <Image
          src="/assets/home/tablet/image-speaker-zx9.png"
          alt="ZX9 Speaker"
          width={410}
          height={493}
          className="object-contain w-[172px] sm:w-[250px] md:w-[350px]"
        />
      </div>

      {/* Text content */}
      <div className="z-10 flex flex-col items-center md:items-start md:mr-20 mt-10 md:mt-4 mb-16 md:mb-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-widest leading-tight">
          ZX9 <br /> Speaker
        </h2>
        <p className="text-white/80 mt-6 mb-10 max-w-xs sm:max-w-sm">
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>
        <Link
          href="/speakers/zx9"
          className="bg-black text-white px-8 py-3 uppercase tracking-widest font-semibold hover:bg-[#4C4C4C] transition rounded-md"
        >
          See Product
        </Link>
      </div>
    </section>
  );
}
