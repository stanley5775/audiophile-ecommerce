import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { customer, items, orderId, subtotal, shipping, grandTotal } = body;

    // Create the Nodemailer transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // or your mail host
      port: 465,
      secure: true, // true for port 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2️⃣ Build email content
    const itemList = items
      .map(
        (item: any) =>
          `<li>${item.name} (${item.quantity} × $${item.price})</li>`
      )
      .join("");

    const html = `
      <div style="font-family:Arial, sans-serif;">
        <h2>Order Confirmation - #${orderId}</h2>
        <p>Thank you for your purchase, <b>${customer.name}</b>!</p>
        <p>Here's a summary of your order:</p>
        <ul>${itemList}</ul>
        <p><b>Subtotal:</b> $${subtotal}</p>
        <p><b>Shipping:</b> $${shipping}</p>
        <p><b>Grand Total:</b> $${grandTotal}</p>
        <hr />
        <p>Delivery Address:</p>
        <p>${customer.address}, ${customer.city}, ${customer.country}</p>
      </div>
    `;

    // 3️⃣ Send the email
    await transporter.sendMail({
      from: `"Audiophile Store" <${process.env.EMAIL_USER}>`,
      to: customer.email, // customer's email
      subject: `Your Order Confirmation #${orderId}`,
      html,
    });

    return Response.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}