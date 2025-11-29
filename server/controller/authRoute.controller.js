import jwt from "jsonwebtoken";
export const authRoute = (req, res) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (!token) {
    return res.status(400).json({ message: "Unauthorized User" });
  }
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return res.json({
      success: true,
      user: {
        id: decoded.payload,
      },
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
