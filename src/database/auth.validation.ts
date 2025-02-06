import { object, string, type z } from "zod"

export const SignUpSchema = object({
  firstName: string().nonempty().max(255),
  lastName: string().nonempty().max(255),
  email: string().email().nonempty().max(255),
  password: string().nonempty().max(25),
})

export const SignInSchema = object({
  email: string().nonempty().max(255),
  password: string().nonempty().max(25),
})

export type ISignUp = z.infer<typeof SignUpSchema>
export type ISignIn = z.infer<typeof SignInSchema>
