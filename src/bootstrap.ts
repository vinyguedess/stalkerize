import * as dotenv from "dotenv";
import express from "express";
import routes from "./Main/routes";

dotenv.config();

export const app = express();
app.use(
    express.json({
        limit: "2mb"
    })
);
app.use("/api", routes);
