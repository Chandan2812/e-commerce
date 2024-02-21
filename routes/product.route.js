const express = require("express");
const { ProductModel } = require("../models/product.model");
const { authMiddleware } = require("../middlewares/authmiddleware");

const productRouter = express.Router();

// Route to add a new product
productRouter.post("/add", authMiddleware, async (req, res) => {
    try {
        const { title, price, description, category, image, rating, availability } = req.body;

        // Create a new product
        const newProduct = new ProductModel({
            title,
            price,
            description,
            category,
            image,
            rating,
            availability
        });

        // Save the product to the database
        await newProduct.save();

        res.status(201).json({ message: 'Product added successfully.', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

productRouter.get("/",async (req,res)=>{
    try {
        const allProducts = await ProductModel.find();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


// Route to get products by category
productRouter.get("/category/:categoryName", async (req, res) => {
    try {
        const { categoryName } = req.params;
        // Retrieve products by category from the database
        const products = await ProductModel.find({ category: categoryName });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route to get detailed information about a specific product
productRouter.get("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        // Retrieve product details by ID from the database
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = { productRouter };
