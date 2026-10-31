import "dotenv/config"
import express from "express"
import cookieParser from "cookie-parser"
 


const app=express()


app.use(express.json()) // to read the data
app.use(cookieParser())


// importing modules 
import authRouter from "./routes/auth.route.js"


app.get("/test", (req, res) => {
       console.log("Test route reached");
    res.status(200).json({
        message: "Server is working!"
    });
});

app.use("/api/auth",authRouter)


export   {app}