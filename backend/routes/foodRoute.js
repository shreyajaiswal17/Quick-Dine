// Connects HTTP requests (like POST /addfood) to controller functions.

import express from 'express';
import { addFood } from '../controllers/foodController.js';
import multer from 'multer'

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
foodRouter.post('/add', upload.single('image'), addFood);

export default foodRouter;