const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {UserModel}=require("../models/user.model")
const {validateUser} = require("../middlewares/validation.middleware")
require("dotenv").config()

const userRouter = express.Router()

// User Registration
userRouter.post("/signup",validateUser,async(req,res)=>{
    try {
        const {username,email,password}=req.body;

        const isUserPresent=await UserModel.findOne({email})

        // Check for duplicate email 
        if(isUserPresent){
            return res.status(400).json({ message: 'Email is already in use.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();
    
        res.status(200).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    

})


userRouter.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email and role
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'User is not present, Registered before Login ' });
      }
  
  
        if(await bcrypt.compare(password, user.password))
        {
            const token = jwt.sign({ user: user }, process.env.SECRET_KEY, {
                expiresIn: "30d",
            });
  
            res.status(200).json({
                message: 'Logged in successfully', 
                user,
                token,
            
              });
        }
        else {
          res.json({ message: "Invalid Password" });
      
        }

    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  


module.exports={userRouter}