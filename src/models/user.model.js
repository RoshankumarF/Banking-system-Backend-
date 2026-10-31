import mongoose ,{Schema} from "mongoose";

import bcrypt from "bcryptjs";

const userSchema = new Schema({
    email:{
        type:String,
        unique:[true,"Email already exists"],
        required:[true,"Email is required for creating a user"],
       trim :true,
       lowercase:true,
       match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid email "]
    },
    name:{
        type:String,
        required:[true,"Name is required for an account"]
    },
    password:{
        type:String ,
        required:[true,"Password is required for creating an account  "],
        minlength:[6,"password should contain more that 6 character "],
        select :false
    }

},{timestamps:true})

// helps to hash the password 

userSchema.pre("save",async function( ){
  if(!this.isModified("password")){
    return
  }

  const hash=await bcrypt.hash(this.password,10)
  this.password=hash

})

userSchema.methods.comparePassword=async function(password){
    return  await bcrypt.compare(password,this.password)
}


const User=mongoose.model("User",userSchema)

export {User}