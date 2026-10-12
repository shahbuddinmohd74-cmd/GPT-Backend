import Chat from "../../Model/chatScheema.js"
import Message from "../../Model/messageScheema.js"

export const deleteChat = async(req,res)=>{

    try{
        const user = req.user
        const {chatId} = req.params
        
        const chat = await Chat.findOneAndDelete({_id : chatId , userId : user._id})
        if(!chat)
        {
            return res.status(404).json({
                message : "Chat Not Found"
            })
        }
        await Message.deleteMany({chatId : chatId , userId : user._id})

        return res.status(200).json({
            message : "Chat Deleted"
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