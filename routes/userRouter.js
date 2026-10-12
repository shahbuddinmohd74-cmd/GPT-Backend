import express from "express"
import { signUp } from "../controllers/userController/signUp.js";
import { logIn } from "../controllers/userController/login.js";
import { profile } from "../controllers/userController/profile.js";
import { userAuthentication } from "../middlewares/userAuthentication.js";
import { logout } from "../controllers/userController/logout.js";
import { deleteProfile } from "../controllers/userController/deleteProfile.js";
import { rateLimiterUnauthenticatedUser } from "../middlewares/rateLimiterOfUnauthenticatedUser.js";



export const userRouter = express.Router();

userRouter.post("/login",rateLimiterUnauthenticatedUser,logIn)
userRouter.post("/signUp",rateLimiterUnauthenticatedUser,signUp)
userRouter.post("/logout",logout)
userRouter.get("/profile",userAuthentication,profile)
userRouter.delete("/profile",userAuthentication,deleteProfile)
