import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react"; 

const categories = [
  {
    name: "Headphones",
    image: "/assets/shared/desktop/image-category-thumbnail-headphones.png",
    href: "/headphones",
  },
  {
    name: "Speakers",
    image: "/assets/shared/desktop/image-category-thumbnail-speakers.png",
    href: "/speakers",
  },
  {
    name: "Earphones",
    image: "/assets/shared/desktop/image-category-thumbnail-earphones.png",
    href: "/earphones",
  },
];

export default function Categories() {
  return (
    <section className="flex flex-col sm:flex-row justify-center items-center gap-16 sm:gap-8 mt-20 mb-32 px-6 sm:px-12 md:px-24">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className="bg-[#F1F1F1] rounded-lg flex flex-col items-center justify-end relative pt-20 pb-6 w-full sm:w-1/3 text-center"
        >
          <div className="absolute -top-14">
            <Image
              src={cat.image}
              alt={cat.name}
              width={170}
              height={170}
              className="object-contain"
            />
          </div>

          <h3 className="text-lg font-bold tracking-widest uppercase mt-16 mb-2">
            {cat.name}
          </h3>

          <Link
            href={cat.href}
            className="flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-gray-500 hover:text-orange-500 transition group"
          >
            Shop
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      ))}
    </section>
  );
}
