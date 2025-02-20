export interface UserType {
  id: number
  username: string
  password: string
}

export interface LoginUserType {
  accessToken: string
  refreshToken: string
}
