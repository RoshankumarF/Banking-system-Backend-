import mongoose ,{Schema} from "mongoose";

const transactionSchema=new Schema({
    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account",
        required:[true,"Transaction must be associated with a from account"],
        index:true
        },

          toAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account",
        required:[true,"Transaction must be associated with a from account"],
        index:true
        },
        status:{
            type:String,
            enum:{
                values:["PENDING","COMPLETED","FAILED","REVERSED"],
                message:"Status can be either PENDING,COMPLETED ,FAILED OR REVERSED"
            },
            default:"PENDING"
        },
        amount:{
            type:Number,
            required:[true,"Amount is required for creating a transcation"],
            min:[1,"Transcation amount cannot be less than 1"]
        },
        idempotencyKey:{
            type:String,
            required:[true,"Idempotency key is required for creating a trasaction"],
            index:true,
            unique:true
        }

},{timestamps:true})

export const Transaction=mongoose.model("Transaction",transactionSchema)