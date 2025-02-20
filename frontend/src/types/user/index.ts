import { UserType } from './user.dto'

export * from './user.dto'

export type RequestUserType = Omit<UserType, 'id'>
