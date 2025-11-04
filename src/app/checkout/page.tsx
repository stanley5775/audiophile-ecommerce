"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.zip) newErrors.zip = "ZIP is required";
    if (!form.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

  const orderId = Math.floor(Math.random() * 1000000).toString();

  const orderData = {
    customer: form,
    items: cart,
    subtotal: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    shipping: 50,
    grandTotal:
      cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + 50,
    orderId,
  };

  try {
    const res = await fetch("/api/sendOrderEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) throw new Error("Failed to send confirmation email");

    alert("Order placed! Confirmation email sent successfully.");
    clearCart();
  } catch (err) {
    console.error("Error sending email:", err);
    alert("Something went wrong while sending the confirmation email.");
  }
};

  return (
    <main className="px-6 md:px-16 lg:px-32 py-12 max-w-[1110px] mx-auto">
      <Link
        href="/"
        className="text-gray-600 hover:text-orange-500 text-sm mb-8 inline-block"
      >
        Go Back
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center lg:text-left">
        Checkout
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row gap-12"
      >
        {/* ===== Billing / Shipping Form ===== */}
        <section className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6 uppercase tracking-widest">
            Billing Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                ZIP / Postal Code
              </label>
              <input
                name="zip"
                value={form.zip}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              />
              {errors.zip && (
                <p className="text-red-500 text-sm">{errors.zip}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold mb-1">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-semibold mb-1">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Country
              </label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}
            </div>
          </div>
        </section>

        {/* ===== Order Summary ===== */}
        <section className="flex-1 bg-gray-50 p-6 rounded-lg shadow-md mt-8 lg:mt-0">
          <h2 className="text-xl font-bold mb-6 uppercase tracking-widest">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-gray-500">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-bold">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between font-bold mb-2">
              <p>Subtotal</p>
              <p>
                $
                {cart.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}
              </p>
            </div>
            <div className="flex justify-between font-bold mb-2">
              <p>Shipping</p>
              <p>$50</p>
            </div>
            <div className="flex justify-between font-bold text-xl mt-2">
              <p>Grand Total</p>
              <p>
                $
                {cart.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                ) + 50}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white uppercase text-sm tracking-widest px-6 py-3 mt-6 rounded-lg"
          >
            Place Order
          </button>
        </section>
      </form>
    </main>
  );
}
