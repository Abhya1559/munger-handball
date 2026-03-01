import Player from "../model/player.model.js";
import bcrypt from "bcrypt";
import { registerPlayerSchema } from "../validators/players.zod.js";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
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
    const hashPassword = await bcrypt.hash(password, 10);
    const player = await Player.create({
      name,
      email,
      password: hashPassword,
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
      return res.status(401).json({ message: "credential required" });
    }
    const isPlayer = await Player.findOne({ email });
    if (!isPlayer) {
      return res.status(201).json({ message: "Please register" });
    }
    const isMatch = await bcrypt.compare(password, isPlayer.password);
    if (!isMatch) {
      return res.status(401).json({ message: "credentials are incorrect" });
    }
    const accessToken = generateAccessToken({ id: isPlayer._id });
    const refreshToken = generateRefreshToken({ id: isPlayer._id });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Login successful",
      isPlayer: {
        id: isPlayer._id,
        name: isPlayer._name,
        email: isPlayer._email,
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
    const newAccessToken = generateAccessToken({ id: decoded._id });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    return res.status(201).json({ message: "Access token refreshed" });
  } catch (error) {
    return res.status(501).json({ message: "Invalid refresh token" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json("Logout successful");
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
