import Message from "../../Model/messageScheema.js";
import Chat from "../../Model/chatScheema.js";

export const getMessage = async (req,res)=>{
    try
    {
        const {chatId} = req.params
        const user = req.user

        const chat =await Chat.findOne({_id : chatId , userId : user._id})

        if(!chat)
        {
            return res.status(404).json({
                message : "Chat Not Found"
            })
        }
        const message = await Message.find({chatId : chatId}).sort({createdAt : 1}).select("role content")
        return res.status(200).json({
            Messages : message
        })
    
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }

}