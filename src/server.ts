import express, { Express, Request, Response } from "express";
import routes from "./routes/routes.v1";
import morgan from "morgan";



const app: Express = express();

app.use(express.json());
app.use(morgan("dev"))
app.use("/v1", routes);

const port = 8080;


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});