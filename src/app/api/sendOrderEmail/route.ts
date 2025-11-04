import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { message: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await req.json();

    const {
      customer,
      items,
      subtotal,
      shipping,
      grandTotal,
      orderId,
    }: {
      customer: {
        name: string;
        email: string;
        address: string;
        city: string;
        zip: string;
        country: string;
      };
      items: { name: string; price: number; quantity: number }[];
      subtotal: number;
      shipping: number;
      grandTotal: number;
      orderId: string | number;
    } = body;

    const emailResponse = await resend.emails.send({
      from: "Audiophile <orders@yourdomain.com>",
      to: customer.email,
      subject: `Order Confirmation #${orderId}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h1 style="color:#D87D4A;">Thank you for your order, ${customer.name}!</h1>
          <p>Your order <strong>#${orderId}</strong> has been received.</p>
          <h2 style="margin-top: 20px;">Order Summary</h2>
          <ul>
            ${items
              .map(
                (item) =>
                  `<li>${item.name} x ${item.quantity} — $${
                    item.price * item.quantity
                  }</li>`
              )
              .join("")}
          </ul>
          <p><strong>Subtotal:</strong> $${subtotal}</p>
          <p><strong>Shipping:</strong> $${shipping}</p>
          <p><strong>Grand Total:</strong> $${grandTotal}</p>
          <h3>Shipping Address</h3>
          <p>${customer.address}, ${customer.city}, ${customer.zip}, ${customer.country}</p>
          <p style="margin-top:20px;">Need help? Contact <a href="mailto:support@yourdomain.com">support@yourdomain.com</a></p>
        </div>
      `,
    });

    console.log("Resend API response:", emailResponse);

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}