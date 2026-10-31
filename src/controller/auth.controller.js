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

export {
    userRegister
}