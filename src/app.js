import "dotenv/config"
import express from "express"
 


const app=express()

app.use(express.json)// to read the data 


// importing modules 
import authRouter from "./routes/auth.route.js"

app.use("/api/auth",authRouter)


export   {app}