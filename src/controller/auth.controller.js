import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"


const userRegister=async(req,res)=>{
const {email,password,name}=req.body

const isExist=await User.findOne({
    email:email
})

if(isExist){
    return res.json({
        message:"User already exists with email",
        status:"failed"
    })
}

const user=await User.create({
    email,password,name
})

const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

res.cookie("token",token).status(201).json({user:{
    _id:user._id,
    email:user.email,
    name:user.name
}})


}


const userLogin=async(req,res)=>{
const {email,password}=req.body

const  user= await User.findOne({email:email}).select("+password")

if(!user){
     return res.json({
        message:"User does not exists with email",
        status:"failed"
    })

}

const isValidPassword=await user.comparePassword(password)

if(!isValidPassword){
    return res.status(401).json({
        message:"Email or password is INVALID"
    })
}


const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

res.cookie("token",token).status(200).json({user:{
    _id:user._id,
    email:user.email,
    name:user.name,
    token
}})



}

export {
    userRegister,
    userLogin
}