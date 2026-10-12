import Chat from "../../Model/chatScheema.js";

export const recentChat = async (req,res)=>{
    try{
        const user = req.user
        const chat = await Chat.find({userId : user._id}).sort({updatedAt : -1}).limit(20).select("topic model")
        if(chat==null)
        {
            res.status(404).json({
                message : "Message Not Found"
            })
        
        }
        else
        {
            res.status(200).json({
                message : "Chat Found",
                chat : chat
                
            })
        }
    
    }
    catch(err)
    {
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
    

    
}