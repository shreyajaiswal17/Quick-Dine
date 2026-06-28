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

// all food list

const listFood = async (req, res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

// remove food item
const removeFood = async (req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        // cb- can be loged to catch error
        // A callback is a function that gets called after an asynchronous operation is done
        // del image from folder

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food Removed"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

const aiSearchFood = async (req, res) => {
    const query =
        typeof req.body.query === "string"
            ? req.body.query.trim()
            : "";

    if (!query) {
        return res.status(400).json({
            success: false,
            message: "Search query is required",
        });
    }

    if (query.length > 300) {
        return res.status(400).json({
            success: false,
            message: "Search query is too long",
        });
    }

    try {
        // Reuse categories already stored in the Food collection.
        const categories = await foodModel.distinct("category");

        const geminiFilters = await extractSearchFilters(
            query,
            categories
        );

        const filters = normalizeFilters(
            geminiFilters,
            categories
        );

        const mongoQuery = {};

        if (filters.category) {
            mongoQuery.category = {
                $regex: `^${escapeRegex(filters.category)}$`,
                $options: "i",
            };
        }

        if (filters.maxPrice) {
            mongoQuery.price = {
                $lte: filters.maxPrice,
            };
        }

        if (filters.keywords.length > 0) {
            mongoQuery.$or = filters.keywords.flatMap(
                (keyword) => {
                    const regex = new RegExp(
                        escapeRegex(keyword),
                        "i"
                    );

                    return [
                        { name: regex },
                        { description: regex },
                        { category: regex },
                    ];
                }
            );
        }

        const foods = await foodModel.find(mongoQuery);

        return res.json({
            success: true,
            data: foods,
            filters,
        });
    } catch (error) {
        console.error("AI food search error:", error);

        const statusCode =
            error.statusCode ||
            (error.name === "AbortError" ? 504 : 502);

        return res.status(statusCode).json({
            success: false,
            message:
                statusCode === 503
                    ? error.message
                    : "AI search is temporarily unavailable",
        });
    }
};

export{addFood,listFood,removeFood,aiSearchFood}

const escapeRegex = (value) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const extractSearchFilters = async (query, categories) => {
    if (!process.env.GEMINI_API_KEY) {
        const error = new Error("GEMINI_API_KEY is not configured");
        error.statusCode = 503;
        throw error;
    }

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": process.env.GEMINI_API_KEY,
                },
                signal: controller.signal,
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [
                            {
                                text: `
Extract food search filters only.

Available categories:
${categories.join(", ")}

Rules:
- Return only category, maxPrice, and keywords.
- category must exactly match an available category.
- Use null when there is no category.
- maxPrice must be a number or null.
- keywords must contain short searchable food terms.
- Do not recommend products.
- Do not generate a MongoDB query.
                                `.trim(),
                            },
                        ],
                    },
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: query }],
                        },
                    ],
                    generationConfig: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: "OBJECT",
                            properties: {
                                category: {
                                    type: "STRING",
                                    nullable: true,
                                },
                                maxPrice: {
                                    type: "NUMBER",
                                    nullable: true,
                                },
                                keywords: {
                                    type: "ARRAY",
                                    items: { type: "STRING" },
                                },
                            },
                            required: [
                                "category",
                                "maxPrice",
                                "keywords",
                            ],
                        },
                    },
                }),
            }
        );

        if (!response.ok) {
            const details = await response.text();
            console.error("Gemini API error:", response.status, details);
            throw new Error("Gemini could not process the search");
        }

        const result = await response.json();

        const text = result.candidates?.[0]?.content?.parts
            ?.map((part) => part.text || "")
            .join("");

        if (!text) {
            throw new Error("Gemini returned an empty response");
        }

        return JSON.parse(text);
    } finally {
        clearTimeout(timeout);
    }
};

const normalizeFilters = (filters, categories) => {
    const requestedCategory =
        typeof filters.category === "string"
            ? filters.category.trim()
            : "";

    const category =
        categories.find(
            (item) =>
                item.toLowerCase() === requestedCategory.toLowerCase()
        ) || null;

    const price = Number(filters.maxPrice);

    const maxPrice =
        Number.isFinite(price) && price > 0 ? price : null;

    const keywords = Array.isArray(filters.keywords)
        ? [
              ...new Set(
                  filters.keywords
                      .filter(
                          (keyword) => typeof keyword === "string"
                      )
                      .map((keyword) => keyword.trim())
                      .filter(Boolean)
              ),
          ].slice(0, 8)
        : [];

    return {
        category,
        maxPrice,
        keywords,
    };
};