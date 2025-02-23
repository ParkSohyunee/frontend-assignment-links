import { useMutation } from '@tanstack/react-query'

import { postLogin, postSignup } from '../api/auth'
import { UseMutationCustomOptions } from '../types'
import { removeCookie, setCookie } from '../utils'
import { tokenKey } from '../constants'

const useSignup = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  })
}

const useLogin = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({ accessToken, refreshToken }) => {
      setCookie(tokenKey.ACCESS_TOKEN, accessToken, 'AT')
      setCookie(tokenKey.REFRESH_TOKEN, refreshToken, 'RT')
    },
    ...mutationOptions,
  })
}

const useAuth = () => {
  const signupMutation = useSignup()
  const loginMutation = useLogin()
  const logout = () => {
    removeCookie(tokenKey.ACCESS_TOKEN)
    removeCookie(tokenKey.REFRESH_TOKEN)
  }

  return {
    signupMutation,
    loginMutation,
    logout,
  }
}

export default useAuth
