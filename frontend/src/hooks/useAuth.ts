import { useMutation } from '@tanstack/react-query'
import { postLogin, postSignup } from '../api/auth'

import { UseMutationCustomOptions } from '../types'

const useSignup = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  })
}

const useLogin = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postLogin,
    ...mutationOptions,
  })
}

// TODO 로그아웃

const useAuth = () => {
  const signupMutation = useSignup()
  const loginMutation = useLogin()

  return {
    signupMutation,
    loginMutation,
  }
}

export default useAuth
