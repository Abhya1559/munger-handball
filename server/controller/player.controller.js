import jwt from "jsonwebtoken";
import playerRegistration from "../models/players.models.js";
import bcrypt from "bcrypt";

export const createPlayer = async (req, res) => {
  try {
    const { name, email, password, gender, age, phone, position } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !gender ||
      !age ||
      !phone ||
      !position
    ) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const existingUser = await playerRegistration.findOne({
      where: { email },
    });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const player = await playerRegistration.create({
      name,
      email,
      age,
      gender,
      phone,
      position,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Registered successfully", player });
  } catch (error) {
    console.log("Server error while Registration", error);
    res.status(500).json({ message: "Error while registration" });
  }
};

export const loginPlayer = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(402).json({ message: "all fields are required" });
    }
    const user = await playerRegistration.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found please register" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Credentials are not valid" });
    }
    const accessToken = jwt.sign(
      {
        email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10m",
      }
    );

    const refreshToken = jwt.sign(
      {
        email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({ message: "Login successful", accessToken });
  } catch (error) {
    console.log("Server error", error);
    return res.status(502).json({ message: "Login Server Error" });
  }
};
