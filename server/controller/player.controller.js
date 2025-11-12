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
    const user = await playerRegistration.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found please register" });
    }
    const isPasswordValid = bcrypt.compare(user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Credentials are not valid" });
    }
    return res.status(201).json({ message: "Login successful" });
  } catch (error) {
    console.log("Server error", error);
    return res.status(502).json({ message: "Login Server Error" });
  }
};
