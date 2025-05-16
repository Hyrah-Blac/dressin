import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Make sure your .env variables are loaded

const router = express.Router();

// ✅ Configure Nodemailer transporter (using Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address from .env
    pass: process.env.EMAIL_PASS, // The app password from .env
  },
});

// ✅ Contact form submission handler
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  console.log("📩 Received contact message:", { name, email, message });

  // ✅ Prepare email options
  const mailOptions = {
    from: `"Dressin Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER, // Where you want to receive the emails
    subject: `New Contact Message from ${name}`,
    text: `
You have received a new message from your website contact form.

- Name: ${name}
- Email: ${email}

Message:
${message}
    `,
  };

  try {
    // ✅ Send the email
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully.");
    res.status(200).json({ message: "Message received and email sent successfully." });
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    res.status(500).json({ error: "Failed to send email. Please try again later." });
  }
});

export default router;
