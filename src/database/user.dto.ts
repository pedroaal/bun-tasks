import type { IUserSelect } from "./users.schema"

export const UserDto = (user: IUserSelect): Partial<IUserSelect> => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
})
