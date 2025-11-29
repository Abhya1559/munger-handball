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
      return res
        .status(402)
        .json({ success: false, message: "all fields are required" });
    }
    const user = await playerRegistration.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found please register" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(403)
        .json({ success: false, message: "Credentials are not valid" });
    }

    const payLoad = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const accessToken = jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10m",
    });

    const refreshToken = jwt.sign(payLoad, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    });
  } catch (error) {
    console.log("Server error", error);
    return res
      .status(502)
      .json({ success: false, message: "Login Server Error" });
  }
};

export const getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await playerRegistration.findByPk(id);
    if (!player) {
      return res.status(404).json({ message: "player not found" });
    }
    console.log(player);
    res.status(200).json({ success: true, player });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "server error" });
  }
};

export const getAllPlayer = async (req, res) => {
  try {
    const allPlayers = await playerRegistration.findAll({
      attributes: ["id", "name", "email", "age", "phone", "gender", "position"],
      order: [["id", "ASC"]],
    });
    res.status(200).json(allPlayers);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, age, gender, position } = req.body;

    const player = await playerRegistration.findByPk(id);
    if (!player) {
      return res.status(404).json({ message: "player not found" });
    }
    if (req.user.role !== "admin" && req.user.id !== parseInt(id)) {
      return res.status(403).json({ message: "unauthorized user" });
    }
    const updatedPlayer = await player.update({
      name: name || player.name,
      email: email || player.email,
      phone: phone || player.phone,
      age: age || player.age,
      gender: gender || player.gender,
      position: position || player.position,
    });
    return res.status(200).json({
      message: "Player profile updated successfully",
      user: updatedPlayer,
    });
  } catch (error) {
    console.error("Error updating player:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const player = await playerRegistration.findByPk(id);
    if (!player) {
      return res.status(404).json({ message: "player not found" });
    }
    if (req.user.role !== "admin" && req.user.id !== player.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    await player.destroy();
    return res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.log("Server error while deleting", error);
    return res.status(501).json({ message: "server error" });
  }
};
export const logoutPlayer = (req, res) => {
  try {
    const token = req.cookies;

    if (!token?.jwt) {
      return res.status(400).json({ message: "User not logged in" });
    }

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
