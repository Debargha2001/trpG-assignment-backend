import express, { Express, Request, Response } from "express";
import routes from "./routes/api.v1";
import morgan from "morgan";



const app: Express = express();

app.use(express.json());
app.use(morgan("dev"))
app.use("/", routes);

const port = process.env.PORT || 8080;


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});