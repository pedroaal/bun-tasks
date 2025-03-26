import { object, type z } from "zod"

// https://zod.dev/?id=strings

export const CreateTaskSchema = object({})

export const UpdateTaskSchema = object({})

export type ITaskCreate = z.infer<typeof CreateTaskSchema>
export type ITaskUpdate = z.infer<typeof UpdateTaskSchema>
