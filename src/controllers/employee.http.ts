import { Request, Response } from "express-serve-static-core";
import { EmployeeSchema } from "../models/employee.schema";
import * as EmployeeService from "../services/employee.service";
import ApiResponse from "../utils/apiResponse";

export async function createEmployee(req: Request, res: Response) {
    try{
        const verifyEmployee = EmployeeSchema.safeParse(req.body);
    if(!verifyEmployee.success){
        return new ApiResponse(res).error({
            statusCode: 400,
            message: verifyEmployee.error.message,
            data: verifyEmployee.error
        })
    }
    const employeeData = await EmployeeService.createEmployee(req.body);
        return new ApiResponse(res).success({
            statusCode: 200,
            message: "employee created",
            data: employeeData
        })
    }catch(err){
        return new ApiResponse(res).errorObj(err);
    }
}

export async function updateEmployee(req: Request, res: Response) {
    try{
        const verifyEmployeePayload = EmployeeSchema.safeParse(req.body);
        const id = req.params.id;
        if(req.body.id){
            return new ApiResponse(res).error({
                statusCode: 400,
                message: "employee id can not be updated",
            })
        }
    if(!verifyEmployeePayload.success){
        return new ApiResponse(res).error({
            statusCode: 400,
            message: verifyEmployeePayload.error.message,
            data: verifyEmployeePayload.error
        })
    }
    const employeeData = await EmployeeService.updateEmployee(req.body, id);
        return new ApiResponse(res).success({
            statusCode: 200,
            message: "employee updated",
            data: employeeData
        })
    }catch(err){
        return new ApiResponse(res).errorObj(err);
    }
}

export async function deleteEmployee(req: Request, res: Response) {
    try{
        const id = req.params.id;
        if(!req.params.id){
            return new ApiResponse(res).error({
                statusCode: 400,
                message: "employee id is required",
            })
        }
    const employeeData = await EmployeeService.deleteEmployee(id);
        return new ApiResponse(res).success({
            statusCode: 200,
            message: "employee deleted",
            data: employeeData
        })
    }catch(err){
        return new ApiResponse(res).errorObj(err);
    }
}

export async function fetchEmployees(req: Request, res: Response) {
    try{
    const employeeData = await EmployeeService.fetchEmployees(req.query);
        return new ApiResponse(res).success({
            statusCode: 200,
            message: "success",
            data: employeeData
        })
    }catch(err){
        return new ApiResponse(res).errorObj(err);
    }
}

export async function fetchEmployeeById(req: Request, res: Response) {
    try{
    const employeeData = await EmployeeService.fetchEmployeeById(req.params.id);
        return new ApiResponse(res).success({
            statusCode: 200,
            message: "success",
            data: employeeData
        })
    }catch(err){
        return new ApiResponse(res).errorObj(err);
    }
}