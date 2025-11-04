"use client";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  // Calculate total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed inset-0 bg-black/50 z-50 transition-opacity ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`      absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      bg-white p-6 flex flex-col transition-transform rounded-lg
      w-full max-w-md md:max-w-md lg:max-w-96
      ${isOpen ? "scale-100" : "scale-95"}
      lg:top-0 lg:left-auto lg:right-0 lg:translate-x-0 lg:translate-y-0
    `}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-6 flex justify-between items-center">
          Cart
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800"
          >
            <X size={28} />
          </button>
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-gray-500">
                    $ {item.price} x {item.quantity} = ${" "}
                    {item.price * item.quantity}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <button
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
                    onClick={() => addToCart({ ...item, quantity: 1 })}
                  >
                    +
                  </button>
                  <button
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
                    onClick={() => addToCart({ ...item, quantity: -1 })}
                  >
                    -
                  </button>
                </div>
                <button
                  className="text-red-500 hover:underline ml-2"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Cart Summary */}
        <div className="mt-6 border-t pt-4">
          <p className="flex justify-between font-bold">
            Total <span>$ {total}</span>
          </p>
          <Link
            href="/checkout"
            className="block mt-4 bg-orange-500 hover:bg-orange-600 text-white text-center uppercase text-sm tracking-widest px-6 py-3 rounded-lg"
            onClick={onClose}
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
