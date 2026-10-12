import { redis } from "../config/redis.js"

export const rateLimiterUnauthenticatedUser = async (req ,res,next) =>{
    try
    {
        const key = `Rate-LimiterIP :${req.ip}`

        const limit = Number (process.env.UNAUTHENTICATED_USER_REQ_LIMIT || 20)
        const count = await redis.incr(key)

        if (count === 1) {
            await redis.expire(key, 60); // 60 seconds
        }

        if (count > limit) {
            return res.status(429).json({
                success: false,
                message: "Request limit reached. Please try again later."
            });
        }

        next();
    } 
    catch (error) 
    {
        console.error("Rate limiter error:", error);
        next()
    }
    
}