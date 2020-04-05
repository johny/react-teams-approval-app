import { User } from "../features/teams/teamsSlice"

export const getUserName = (user: User) => `${user.firstName} ${user.lastName}`
