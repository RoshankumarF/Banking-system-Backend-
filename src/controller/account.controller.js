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

const getUserAccount=async(req,res)=>{
const accounts=await Account.find({user:req.user._id})
 return res.status(200).json({
    accounts
 })
}

const getAccountBalance=async(req,res)=>{
    const {accountId}=req.params
    const account=await Account.findOne({
        _id:accountId,
        user:req.user._id
    })

    if(!account){
        return  res.status(404).json({
            message:"Account not found"
        })
    }

    const balance=await account.getBalance();
    res.status(200).json({
        accountId:account._id,
        balance:balance || 0
    })
}

export{
    createAccount,
    getUserAccount,
    getAccountBalance
}