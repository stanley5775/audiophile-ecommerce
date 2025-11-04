import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 md:px-16 lg:px-32 py-12">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center text-center lg:text-left">
        {/* Logo */}
        <div className="mb-8 lg:mb-0">
          <Image
            src="/assets/shared/desktop/logo.svg"
            alt="Audiophile Logo"
            width={143}
            height={25}
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col lg:flex-row gap-4 lg:gap-8 uppercase tracking-widest text-sm font-semibold">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
          <Link href="/headphones" className="hover:text-orange-500">
            Headphones
          </Link>
          <Link href="/speakers" className="hover:text-orange-500">
            Speakers
          </Link>
          <Link href="/earphones" className="hover:text-orange-500">
            Earphones
          </Link>
        </nav>
      </div>

      {/* Description + Social Icons */}
      <div className="mt-8 flex flex-col lg:flex-row lg:justify-between lg:items-end text-center lg:text-left">
        <p className="text-gray-400 text-sm leading-relaxed lg:w-2/3">
          Audiophile is an all-in-one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we're open 7 days a week.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center lg:justify-end gap-6 mt-8 lg:mt-0">
          <Link href="#" className="hover:text-orange-500">
            <Facebook className="w-5 h-5" />
          </Link>
          <Link href="#" className="hover:text-orange-500">
            <Twitter className="w-5 h-5" />
          </Link>
          <Link href="#" className="hover:text-orange-500">
            <Instagram className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center lg:text-left">
        <p className="text-gray-500 text-xs">
          &copy; 2025 Audiophile. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
