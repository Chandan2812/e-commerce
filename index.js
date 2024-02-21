const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000

app.use(express.json());


app.listen(PORT,async()=>{
    console.log(`Server is running @ ${PORT}`);
})

