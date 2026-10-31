import mongoose from "mongoose"

const connect_db= async()=>{
     try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`\n MongoDB connected  successfully `)
    } catch (error) {
        console.log("Mongo db connection failed",error)
        process.exit(1);
    }

}

export {connect_db}
