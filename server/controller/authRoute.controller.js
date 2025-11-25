import jwt from "jsonwebtoken";
export const authRoute = async (req, res) => {
  const token = await req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "Unauthorized User" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      success: true,
      user: decoded,
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
