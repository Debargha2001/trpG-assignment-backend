import fs from "node:fs/promises";
import type {
  Employee,
  Query,
  UpdateEmployee,
} from "../models/employee.schema";

const DATA_PATH = process.cwd() + "/public/data.json";

/**
 * function to generate an unique id
 * @returns an unique id as string
 */
function generateUniqueId(): string {
  const prefix = "emp";
  const timestamp = new Date().getTime().toString(16);
  const randomPart = Math.floor(Math.random() * 1000000).toString(16);

  const uniqueId = `${prefix}_${timestamp}${randomPart}`;

  return uniqueId;
}

/**
 * function to read employee data from file
 * @returns list of employees
 */
async function readEmployeeData(): Promise<Employee[]> {
  try {
    const fileData = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading file:", (error as Error).message);
    throw error;
  }
}

/**
 * function to write employee data to file
 * @param employeeList 
 */
async function writeEmployeeData(employeeList: Employee[]): Promise<void> {
  try {
    await fs.writeFile(
      DATA_PATH,
      JSON.stringify(employeeList, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error writing file:", (error as Error).message);
    throw error;
  }
}

/**
 * function to create employee
 * @param data 
 * @returns created employee data
 */
export async function createEmployee(data: Employee) {
  let employeeList: Employee[] = await readEmployeeData();

  const newEmployee = {
    ...data,
    id: generateUniqueId(),
  };
  employeeList.push(newEmployee);

  await writeEmployeeData(employeeList);
  return newEmployee;
}

/**
 * function to update employee
 * @param updatedEmployeeData 
 * @param employeeId 
 * @returns updated employee list
 */
export async function updateEmployee(
  updatedEmployeeData: UpdateEmployee,
  employeeId: string
) {
  let employeeList: Employee[] = await readEmployeeData();

  const indexToUpdate = employeeList.findIndex(
    (employee) => employee.id === employeeId
  );

  if (indexToUpdate === -1) {
    throw new Error("employee not found");
  }

  employeeList[indexToUpdate] = {
    ...employeeList[indexToUpdate],
    ...updatedEmployeeData,
  };

  await writeEmployeeData(employeeList);
  return employeeList;
}

/**
 * deletes employee
 * @param employeeId 
 * @returns updated employee list
 */
export async function deleteEmployee(employeeId: string) {
  let employeeList = await readEmployeeData();

  const indexToDelete = employeeList.findIndex(
    (employee) => employee.id === employeeId
  );

  if (indexToDelete === -1) {
    throw new Error("employee not found");
  }

  const deletedEmployee = employeeList.splice(indexToDelete, 1)[0];

  await writeEmployeeData(employeeList);

  return employeeList;
}

/**
 * function to fetch employee list
 * @param queryObject 
 * @returns employee list matching the query
 */
export async function fetchEmployees(queryObject: Query) {
  let employeeList = await readEmployeeData();

  if (queryObject.name) {
    employeeList = employeeList.filter((employee) =>
      employee.name
        ?.toLowerCase()
        .includes(queryObject.name?.toLowerCase() as string)
    );
  }

  if (queryObject.email) {
    employeeList = employeeList.filter((employee) =>
      employee.email
        ?.toLowerCase()
        .includes(queryObject.name?.toLowerCase() as string)
    );
  }

  if (queryObject.position) {
    employeeList = employeeList.filter((employee) =>
      employee.position
        ?.toLowerCase()
        .includes(queryObject.position?.toLowerCase() as string)
    );
  }

  if (queryObject.id) {
    employeeList = employeeList.filter((employee) =>
      employee.id
        ?.toLowerCase()
        .includes(queryObject.id?.toLowerCase() as string)
    );
  }

  if (queryObject.sort) {
    const sortFields = queryObject.sort
      .toString()
      .split(",")
      .map((field) => field.trim());

    // Sort the array by multiple fields
    employeeList.sort((a, b) => {
      for (const field of sortFields) {
        const order = field.startsWith("-") ? -1 : 1;
        const actualField = field.replace(/^[-+]/, "");

        if (actualField.includes("name")) {
          if (a.name < b.name) return -1 * order;
          if (a.name > b.name) return 1 * order;
        }
        if (actualField.includes("salary")) {
          if (a.salary < b.salary) return -1 * order;
          if (a.salary > b.salary) return 1 * order;
        }
      }

      return 0;
    });
  }

  return employeeList;
}

/**
 * function to fetch employee details by id
 * @param id 
 * @returns employee detail
 */
export async function fetchEmployeeById(id: string) {
  let employeeList = await readEmployeeData();

  const employee = employeeList.find((employee) => employee.id === id);

  return employee;
}
