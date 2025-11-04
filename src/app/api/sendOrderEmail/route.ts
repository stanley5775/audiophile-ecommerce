import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items, subtotal, shipping, grandTotal, orderId } = body;

    // Create transporter inside the route
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      service: "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"Audiophile" <${process.env.EMAIL_USER}>',
      to: customer.email,
      subject: 'Order Confirmation #${orderId}',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
          <h1 style="color: #D87D4A;">Thank you for your order, ${customer.name}!</h1>
          <p>Your order <strong>#${orderId}</strong> has been received.</p>
          <ul>
            ${items.map(
              (item: any) =>
               `<li>${item.name} x ${item.quantity} - $${item.price * item.quantity}</li>`
            ).join("")}
          </ul>
          <p><strong>Subtotal:</strong> $${subtotal}</p>
          <p><strong>Shipping:</strong> $${shipping}</p>
          <p><strong>Grand Total:</strong> $${grandTotal}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Email sent successfully" }), { status: 200 });
  } catch (error) {
    console.error("Email sending failed:", error);
    return new Response(JSON.stringify({ message: "Failed to send email" }), { status: 500 });
  }
}