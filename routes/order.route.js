const express = require("express");
const { OrderModel } = require("../models/order.model");
const { CartModel } = require("../models/cart.model");
const { authMiddleware } = require("../middlewares/authmiddleware");

const orderRouter = express.Router();

// Endpoint for users to place orders with the contents of their cart
orderRouter.post("/place", authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;

        // Find the user's cart
        const cart = await CartModel.findOne({ user: userId }).populate('items.product');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'No items in the cart. Please add items before placing an order.' });
        }

        // Create a new order
        const order = new OrderModel({
            user: userId,
            items: cart.items.map(item => ({
                product: item.product,
                quantity: item.quantity
            })),
            totalAmount: cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
        });

        // Save the order to the database
        await order.save();

        // Clear the user's cart
        await CartModel.findOneAndUpdate({ user: userId }, { items: [] });

        res.status(201).json({ message: 'Order placed successfully.', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint to allow users to view their order history
orderRouter.get("/history", authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;

        // Find all orders of the user
        const orders = await OrderModel.find({ user: userId }).populate('items.product');

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint to fetch detailed information about a specific order using its ID
orderRouter.get("/:orderId", authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const { orderId } = req.params;

        // Find the order by ID
        const order = await OrderModel.findOne({ _id: orderId, user: userId }).populate('items.product');

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = { orderRouter };
