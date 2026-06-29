// Connects HTTP requests (like POST /addfood) to controller functions.

import express from 'express';
import { addFood,listFood,removeFood, aiSearchFood} from '../controllers/foodController.js';
import multer from 'multer'
import authMiddleware from "../middlewares/auth.js";
import adminAuth from "../middlewares/adminAuth.js";

const foodRouter = express.Router();

// Image storage Engine

const storage = multer.diskStorage({
    destination :"uploads",
    filename:(req, file, cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

// pass it into Multer to create the middleware:
const upload = multer({storage:storage})

// Routes
// Express doesn't understand how to extract files from the request body.

foodRouter.get('/list',listFood)
foodRouter.post('/ai-search', aiSearchFood)

foodRouter.post(
    "/add",
    authMiddleware,
    adminAuth,
    upload.single("image"),
    addFood
);
foodRouter.post(
    "/remove",
    authMiddleware,
    adminAuth,
    removeFood
);

export default foodRouter;