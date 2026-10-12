import { openRouter } from "../config/openRouter.js";

export const generateResponse = async ({model = process.env.DEFAULT_AI_MODEL,messages})=>{

    const response =await openRouter.chat.send({
    chatRequest: {
        model,
        messages
        }
    })

    const aiReply = response.choices[0]?.message?.content

    if(!aiReply)
    {
        throw new Error("AI reply is Empty");
        
    }

    const promptTokens = response.usage?.promptTokens || 0
    const completionTokens = response.usage?.completionTokens || 0

    return{
        aiReply,
        usage : {
            promptTokens,
            completionTokens,
            totalTokens : promptTokens+completionTokens
        }
    }

}