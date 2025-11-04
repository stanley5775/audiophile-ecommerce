import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items, subtotal, shipping, grandTotal, orderId } = body;

    const emailResponse = await resend.emails.send({
      from: "Audiophile <onboarding@resend.dev>", // use this verified sender first
      to: customer.email,
      subject: 'Order Confirmation #${orderId}',
      html: `
        <div style="font-family: sans-serif;">
          <h1 style="color:#D87D4A;">Thanks for your order, ${customer.name}!</h1>
          <p>Your order <strong>#${orderId}</strong> has been received.</p>
          <p><strong>Total:</strong> $${grandTotal}</p>
        </div>
      `,
    });

    console.log("Resend API Response:", emailResponse);

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}