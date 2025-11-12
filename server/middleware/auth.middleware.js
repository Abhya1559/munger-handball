import jwt from "jsonwebtoken";

const playerAccess = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing" });
  }
  try {
    const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!verifyToken) {
      return res.status(400).json({ message: "access denied" });
    }
    req.user = verifyToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default playerAccess;
