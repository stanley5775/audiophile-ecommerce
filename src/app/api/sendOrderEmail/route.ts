import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items, subtotal, shipping, grandTotal, orderId } = body;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("❌ Missing RESEND_API_KEY in environment");
      return NextResponse.json(
        { message: "Missing API key" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    console.log("📩 Sending email to:", customer.email);

    const emailResponse = await resend.emails.send({
      from: "Audiophile <onboarding@resend.dev>",
      to: customer.email,
      subject: `Order Confirmation #${orderId}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
          <h1 style="color: #D87D4A;">Thank you for your order, ${customer.name}!</h1>
          <p>Your order <strong>#${orderId}</strong> has been received.</p>

          <h2>Order Summary</h2>
          <ul>
            ${items
              .map(
                (item: any) =>
                  `<li>${item.name} × ${item.quantity} — $${item.price * item.quantity}</li>`
              )
              .join("")}
          </ul>

          <p><strong>Subtotal:</strong> $${subtotal}</p>
          <p><strong>Shipping:</strong> $${shipping}</p>
          <p><strong>Grand Total:</strong> $${grandTotal}</p>

          <h2>Shipping Address</h2>
          <p>${customer.address}, ${customer.city}, ${customer.zip}, ${customer.country}</p>

          <p>If you have questions, contact us at <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.</p>
        </div>
      `,
    });

    console.log("✅ Email sent:", emailResponse);

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error: any) {
    console.error("🔥 Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}