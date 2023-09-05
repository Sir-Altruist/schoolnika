import express, { Express, Response } from "express";
import { env } from "./config";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import { Logger } from "./libs";

const app: Express = express();
const port = env.PORT || 3000;

// Cross-origin resource sharing
app.use(cors());

// parses body request
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

app.get("/", (_, res: Response) => {
    res.send("Schoolnika Interview API");
});
app.use("/api", routes);

app.listen(port, () => Logger.info(`server running on port: ${port}`));
