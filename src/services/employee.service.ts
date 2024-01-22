import fs from "node:fs/promises";
import type { Employee } from "../models/employee.schema";


const DATA_PATH = process.cwd()+"/src/data.json"

function generateUniqueId(): string {
    const prefix = 'emp';
    const timestamp = new Date().getTime().toString(16);
    const randomPart = Math.floor(Math.random() * 1000000).toString(16);

    const uniqueId = `${prefix}_${timestamp}${randomPart}`;

    return uniqueId;
}

async function readEmployeeData(): Promise<Employee[]> {
    try {
        const fileData = await fs.readFile(DATA_PATH, 'utf-8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading file:', (error as Error).message);
        throw error;
    }
}

async function writeEmployeeData(employeeList: Employee[]): Promise<void> {
    try {
        await fs.writeFile(DATA_PATH, JSON.stringify(employeeList, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing file:', (error as Error).message);
        throw error;
    }
}

export async function createEmployee (data: Employee) {

    let employeeList: Employee[] = await readEmployeeData();

    const newEmployee = {
        ...data,
        id: generateUniqueId()
    }
    employeeList.push(newEmployee);

    await writeEmployeeData(employeeList)
    return newEmployee;
}

export async function updateEmployee (updatedEmployeeData: Employee, employeeId: string) {
    let employeeList: Employee[] = await readEmployeeData();

        const indexToUpdate = employeeList.findIndex((employee) => employee.id === employeeId);

        if (indexToUpdate === -1) {
            throw new Error("employee not found")
        }

        employeeList[indexToUpdate] = {
            ...employeeList[indexToUpdate],
            ...updatedEmployeeData,
        };

        await writeEmployeeData(employeeList);
        return employeeList;
}


