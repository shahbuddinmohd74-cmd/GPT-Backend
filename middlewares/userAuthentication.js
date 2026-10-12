import jwt from "jsonwebtoken"
import { User } from "../Model/userScheema.js"

export const userAuthentication = async (req,res,next)=>{

    const {token} = req.cookies

    if(token==null)
    {
        return res.status(401).json(
            {
                message : " Log-In First !!!"
            }
        )
    }
    try{
        let payload
        try{
             payload = await jwt.verify(token,process.env.SECRET_KEY)
        }
        catch(err)
        {
            {
                return res.status(401).json(
                {
                    message : " Log-In First !!!"
                })
            }
        }
        const data =await User.findOne({email : payload.email})
        if(!data)
        {
            return res.status(401).json(
            {
                message : " LogIn First !!!"
            })
        }
        req.user = data
        next()
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json(
            {
                message : "Internal Server Error !!!"
            })
    }



}