// backend/middlewares/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No access token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid access token payload" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("🔒 Auth Middleware Error:", err.message);
    return res.status(401).json({ message: "Access token is invalid or expired" });
  }
};
