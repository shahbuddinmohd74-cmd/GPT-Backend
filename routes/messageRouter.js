import express from "express"
import { userAuthentication } from "../middlewares/userAuthentication.js"
import { getMessage } from "../controllers/messageController/getMessage.js"
import { newMessage } from "../controllers/messageController/newMessage.js"

export const messageRouter = express.Router()

messageRouter.use(userAuthentication)

messageRouter.post("/", newMessage);
messageRouter.post("/:chatId",newMessage)
messageRouter.get("/:chatId",getMessage)