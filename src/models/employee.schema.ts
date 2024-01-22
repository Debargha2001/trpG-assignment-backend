import {z} from "zod"

export const EmployeeSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    position: z.string().optional(),
    salary: z.number().optional()
})

export type Employee = z.infer<typeof EmployeeSchema>
