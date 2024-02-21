const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Authentication failed: No token provided." });
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(decodedToken)
        if (!decodedToken) {
            return res.status(401).json({ message: "Authentication failed: Invalid token." });
        }

        // Check if user exists
        const user = await UserModel.findById(decodedToken.user._id);
        if (!user) {
            return res.status(401).json({ message: "Authentication failed: User not found." });
        }

        // Attach user to request object for further use
        req.user = user;

        next(); // Proceed to next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Authentication failed: Invalid token." });
    }
};

module.exports = {authMiddleware};
