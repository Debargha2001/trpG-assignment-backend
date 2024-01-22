import express from "express";
import * as EmployeeController from "../controllers/employee.http";

const route = express.Router();

route.get("/", (_req, res) => {
    return res.send("ok");
});

route.post("/employees", EmployeeController.createEmployee)
route.put("/employees/:id", EmployeeController.updateEmployee)


export default route;