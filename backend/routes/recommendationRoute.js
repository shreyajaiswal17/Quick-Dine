import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { getRecommendations } from "../controllers/recommendationController.js";

const recommendationRouter = express.Router();

recommendationRouter.get("/", authMiddleware, getRecommendations);

export default recommendationRouter;