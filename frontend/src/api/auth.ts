import axiosInstance from '../libs/axios/axiosInstance'
import { LoginUserType, RequestUserType } from '../types'

export const postSignup = async (user: RequestUserType) => {
  await axiosInstance.post('/auth/signup', user)
}

export const postLogin = async (user: RequestUserType) => {
  const response = await axiosInstance.post<LoginUserType>('/auth/login', user)

  return response.data
}
