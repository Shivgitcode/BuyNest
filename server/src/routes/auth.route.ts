import express from "express";
import { getUser, login, logout, signup } from "../controllers/auth";
import { updatePassword, updateUser } from "../controllers/user";
import { checkAuth } from "../middleware/auth.middleware";
export const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/auth/user", checkAuth, getUser);
authRouter.post("/logout", logout);
authRouter.put("/user/:userId", updateUser);
authRouter.put("/user/password", updatePassword);
