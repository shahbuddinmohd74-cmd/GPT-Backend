import dotenv from "dotenv/config";
import express from "express";
import connectDB from "./config/database.js";
import { connectRedis } from "./config/redis.js";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRouter.js";
import { chatRouter } from "./routes/chatRouter.js";
import { messageRouter } from "./routes/messageRouter.js";



const app = express();
app.use(express.json())
app.use(cookieParser())

// app.use("/",(req,res)=>{
//     return res.json("Hello how are you")
// })


app.use("/user",userRouter)
app.use("/chat",chatRouter)
app.use("/message",messageRouter)



const startServer =async ()=>{
    try{
        await connectDB()
        await connectRedis()
       
        app.listen(process.env.PORT,()=>{
            console.log(`Sever started at ${process.env.PORT} Port`)
        })

    }
    catch(err){
        console.log(err)
        console.log("Connection Failed")
    }
}
startServer()

