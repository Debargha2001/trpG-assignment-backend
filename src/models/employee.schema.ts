import {z} from "zod"

export const EmployeeSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string().email(),
    position: z.string(),
    salary: z.number(),
    ...z.record,
})

export const UpdateEmployeeSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    position: z.string().optional(),
    salary: z.number().optional()
})
export type UpdateEmployee = z.infer<typeof UpdateEmployeeSchema>

export type Employee = z.infer<typeof EmployeeSchema>

export const QuerySchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    position: z.string().optional(),
    sort: z.string().optional()
}) 
export type Query = z.infer<typeof QuerySchema>

export const SortEnumSchema = z.enum(["id", "salary", "email", "name"]);

export type SortEnum  = z.infer<typeof SortEnumSchema>