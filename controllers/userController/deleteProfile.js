import { User } from "../../Model/userScheema.js";
import Chat from "../../Model/chatScheema.js";
import Message from "../../Model/messageScheema.js";

export const deleteProfile = async(req,res)=>{
    try
    {
        const user = req.user
        await Message.deleteMany({userId : user._id})
        await Chat.deleteMany({userId : user._id})
        await User.deleteOne({_id : user._id})
        

        res.clearCookie("token");

        return res.status(200).json({
            message: "Profile Deleted Successful"
        });

    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}