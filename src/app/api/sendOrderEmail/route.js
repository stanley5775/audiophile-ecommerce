import { Resend } from "resend";

export async function POST(req) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(
        "Server configuration error: missing RESEND_API_KEY",
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await req.json();
    const { customer, items, subtotal, shipping, grandTotal, orderId } = body;

    await resend.emails.send({
      from: "Audiophile <orders@yourdomain.com>",
      to: customer.email,
      subject: 'Order Confirmation #${orderId}',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
          <h1 style="color: #D87D4A;">Thank you for your order, ${customer.name}!</h1>
          <p>Your order <strong>#${orderId}</strong> has been received.</p>

          <h2 style="margin-top: 20px;">Order Summary</h2>
          <ul>
            ${items
              .map(
                (item) =>
                  <li>${item.name} x ${item.quantity} - $${item.price * item.quantity}</li>
              )
              .join("")}
          </ul>

          <p><strong>Subtotal:</strong> $${subtotal}</p>
          <p><strong>Shipping:</strong> $${shipping}</p>
          <p><strong>Grand Total:</strong> $${grandTotal}</p>

          <h2>Shipping Address</h2>
          <p>${customer.address}, ${customer.city}, ${customer.zip}, ${customer.country}</p>

          <p>If you have questions, contact us at <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.</p>
          <p style="margin-top: 20px;">
            <a href="https://yourwebsite.com/orders/${orderId}"
               style="background-color: #D87D4A; color: white; padding: 10px 20px; text-decoration: none;">
               View your order
            </a>
          </p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ message: "Email sent successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    return new Response("Failed to send email", { status: 500 });
  }
}