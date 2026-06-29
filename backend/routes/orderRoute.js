import express from "express"
import orderModel from "../models/orderModel.js";
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js";
import authMiddleware from "../middlewares/auth.js";
import adminAuth from "../middlewares/adminAuth.js";

const orderRouter = express.Router()

orderRouter.post("/place",authMiddleware, placeOrder);

orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);


orderRouter.post(
    "/list",
    authMiddleware,
    adminAuth,
    listOrders
);
orderRouter.post(
    "/status",
    authMiddleware,
    adminAuth,
    updateStatus
);

export default orderRouter;
