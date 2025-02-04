import { object, string, enum as zenum, type z } from "zod"

export const CreateTaskSchema = object({
  title: string().nonempty().max(255),
  description: string().nonempty().max(255),
  status: zenum(["CREATED", "COMPLETED"]),
})

export const UpdateTaskSchema = object({
  title: string().nullable(),
  description: string().nullable(),
  status: zenum(["CREATED", "COMPLETED"]).nullable(),
})

export type ITaskCreate = z.infer<typeof CreateTaskSchema>
export type ITaskUpdate = z.infer<typeof UpdateTaskSchema>
