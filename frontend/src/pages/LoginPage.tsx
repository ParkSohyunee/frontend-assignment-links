import useAuth from '../hooks/useAuth'
import useForm from '../hooks/useForm'

import TextField from '../components/TextField'
import { FormEvent } from 'react'

export default function LoginPage() {
  const { inputs, getTextInputProps } = useForm({
    initialValue: {
      username: '',
      password: '',
    },
  })

  const { loginMutation } = useAuth()

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()

    const { username, password } = inputs

    loginMutation.mutate(
      { username, password },
      { onError: () => alert('로그인을 다시 시도해주세요.') },
    )
  }

  return (
    <form className="flex w-96 flex-col gap-4 p-4">
      <h1 className="text-xl text-indigo-800">로그인</h1>

      <div className="flex flex-col justify-center gap-2">
        <label htmlFor="id" className="text-sm text-slate-600">
          아이디
        </label>
        <TextField
          id="id"
          autoFocus
          placeholder="아이디를 입력해주세요."
          {...getTextInputProps('username')}
          isError
          errorMessage="아이디를 입력해주세요."
        />
      </div>

      <div className="flex flex-col justify-center gap-2">
        <label htmlFor="password" className="text-sm text-slate-600">
          비밀번호
        </label>
        <TextField
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          {...getTextInputProps('password')}
        />
      </div>

      <button type="submit" onClick={handleLogin}>
        로그인
      </button>
    </form>
  )
}
