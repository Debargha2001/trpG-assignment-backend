import express, { Express, Request, Response } from "express";
import routes from "./routes/routes.v1";
import morgan from "morgan";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/v1", routes);

const port = 8080;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
