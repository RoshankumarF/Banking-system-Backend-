import {Transaction} from "../models/transaction.model.js"
import { Ledger } from "../models/ledger.model.js"
import { Account } from "../models/account.model.js"


const createTransaction=async()=>{
    const {fromAccount,toAccount,amount,idempotencyKey}=req.body

    if(!fromAccount || !toAccount || !amount || !idempotencyKey){
        res.status(400).json({
            message:"All fields are required"
        })
    }

    const fromUserAccount=await Account.findOne({
        _id:fromAccount,
    })
    const toUserAccount=await Account.findOne({
        _id:toAccount,
    })
    if(!fromUserAccount || !toAccount){
        return res.status(400).json({
           message:"Invalid  fromAccount or toAccount" 
        })
    }

//validating idempotencyKey

const isTransactionAlreadyExist=await Transaction.findOne({
    idempotencyKey:idempotencyKey
})

if(isTransactionAlreadyExist){
    if(isTransactionAlreadyExist.status==="completed"){
        res.status(200).json({
            message:"Transaction already processed",
            transaction:isTransactionAlreadyExist
        }) 
    }

    if(isTransactionAlreadyExist.status==="PENDING"){
        res.status(200).json({
            message:"Transaction is still pending "
        })
    }

      if(isTransactionAlreadyExist.status==="FAILED"){
        res.status(500).json({
            message:"Previous transaction attempt failed, please try again",
        })
    }

      if(isTransactionAlreadyExist.status==="REVERSED"){
        res.status(500).json({
            message:"Transaction was reversed,please retry",
        })
    }


}



}