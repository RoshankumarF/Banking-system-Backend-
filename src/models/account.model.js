import mongoose ,{Schema} from "mongoose";

const accountSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Account must be associated with a user"],
        index:true
    },
    status:{
        type:String,
        enum:{
            values:["ACTIVE","FROZEN","CLOSED"],
            message:"Satus can be either ACTIVE,FROZEN,CLOSED",
         
        },
          default:"ACTIVE"
    },
    currency:{
        type:String,
        required:[true,"Currency is required for creating an account"],
        default:"INR"
    }

},{timestamps:true})

accountSchema.index({user:1,status:1})//compound index





export const Account=mongoose.model("Account",accountSchema)