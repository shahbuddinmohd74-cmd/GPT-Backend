import Chat from "../../Model/chatScheema.js"

export const getChat = async (req,res)=>{
    try
    {
        const user = req.user
        const {chatId} = req.params
        const chat = await Chat.findOne({_id : chatId,userId : user._id})
        if(!chat)
        {
            return res.status(404).json({
                message : "Chat Not Found"
                
            })
        }
        return res.status(200).json({
                message : "Chat Found",
                Topic : chat.topic,
                Model : chat.model
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