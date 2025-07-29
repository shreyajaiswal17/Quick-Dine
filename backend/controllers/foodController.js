// we wil write api to add food in models/ db
// Contains functions that run when someone hits an API endpoint

import foodModel from "../models/foodModel.js";
import fs from 'fs';

const addFood = async (req, res) => {
    try {
        
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file missing" });
        }

        let image_filename = `${req.file.filename}`;
        
        // Handle price field (check for both 'price' and 'price ' due to potential trailing space)
        const priceValue = req.body.price || req.body['price '];
        
        if (!priceValue || priceValue.toString().trim() === '') {
            return res.status(400).json({ success: false, message: "Price is required" });
        }
        
        const price = Number(priceValue.toString().trim());
        console.log("Converted price:", price);
        
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ success: false, message: "Price must be a valid positive number" });
        }

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price:Number(price),
            category: req.body.category,
            image: image_filename,
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export{addFood}