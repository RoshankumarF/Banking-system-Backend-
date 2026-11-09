import {Account} from "../models/account.model.js"

const createAccount=async(req,res)=>{
    const user=req.user
    console.log(user)

    const userExist=await Account.findById(user._id)

    if(userExist){
        return res.status(401).json({
            message:"Acoount with this user already exists "
        })
    }

    const account=await Account.create({
        user:user._id
    })

    return res.status(201).json({
        account
    })

}

export{
    createAccount
}