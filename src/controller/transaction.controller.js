import {Transaction} from "../models/transaction.model.js"
import { Ledger } from "../models/ledger.model.js"
import { Account } from "../models/account.model.js"
import { mongo } from "mongoose"


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
      return   res.status(200).json({
            message:"Transaction already processed",
            transaction:isTransactionAlreadyExist
        }) 
    }

    if(isTransactionAlreadyExist.status==="PENDING"){
      return   res.status(200).json({
            message:"Transaction is still pending "
        })
    }

      if(isTransactionAlreadyExist.status==="FAILED"){
       return  res.status(500).json({
            message:"Previous transaction attempt failed, please try again",
        })
    }

      if(isTransactionAlreadyExist.status==="REVERSED"){
        return res.status(500).json({
            message:"Transaction was reversed,please retry",
        })
    }


}

if(fromUserAccount.status!=="ACTIVE" ||  toUserAccount.status!=="ACTIVE"){
    return res.status(400).json({
        message:"Both fromAccount and toAccount must be ACTIVE to process transaction"
    })
}


const balance=await fromUserAccount.getBalance()
if(balance<amount){
    return res.status(400).json({
        message:`Insufficient balance , Current balance is ${balance},Requested amount is ${amount} `
    })
}

const session=await mongoose.startSession() //this help in case all request will be fullfiles or none 

session.startTransaction()

const transaction= await Transaction.create({
   fromAccount,
   toAccount,
   amount,
   idempotencyKey,
   status:"PENDING" 

},{session})

const debitLedgerEntry=await Ledger.create({
    account:fromAccount,
    amount:amount,
    transaction:transaction._id,
    type:"DEBIT"

},{session})

const creditLedgerEntry=await Ledger.create({
    account:toAccount,
    amount:amount,
    transaction:transaction._id,
    type:"DEBIT"
},{session})
transaction.status="COMPLETED"
await transaction.save({session})

await session.commitTransaction()
session.endSession()

}

export {
    createTransaction
}