import { env } from "@config/index";
import { Sequelize } from "sequelize";
import pg from "pg";
import { Logger } from "@libs/index";

const postgresClient = new Sequelize(
    env.DB_NAME,
    env.DB_USERNAME,
    env.DB_PASSWORD,
    {
        host: env.DB_HOST,
        dialect: "postgres",
        logging: false,
        port: parseInt(env.DB_PORT),
        dialectModule: pg,
        pool: {
            max: 2,
            min: 0,
            acquire: 3000,
            idle: 0
        },
        define: {
            freezeTableName: true
        }
    }
);

postgresClient
    .sync({ alter: true })
    .then(() => Logger.info("Postgres connected successfully!"))
    .catch((err) => Logger.error(err.message));

export default postgresClient;
