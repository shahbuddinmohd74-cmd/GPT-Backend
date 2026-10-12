
import { createClient } from "redis";

const redis = createClient({
    url: process.env.REDIS_URL
});

redis.on("error", (err) => {
    console.error("Redis Client Error:", err);
});

const connectRedis = async () => {
    try {
        if (!redis.isOpen) {
            await redis.connect();
            console.log("Redis connected successfully");
        }
    } catch (error) {
        console.error("Redis connection failed:", error);
        throw error;
    }
};

export  { redis, connectRedis };
