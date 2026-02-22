const express =require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const { useReducer } = require("react");

const router = express.Router();

router.post("/register",async(req,res)=>{
    try{
        const{username,email,password}=req.body;

        if(!username ||!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const user=await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );
        res.status(201).json({
            _id:user._id,
            username:user.username,
            email:user.email,
            token,
        })
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
});

router.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body;

        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );
        res.json({
        _id:user._id,
        username:user.username,
        email:user.email,
        token,
        });
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
});

module.exports=router;