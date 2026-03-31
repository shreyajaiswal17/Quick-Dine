import express from 'express'
import { loginUser,registerUser, verifyUser, logoutUser } from "../controllers/userController.js"
import authMiddleware from "../middlewares/auth.js"


const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/verify", authMiddleware, verifyUser)
userRouter.post("/logout", logoutUser)


export default userRouter;
