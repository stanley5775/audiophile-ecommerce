"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    payment: "e-Money",
    eMoneyNumber: "",
    eMoneyPin: "",
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
    if (form.payment === "e-Money") {
      if (!form.eMoneyNumber)
        newErrors.eMoneyNumber = "e-Money Number required";
      if (!form.eMoneyPin) newErrors.eMoneyPin = "e-Money PIN required";
    }
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

      setShowModal(true);
      clearCart();
    } catch (err) {
      console.error("Error sending email:", err);
      alert("Something went wrong while sending the confirmation email.");
    }
  };

  return (
    <main className="px-6 md:px-16 lg:px-32 py-12 max-w-[1110px] mx-auto relative mt-12 md:mt-32">
      <Link
        href="/"
        className="text-gray-600 hover:text-orange-500 text-sm mb-8 inline-block"
      >
        Go Back
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-left">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="gap-12 grid grid-cols-1 lg:grid-cols-[2fr-1fr] items-start max-w-[1110px] mx-auto w-full">
        {/* ===== Billing / Shipping Form ===== */}
        <section className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6 uppercase tracking-widest text-orange-500">
            Billing Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 hover:border-orange-500"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 hover:border-orange-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4 uppercase tracking-widest text-orange-500">
              Shipping Info
            </h2>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Address
              </label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 hover:border-orange-500"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 hover:border-orange-500"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  ZIP Code
                </label>
                <input
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 hover:border-orange-500"
                />
                {errors.zip && (
                  <p className="text-red-500 text-sm">{errors.zip}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold mb-1">
                Country
              </label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 hover:border-orange-500"
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}
            </div>
          </div>

          {/* ===== Payment Details ===== */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 uppercase tracking-widest text-orange-500">
              Payment Details
            </h2>
            <label className="block text-sm font-semibold mb-1">
              Payment method
            </label>
            <div className="space-y-3 items-center justify-end">
              <label className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:border-orange-500">
                <input
                  type="radio"
                  name="payment"
                  value="e-Money"
                  checked={form.payment === "e-Money"}
                  onChange={handleChange}
                />
                <span>e-Money</span>
              </label>
              <label className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:border-orange-500">
                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={form.payment === "Cash on Delivery"}
                  onChange={handleChange}
                />
                <span>Cash on Delivery</span>
              </label>
            </div>

            {form.payment === "e-Money" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    e-Money Number
                  </label>
                  <input
                    name="eMoneyNumber"
                    value={form.eMoneyNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.eMoneyNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.eMoneyNumber}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    e-Money PIN
                  </label>
                  <input
                    name="eMoneyPin"
                    value={form.eMoneyPin}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.eMoneyPin && (
                    <p className="text-red-500 text-sm">{errors.eMoneyPin}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4 mt-4">
                <Image
                  src="/assets/checkout/icon-cash-on-delivery.svg"
                  alt="cash"
                  width={40}
                  height={40}
                />
                <p className="text-gray-600 text-sm">
                  The 'Cash on Delivery' option enables you to pay in cash when
                  our delivery courier arrives. Please make sure your address is
                  correct so your order won't be cancelled.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ===== Order Summary ===== */}
        <section className="flex-1 bg-gray-50 p-6 rounded-lg shadow-md mt-8 w-full lg:w-auto p-6 self-start h-auto max-h-[500px] overflow-y-auto">
          <h2 className="text-xl font-bold mb-6 uppercase tracking-widest">
            Summary
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

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between mb-2 text-gray-500">
              <p>Total</p>
              <p>
                $
                {cart.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}
              </p>
            </div>
            <div className="flex justify-between mb-2 text-gray-500">
              <p>Shipping</p>
              <p>$50</p>
            </div>
            <div className="flex justify-between font-bold text-xl mt-2">
              <p>Grand Total</p>
              <p className="text-orange-500">
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
            Continue & Pay
          </button>
        </section>
      </form>

      {/* ===== Success Modal ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-md md:w-full">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-3xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Thank You for Your Order
            </h2>
            <p className="text-gray-600 mb-6">
              You will receive an email confirmation shortly.
            </p>

            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              {cart.length > 0 && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Image
                        src={cart[0].item.image}
                        alt={cart[0].item.name}
                        width={50}
                        height={50}
                        className="rounded-lg"
                      />
                      <div>
                        <p className="font-bold">{cart[0].name}</p>
                        <p className="text-gray-500">
                          ${cart[0].price} x {cart[0].quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold">
                      ${cart[0].price * cart[0].quantity}
                    </p>
                  </div>
                  {cart.length > 1 && (
                    <p className="text-gray-500 text-sm">
                      and {cart.length - 1} other item(s)
                    </p>
                  )}
                </>
              )}
              <div className="bg-black text-white rounded-lg p-4 mt-4">
                <p className="text-gray-400 text-sm">GRAND TOTAL</p>
                <p className="text-2xl font-bold">
                  $
                  {cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  ) + 50}
                </p>
              </div>
            </div>

            <Link
              href="/"
              className="block bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg uppercase tracking-widest"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
