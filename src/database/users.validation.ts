import { object, string, type z } from "zod"

export const CreateUserSchema = object({
  firstName: string().nonempty().max(255),
  lastName: string().nonempty().max(255),
  email: string().email().nonempty().max(255),
  password: string().nonempty().max(25),
})

export const UpdateUserSchema = object({
  firstName: string().optional(),
  lastName: string().optional(),
})

export type IUserCreate = z.infer<typeof CreateUserSchema>
export type IUserUpdate = z.infer<typeof UpdateUserSchema>
