// import jwt from "jsonwebtoken";

// export const verifyJwt = (req, res, next) => {
//   const authHeader = req.headers.authorization || req.headers.Authorization;
//   console.log(authHeader);

//   if (!authHeader?.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "unauthorized" });
//   }
//   const token = authHeader.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "unauthorized" });
//   }
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
//     if (error) return res.status(403).json({ message: "Forbidden" });

//     req.email = decoded.email;
//     next();
//   });
// };

import jwt from "jsonwebtoken";

export const verifyJwt = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(404).json({ message: "Token is missing" });
  }
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decoded;
    next();
  });
};
