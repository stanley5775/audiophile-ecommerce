"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  

  return (
    <header className="w-full absolute top-0 left-0 z-50 bg-transparent">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6 border-b border-white/20">
        {/* Left Section — Menu icon (Mobile only) */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(!open)}
            className="text-white md:hidden"
            aria-label="Toggle Menu"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
    
          {/* Logo */}
          <Link href="/">
            <Image
              src="/assets/shared/desktop/logo.svg"
              alt="Audiophile Logo"
              width={140}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10 uppercase text-white tracking-widest text-sm">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/headphones">Headphones</Link>
          </li>
          <li>
            <Link href="/speakers">Speakers</Link>
          </li>
          <li>
            <Link href="/earphones">Earphones</Link>
          </li>
        </ul>

        {/* Cart icon (both mobile and desktop) */}
        <button
          aria-label="Cart" className="text-white">
          <ShoppingCart size={24} />
        </button>
        
      </nav>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="absolute top-[90px] left-0 w-full bg-white text-black p-6 md:hidden shadow-xl">
          <ul className="flex flex-col gap-6 text-lg font-semibold uppercase">
            <li>
              <Link href="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/headphones" onClick={() => setOpen(false)}>
                Headphones
              </Link>
            </li>
            <li>
              <Link href="/speakers" onClick={() => setOpen(false)}>
                Speakers
              </Link>
            </li>
            <li>
              <Link href="/earphones" onClick={() => setOpen(false)}>
                Earphones
              </Link>
            </li>
          </ul>
        </div>
        
      )}
      
    </header>
    
  );
}
