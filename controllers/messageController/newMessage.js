import Message from "../../Model/messageScheema.js";
import Chat from "../../Model/chatScheema.js";
import { generateResponse } from "../../Services/openRouterService.js";
import { updateSummaryIfNeeded } from "../../Services/summaryService.js";
import { buildMessagesForAI } from "../../Utils/chatContext.js";
import { resetUsageIfNeeded , hasTokenLimitReached ,addUserTokenUsage } from "../../Utils/userUsage.js";
import { addChatTokenUsage } from "../../Utils/tokenUsage.js";



export const newMessage = async (req,res)=>{

    try{
        const user = req.user
        const {chatId} = req.params
        const {content} = req.body
        if(!content || content.trim() === "")
        {
            return res.status(400).json({
                message : "Some fiels are missing or invalid field"
            })
        }

        await resetUsageIfNeeded(user)
        if(hasTokenLimitReached(user))
        {
            return res.status(429).json({
                message : "Token Limit Reached. Please try again after some time",
                usage : user.usage
            })
        }



        let chat = await Chat.findOne({_id : chatId,userId: user._id})


        if(!chat)
        {
            try
            {
                const {topic = "New Chat",model = process.env.DEFAULT_AI_MODEL} = req.body

                chat = await Chat.create({
                userId : user._id,
                topic : topic,
                model : model
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

        const oldMessages = await Message.find({
        chatId: chat._id
        })
        .sort({ createdAt: 1 })
        .skip(chat.summarizedTillMessageNumber || 0);

        const messagesForAI = buildMessagesForAI({
            chat,
            oldMessages,
            currentMessage: content.trim()
        });

        const { aiReply, usage } = await generateResponse({
            model: chat.model,
            messages: messagesForAI
        });

        const userMessage = await Message.create({
            userId: user._id,
            chatId: chat._id,
            role: "user",
            content: content.trim()
        });

        const assistantMessage = await Message.create({
            userId: user._id,
            chatId: chat._id,
            role: "assistant",
            content: aiReply,
            usage
        });

        chat.messageCount += 2;

        if (chat.topic === "New Chat") {
            chat.topic = content.trim().slice(0, 40);
        }

        await addChatTokenUsage(chat, usage);
        await addUserTokenUsage(user, usage.totalTokens);

        await chat.save();

        res.status(201).json({
            message: "Message sent successfully",
            reply: aiReply,
            currentUsage : usage,
            totalUsage : {
                tokenLimit : user.tokenLimit,
                totalTokenUsed : user.totalTokenUsed
            }
            
           
        });

        updateSummaryIfNeeded(chat._id).catch((err) => {
            console.log("Summary update failed:", err.message);
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