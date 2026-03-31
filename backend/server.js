import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import path from 'path';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// app config
const app = express()
const port = process.env.PORT || 4000;

// middleware
app.use(express.json())
// Converts incoming JSON data into JavaScript objects
app.use(cookieParser())
// Parse incoming cookies from requests
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000","http://localhost:5175", "https://quick-dine-admin.vercel.app", "https://quick-dine-frontend-six.vercel.app"],
    credentials: true
}))
// Allows cookies, authorization headers, and credentials
// CORS is essentially your backend giving permission slips to specific websites, saying "Yes, you're allowed to talk to me!"

// db connection
connectDB();

// api endpoint 
app.use("/api/food", foodRouter)
app.use("/images", express.static(path.join(process.cwd(), 'uploads'))); 
//  gives the current root directory of your project
// this creates an absolute path to the uploads directory relative to where your server is running
// so that the images can be accessed via http://localhost:4000/images/filename.jpg
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)



app.get("/",(req, res)=>{
    res.send("API Working")
})

app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`)
})
