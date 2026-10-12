import {z} from "zod"

export const signupValidation = z.object({
    name : z.string()
            .min(3)
            .max(30)
            .trim(),

    age : z.number()
           .min(10)
           .max(100),
           
    email : z.preprocess((value)=>{
        return typeof value == "string" ? value.trim().toLowerCase() : ""
    },
    z.email()),

    password : z.string()
                .min(8)
                .max(100)
                .regex(/[0-9]/)
    
})

export const loginValidation = z.object({     
    email : z.preprocess((value)=>{
        return typeof value == "string" ? value.trim().toLowerCase() : ""
    },
    z.email()),

    password : z.string()
                .min(8)
                .max(100)
                .regex(/[0-9]/)
})