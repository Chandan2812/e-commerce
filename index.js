const express = require("express");
const {Connection} = require("./config/db")
const {userRouter} = require("./routes/user.route")
const {productRouter} = require("./routes/product.route")
const {cartRouter} = require("./routes/cart.route")
const {orderRouter} = require("./routes/order.route")
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000

app.use(express.json());

app.use("/user",userRouter);
app.use("/product",productRouter);
app.use("/cart",cartRouter);
app.use("/order",orderRouter);

app.listen(PORT,async()=>{
    try {
        await Connection
        console.log("Connected to Database");
    } catch (error) {
        console.log('failed to connect to DB');
    }
    console.log(`Server is running @ ${PORT}`);
})

