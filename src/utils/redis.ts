import { createClient } from "redis";
import { env } from "@app/utils/env";

const redisClient = createClient({
  url: env.REDIS_URL,
});

export const cache = async (key: string, value: string, ttl: number) => {
    redisClient.set(key, value)
    redisClient.expire(key, ttl);
}

export const retrieve = async (key: string) => {
    const value = await redisClient.get(key);
    return value;
}

export const invalidate = async (key: string) => {
    await redisClient.del(key);
}
