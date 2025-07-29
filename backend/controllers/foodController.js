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
        const price = Number(req.body.price);
        
        if (isNaN(price)) {
            return res.status(400).json({ success: false, message: "Price must be a number" });
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