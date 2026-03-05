import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL,
      to,
      subject,
      html,
    });
    return data;
  } catch (error) {
    console.log("EMAIL ERROR:", error);
    throw new Error("Email sending failed");
  }
};
