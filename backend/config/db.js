import mongoose from 'mongoose';

// converts the function into a Promise.(A Promise in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.)

export const connectDB = async () => {
    // Waits for the Promise to resolve
    await mongoose.connect('mongodb+srv://Shreya:shreya@cluster0.byzqqjq.mongodb.net/Quick-Dine').then(()=>console.log("DB connected"))
}