import express from "express";
import { User } from "../../Model/userScheema.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { loginValidation } from "../../validators/userValidationSchema.js";


export const logIn =async (req,res)=>{

    const result = loginValidation.safeParse(req.body)
    if(!result.success)
    {
       return res.status(400).json({
            message : result.error.issues[0].message
        })
    }


    const {email,password} = result.data

    try{
        const user = await User.findOne({email : email})
        
        if(user)
        {
            const isPassword = await bcrypt.compare(password,user.password)
            if(isPassword)
            {
                const token = jwt.sign(
                    {email},
                    process.env.SECRET_KEY,
                    {expiresIn : "1d"}
                )
                res.cookie("token",token,
                    {
                        httpOnly : true,
                        secure : false
                    }
                )
                return res.status(202).json({
                message : "Login Susscessful !!!"
                })
            }
            else
            {
                return res.status(400).json({
                message : "Invaid Credentials !!!"
                })
            }

        }
        else
        {
            return res.status(400).json({
                message : "Invaid Credentials !!!"
            })
        }

    }
    catch(err){
        return res.status(404).json({
                message : "Some Error Occured !!!"
            })

    }
    

}