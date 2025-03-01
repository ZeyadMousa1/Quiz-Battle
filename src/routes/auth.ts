import express from "express";
import { signIn, signup } from "../controllers/auth";
import asyncHandler from "express-async-handler";

export const authRouter = express.Router();

authRouter.route("/signup").post(asyncHandler(signup));
authRouter.route("/signin").post(asyncHandler(signIn));
