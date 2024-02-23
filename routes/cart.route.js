const express = require("express");
const { CartModel } = require("../models/cart.model");
const {ProductModel} = require("../models/product.model");
const { authMiddleware } = require("../middlewares/authmiddleware");

const cartRouter = express.Router();

// Add a product to the cart
cartRouter.post("/addToCart", authMiddleware, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;

        // Check if the product already exists in the user's cart
        let cart = await CartModel.findOne({ user: userId });
        if (!cart) {
            cart = new CartModel({ user: userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.product.toString() === productId);

        if (existingItem) {
            return res.status(400).json({ message: 'Product already exists in the cart.' });
        }

        const products=await ProductModel.findById(productId)

        // Add the product to the cart
        cart.items.push({ product: products, quantity });
        await cart.save();

        res.status(200).json({ message: 'Product added to cart successfully.', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// View the user's cart
cartRouter.get("/view", authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await CartModel.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update the quantity of a product in the cart
cartRouter.put("/update/:productId", authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;
        const { quantity } = req.body;

        const cart = await CartModel.findOne({ user: userId });

        // Find the item in the cart
        const item = cart.items.find(item => item.product.toString() === productId);
        if (!item) {
            return res.status(404).json({ message: 'Product not found in cart.' });
        }

        // Update the quantity
        item.quantity = quantity;
        await cart.save();

        res.status(200).json({ message: 'Product quantity updated successfully.', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Remove a product from the cart
cartRouter.delete("/remove/:productId", authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;

        const cart = await CartModel.findOne({ user: userId });

        // Filter out the product to be removed
        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        await cart.save();

        res.status(200).json({ message: 'Product removed from cart successfully.', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = { cartRouter };
