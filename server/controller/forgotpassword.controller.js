import playerRegistration from "../models/players.models.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

export const forgotPassword = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(403).json({ message: "please fill all the fields" });
  }
  try {
    const playerEmail = await playerRegistration.findOne({ where: { email } });
    if (!playerEmail) {
      return res.status(403).json({ message: "unauthorized user" });
    }

    const resetToken = jwt.sign(
      { id: playerEmail.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );
    const resetLink = `http://localhost:5000/api/players/reset-password/${playerEmail.id}/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });
    const mailOption = {
      from: process.env.GOOGLE_EMAIL,
      to: email,
      subject: "Password Recovery mail",
      html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
    <h2 style="color: #2b7cff;">Password Reset Request</h2>
    <p>Hi ${name || "there"},</p>
    <p>We received a request to reset your password for your <b>[Your App Name]</b> account.</p>
    <p>Click the button below to reset your password:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetLink}" 
         style="background-color: #2b7cff; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
         Reset Password
      </a>
    </div>
    <p>If you didn’t request a password reset, you can safely ignore this email.</p>
    <p style="font-size: 14px; color: #777;">Note: This link will expire in 15 minutes for your security.</p>
    <br/>
    <p>Best regards,<br/>
    <b>The Munger handball Team</b></p>
  </div>
  `,
    };
    await transporter.sendMail(mailOption);

    console.log(`Password reset email sent to ${email}`);
    return res
      .status(200)
      .json({ message: `Password reset mail sent to ${email}` });
  } catch (error) {
    console.log("Server error during forgot-password", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: "all fields are required" });
  }
  const { playerId, token } = req.params;
  try {
    const player = await playerRegistration.findByPk(playerId);
    if (!player) {
      return res.status(402).json({ message: "player not found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id !== parseInt(playerId)) {
      return res.status(401).json({ message: "Invalid token." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await player.update({
      password: hashPassword,
    });
    return res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Reset link expired." });
    }
    return res.status(500).json({ message: "Server error." });
  }
};
