import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmailToResetPassword = async (
  token: string,
  email: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Hello, You requested a password reset. Click the link below to reset your password: ${token}
  
  If you did not request this, please ignore this email.
  
  Thank you.`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent successfully!", info);
      }
    });
  } catch (error) {
    console.error({ error: "Unable to send mail now" });
    throw new Error("Failed to send password reset email");
  }
};
