import Player from "../model/player.model.js";
import bcrypt from "bcrypt";
import {
  registerPlayerSchema,
  resetSchema,
} from "../validators/players.zod.js";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
  try {
    const result = registerPlayerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0].message,
      });
    }

    const { name, email, password, aadhar, address, position, secretKey } =
      result.data;

    if (secretKey !== process.env.PLAYER_SECRET_KEY) {
      return res.status(401).json({ message: "Invalid secret code" });
    }

    const existingUser = await Player.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exist . Please Login" });
    }
    // const hashPassword = await bcrypt.hash(password, 10);
    const player = await Player.create({
      name,
      email,
      password,
      aadhar,
      address,
      position,
    });
    return res.status(201).json({
      message: "User registered successfully",
      player: {
        id: player._id,
        name: player.name,
        email: player.email,
        position: player.position,
      },
    });
  } catch (error) {
    console.log("server error", error.message);
    return res.status(500).json({ message: "server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "credential required" });
    }
    const isPlayer = await Player.findOne({ email });
    if (!isPlayer) {
      return res.status(404).json({ message: "Please register" });
    }

    const isMatch = await bcrypt.compare(password, isPlayer.password);
    if (!isMatch) {
      return res.status(401).json({ message: "credentials are incorrect" });
    }

    const accessToken = generateAccessToken({ id: isPlayer._id });
    const refreshToken = generateRefreshToken({ id: isPlayer._id });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Login successful",
      accessToken,
      isPlayer: {
        id: isPlayer._id,
        name: isPlayer.name,
        email: isPlayer.email,
      },
    });
  } catch (error) {
    console.log("server error", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const refreshToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized access Refresh Token missing" });
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = generateAccessToken({ id: decoded.id });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });
    return res.status(201).json({ message: "Access token refreshed" });
  } catch (error) {
    return res.status(501).json({ message: "Invalid refresh token" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Player.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Credential required" });
    }
    const user = await Player.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Email not found please Register" });
    }
    const secret = process.env.JWT_ACCESS_SECRET + user.password;
    const token = jwt.sign({ id: user.id, email: user.email }, secret, {
      expiresIn: "1h",
    });

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${user._id}/${token}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      connectionTimeout: 8000,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      pool: true,
    });
    const mailOptions = {
      to: user.email,
      from: `"Support Team" <${process.env.EMAIL}>`,
      subject: "Password Reset Instructions",
      html: `
        <!DOCTYPE html>
        <html>
          <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding:40px 0;">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:6px; overflow:hidden;">

                    <tr>
                      <td style="background-color:#111827; padding:20px; text-align:center;">
                        <h1 style="color:#ffffff; margin:0;">${process.env.APP_NAME}</h1>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:30px; color:#333; font-size:14px; line-height:1.6;">
                        <p>Dear ${user.name || "User"},</p>

                        <p>
                          We received a request to reset the password associated with your account.
                        </p>

                        <p style="text-align:center; margin:30px 0;">
                          <a href="${resetURL}"
                             style="background-color:#FFA500; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:4px; font-weight:bold;">
                            Reset Password
                          </a>
                        </p>

                        <p>
                          This link will expire in 1 hour. If you did not request a password reset, please ignore this email.
                        </p>

                        <p>
                          Kind regards,<br />
                          <strong>${process.env.APP_NAME} Support Team</strong>
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td style="background-color:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
                        © ${new Date().getFullYear()} ${process.env.APP_NAME}
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset link sent" });
  } catch (error) {
    console.error("PASSWORD RESET ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const result = resetSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0].message,
      });
    }

    const { id, token } = req.params;
    const { password } = result.data;
    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }
    const user = await Player.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const secret = process.env.JWT_ACCESS_SECRET + user.password;
    jwt.verify(token, secret);
    const hashPassword = await bcrypt.hash(password, 10);
    await Player.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: hashPassword,
        },
      },
    );
    // await user.save();
    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
