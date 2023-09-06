import { Sequelize } from "sequelize";
import pg from "pg";
import { Logger } from "../libs";
import { variables } from "../config";

const { db_name, db_username, db_host, db_password, db_port } = variables;

const postgresClient = new Sequelize(
    db_name,
    db_username,
    db_password,
    {
        host: db_host,
        dialect: "postgres",
        logging: false,
        port: parseInt(db_port),
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
