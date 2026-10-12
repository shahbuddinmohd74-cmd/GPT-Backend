import express from "express"
import jwt from "jsonwebtoken"
import { User } from "../../Model/userScheema.js"
import bcrypt from "bcrypt"
import { signupValidation } from "../../validators/userValidationSchema.js"

export const signUp =async (req,res)=>{

    const result = signupValidation.safeParse(req.body)
    if(!result.success)
    {
        return res.status(400).json({
            message : result.error.issues[0].message
        })
    }

    const {name,age,email,password} = result.data;


    const user = await User.findOne({email : email})
    if(user)
    {
        return res.status(409).json({
            message: "User already exist !!"
        });

    }

    try{
        const hashPassword = await bcrypt.hash(password,10)
        const data =await User.create({
        name,age,email,password : hashPassword
        })
        const token = jwt.sign({
                name,email
            },
            process.env.SECRET_KEY,
            {
                expiresIn : "1d"
            })
        res.cookie("token",token,{
            httpOnly : true,
            secure : false

        })
        res.status(201).json({
            message : "User Created Successfully",
            User : {
                Name : data.name,
                Age : data.age,
                Email : data.email
            }
        })
        
    }
    catch(err)
    {
        return res.status(400).json({
            message: "Some error ocuured"
        });
    }
}