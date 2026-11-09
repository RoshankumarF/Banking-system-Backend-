import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"

async function authmiddleware(req,res,next) {
    const token=req.cookies.token || req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(401).json({
            message:"Unathorized access ,token is missing "
        })
    }

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findById(decoded.userId).select("-password")

        req.user=user
        console.log("i m in auth middleware")
        console.log(req.user)
       return   next()
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message:"Unauthorization aceess, token is invalid"
        })
    }
}

export {
    authmiddleware
}