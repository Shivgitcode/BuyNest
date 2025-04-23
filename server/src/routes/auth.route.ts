import express from "express";
import { getUser, login, logout, signup, verifyOtp } from "../controllers/auth";
import { updatePassword, updateUser } from "../controllers/user";
import { checkAuth } from "../middleware/auth.middleware";
export const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/auth/user", checkAuth, getUser);
authRouter.post("/logout", logout);
authRouter.post("/verify-otp", verifyOtp);
authRouter.put("/user/password", checkAuth, updatePassword);
authRouter.put("/user/:userId", checkAuth, updateUser);
