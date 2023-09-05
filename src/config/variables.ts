import env from "./env";

const db_name = env.NODE_ENV === "production" ? env.DB_NAME_PROD : env.DB_NAME;
const db_username = env.NODE_ENV === "production" ? env.DB_USERNAME_PROD : env.DB_USERNAME;
const db_password = env.NODE_ENV === "production" ? env.DB_PASSWORD_PROD : env.DB_PASSWORD;
const db_host = env.NODE_ENV === "production" ? env.DB_HOST_PROD : env.DB_HOST;


export { db_name, db_username, db_password, db_host };