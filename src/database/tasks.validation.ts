import { object, type z } from "zod"

// https://zod.dev/?id=strings

// crear las validaciones de los datos

export const CreateTaskSchema = object({})

export const UpdateTaskSchema = object({})

export type ITaskCreate = z.infer<typeof CreateTaskSchema>
export type ITaskUpdate = z.infer<typeof UpdateTaskSchema>
