import express from "express";

import {
    loginUser,
    registerUser,
    logoutUser,
    verifyUser,
    verifyAdmin
} from "../controllers/userController.js";

import authMiddleware from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", logoutUser);
userRouter.post(
    "/verify",
    authMiddleware,
    verifyUser
);

userRouter.get(
    "/verify-admin",
    authMiddleware,
    verifyAdmin
);

export default userRouter;