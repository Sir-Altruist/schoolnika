import { env } from "../config";
import { Logger } from "../libs";
import { createClient } from "redis";

const redisClient = createClient({
    url: env.REDIS_HOST_PROD 
    // : socket: {
    //     host: env.REDIS_HOST,
    //     port: parseInt(env.REDIS_PORT)
    // },

});

redisClient
    .connect()
    .then(() => Logger.info("redis connected"))
    .catch((error) => Logger.error(error.message));

export default redisClient;
