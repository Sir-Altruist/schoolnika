import express, { Express, Request, Response } from "express";
import { env } from "@config/index";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "@routes/index";
import { Logger } from "@libs/index";

const app: Express = express();
const port = env.PORT || 3000;

// Cross-origin resource sharing
app.use(cors());

// parses body request
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});
app.use("/api", routes);

app.listen(port, () => Logger.info(`server running on port: ${port}`));
