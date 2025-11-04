"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Categories from "../../components/Categories";
import BestGear from "../../components/BestGear";
import { useCart } from "../../context/CartContext";
import CartDrawer from "../../components/CartDrawer";

export default function ProductPage() {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);


  const params = useParams();
  const slug = params.slug;
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch("/assets/db.json")
      .then((res) => res.json())
      .then((json) => {
        const earphones = json.data.filter((item: any) => item.category === "earphones");
        console.log("All earphones:", earphones);

        const found = earphones.find((item: any) => item.slug === slug);
        console.log("Found product:", found);

        setProduct(found || null);
      })
      .catch((err) => console.error("Error loading data:", err));
  }, [slug]);

  if (!product) return <p className="text-center py-20 text-gray-500">Product not found</p>;

  return (
    <main className="px-6 md:px-16 lg:px-32 py-20">
      <Link
        href={`/earphones`}
        className=" hover:text-orange-600 text-gray-600 text-sm mb-20"
      >
        Go back
      </Link>

      {/* Product Header */}
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <Image
          src={product.image.desktop.replace("./", "/")}
          alt={product.name}
          width={340}
          height={460}
          className="rounded-lg w-full object-cover"
        />
        <div className="text-center md:text-left">
          {product.new && (
            <p className="uppercase text-orange-500 tracking-[8px] mb-4">
              New Product
            </p>
          )}
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            {product.name}
          </h1>
          <p className="text-gray-500 mb-6">{product.description}</p>
          <p className="font-bold mb-8">$ {product.price}</p>

          <div className="flex items-center gap-2 mb-4">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
          </div>
          <button
            onClick={() => {
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity,
                image: product.image.desktop.replace("./", "/"),
              });
              setIsCartOpen(true);
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white uppercase text-sm tracking-widest px-6 py-3"
          >
            Add to Cart
          </button>
           <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </div>

      {/* Features & In the Box */}
      <section className="px-0 md:px-16 lg:px-32 py-24 max-w-[1110px] mx-auto flex flex-col lg:flex-row gap-16">
        <div className="lg:w-[70%]">
          <h3 className="uppercase text-2xl font-bold mb-6 tracking-widest">
            Features
          </h3>
          <p className="text-gray-500 leading-[1.9] text-[15px] whitespace-pre-line">
            {product.features}
          </p>
        </div>
        <div className="lg:w-[30%]">
          <h3 className="uppercase text-2xl font-bold mb-6 tracking-widest">
            In the Box
          </h3>
          <ul className="space-y-3">
            {product.includes.map((item: any, index: number) => (
              <li key={index} className="flex items-center gap-4">
                <span className="text-orange-500 font-bold">
                  {item.quantity}x
                </span>
                <span className="text-gray-500">{item.item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="px-6 md:px-16 lg:px-32 py-24 grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <div className="md:col-span-1 flex flex-col gap-6">
          <Image
            src={product.gallery.first.desktop.replace("./", "/")}
            alt={"${product.name} gallery 1"}
            width={445}
            height={280}
            className="rounded-lg object-cover w-full h-full"
          />
          <Image
            src={product.gallery.second.desktop.replace("./", "/")}
            alt={"${product.name} gallery 2"}
            width={445}
            height={280}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
        <div className="md:col-span-1 lg:col-span-2">
          <Image
            src={product.gallery.third.desktop.replace("./", "/")}
            alt={"${product.name} gallery 3"}
            width={635}
            height={592}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </section>

      {/* You May Also Like */}
      <section className="py-24 max-w-[1110px] mx-auto text-center px-6 md:px-16 lg:px-0">
        <h2 className="uppercase text-2xl font-bold tracking-widest mb-16">
          You May Also Like
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-20 md:gap-6">
          {product.others.map((item: any, index: number) => (
            <div key={index} className="flex flex-col items-center gap-6">
              <Image
                src={item.image.desktop.replace("./", "/")}
                alt={item.name}
                width={350}
                height={200}
                className="rounded-lg w-full object-cover"
              />
              <h3 className="text-xl font-bold">{item.name}</h3>
              {/* Dynamic link based on category */}
              <Link
                href={`/${item.category}/${item.slug}`}
                className="bg-orange-500 hover:bg-orange-600 text-white uppercase text-sm tracking-widest px-6 py-3"
              >
                See Product
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Categories />
      <BestGear />
    </main>
  );
}