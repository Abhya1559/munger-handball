// middlewares/role.middleware.js
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Access denied: insufficient privileges" });
      }

      next();
    } catch (error) {
      console.error("Role authorization error:", error);
      return res
        .status(500)
        .json({ message: "Server error during role check" });
    }
  };
};
