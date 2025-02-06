import { object, string, enum as zenum, type z } from "zod"

export const CreateTaskSchema = object({
  title: string().nonempty().max(255),
  description: string().nonempty().max(255),
  status: zenum(["CREATED", "COMPLETED"]).optional(),
})

export const UpdateTaskSchema = object({
  title: string().optional(),
  description: string().optional(),
  status: zenum(["CREATED", "COMPLETED"]).optional(),
})

export type ITaskCreate = z.infer<typeof CreateTaskSchema>
export type ITaskUpdate = z.infer<typeof UpdateTaskSchema>
