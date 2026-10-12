import express from "express"
import { userAuthentication } from "../middlewares/userAuthentication.js"
import { getChat } from "../controllers/chatController/getChat.js"
import { newChat } from "../controllers/chatController/newChat.js"
import { recentChat } from "../controllers/chatController/recentChat.js"
import { deleteChat } from "../controllers/chatController/deleteChat.js"



export const chatRouter = express.Router()

chatRouter.use(userAuthentication)

chatRouter.post("/create",newChat)
chatRouter.get("/recent",recentChat)
chatRouter.get("/:chatId",getChat)
chatRouter.delete("/:chatId",deleteChat)

