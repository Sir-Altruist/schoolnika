import { env } from "@config/index";
import { Logger } from "@libs/index";
import { createClient } from "redis";

const redisClient = createClient({
    socket: {
        host: env.REDIS_HOST,
        port: parseInt(env.REDIS_PORT)
    },
    name: env.REDIS_NAME
    // host: env.REDIS_HOST
});

redisClient
    .connect()
    .then(() => Logger.info("redis connected"))
    .catch((error) => Logger.error(error.message));

export default redisClient;
