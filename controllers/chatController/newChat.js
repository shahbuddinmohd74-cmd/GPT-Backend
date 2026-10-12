import Chat from "../../Model/chatScheema.js";

export const newChat = async (req,res)=>{

    try{
        const {topic,model} = req.body

        const data = await Chat.create({
            userId : req.user._id,
            topic : topic,
            model : model
        })
        return res.status(200).json({
            message : "Chat created Successfully",
            Topic : data.topic,
            Model : data.model
        })
        
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
}
