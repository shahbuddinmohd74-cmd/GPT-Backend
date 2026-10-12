import express from "express"
import jwt from "jsonwebtoken"
import { User } from "../../Model/userScheema.js"


export const profile = async (req,res)=>{ 
        const resetAt = req.user.resetAt.toLocaleString("en-IN", {
         timeZone: "Asia/Kolkata"
        });
        return res.status(200).json(
        {
            Profile : {
                Name : req.user.name,
                Age : req.user.age,
                Email : req.user.email,
                TokenUsed : req.user.usage.tokenUsed,
                resetAt : resetAt,

            }
        })
}