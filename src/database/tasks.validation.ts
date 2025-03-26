import { object, type z } from "zod"

export const CreateTaskSchema = object({})

export const UpdateTaskSchema = object({})

export type ITaskCreate = z.infer<typeof CreateTaskSchema>
export type ITaskUpdate = z.infer<typeof UpdateTaskSchema>
