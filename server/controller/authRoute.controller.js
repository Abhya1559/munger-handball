import jwt from "jsonwebtoken";
export const authRoute = (req, res) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    console.log(decoded);
    return res.json({
      success: true,
      user: {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
      },
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
