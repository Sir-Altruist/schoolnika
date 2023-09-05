import { env } from "../config";
import { Logger } from "../libs";
import { createClient } from "redis";

const redisClient = env.NODE_ENV === "production" ? createClient({
    socket: {
        host: env.REDIS_HOST,
        port: parseInt(env.REDIS_PORT)
    },
    name: env.REDIS_NAME
    // host: env.REDIS_HOST
}) : createClient({
    url: env.REDIS_HOST_PROD
});

redisClient
    .connect()
    .then(() => Logger.info("redis connected"))
    .catch((error) => Logger.error(error.message));

export default redisClient;
