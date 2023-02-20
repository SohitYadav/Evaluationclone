const express=require('express');
const userRouter=express.Router();
const {userModel}=require('../models/user.model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');


userRouter.post("/register",async (req,res)=>{
    const {name,email,gender,password,age,city}=req.body;
    try{
        bcrypt.hash(password,4,async (err,hash)=>{
            if(err){
                res.send(err.message);
            }else{
                const user=new userModel(name,email,gender,hash,age,city);
                await user.save();
                res.send("User registered successfully");
            }
        })
    }
    catch(err){
        res.send(err.message);
    }
})


userRouter.post("/login",async (req,res)=>{
    const  {email,password}=req.body;
    try{
        const user=await userModel.find({email});
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,decoded)=>{
                if(err){
                    res.send("Credentials Wrong");
                }else{
                    let token=jwt.sign({userID:user[0]._id},"evaluation");
                    res.send({"msg":"Signing in","token":token});
                }
            })
        }else{
            res.send("Unable to login: Wrong Credentials");
        }
    }
    catch(err){
        res.send(err.message);
    }
})



module.exports={
    userRouter
}