import express from "express";
import {
    loginUser,
    registerUser,
    logoutUser,
    verifyAdmin
} from "../controllers/userController.js";

import authMiddleware from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", logoutUser);

userRouter.get(
    "/verify-admin",
    authMiddleware,
    verifyAdmin
);

export default userRouter;