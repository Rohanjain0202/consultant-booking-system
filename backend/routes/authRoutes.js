// import express from "express";
// import { register, login } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/register", register);
// router.post('/login', login);


// export default router;
// backend/routes/authRoutes.js

import express from "express";
import {
  register,
  login,
  checkAuth,
  refreshToken,
  logout
} from "../controllers/authController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

// Protected Route - checks if user is authenticated (uses refreshToken internally)
router.get("/check-auth", protect, checkAuth); // Optional: apply `protect` for more control

export default router;


