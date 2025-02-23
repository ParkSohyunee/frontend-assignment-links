import { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import useForm from '../hooks/useForm'

import TextField from '../components/TextField'
import Button from '../components/Button'

import { validateForm } from '../utils'
import { alertMessage } from '../constants'

export default function LoginPage() {
  const navigate = useNavigate()

  const { inputs, touched, errors, getTextInputProps } = useForm({
    initialValue: { username: '', password: '' },
    validate: validateForm,
  })

  const { loginMutation } = useAuth()

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()

    const { username, password } = inputs

    if (!username || !password) {
      alert(alertMessage.EMPTY_FORM_AUTH)
      return
    }

    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => navigate('/links'),
        onError: ({ isAxiosError, status, response }) => {
          if (isAxiosError && status === 401) {
            alert(response?.data.message)
          } else {
            alert(alertMessage.ERROR_LOGIN)
          }
        },
      },
    )
  }

  return (
    <form className="m-auto flex w-[650px] flex-col gap-6 p-4">
      <h1 className="mb-10 text-xl text-slate-800">로그인</h1>

      <div className="flex flex-col justify-center gap-2">
        <label htmlFor="id" className="text-sm text-slate-600">
          아이디
        </label>
        <TextField
          id="id"
          autoFocus
          placeholder="아이디를 입력해주세요."
          {...getTextInputProps('username')}
          touched={touched.username}
          isError={!!errors.username}
          errorMessage={errors.username}
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
          touched={touched.password}
          isError={!!errors.password}
          errorMessage={errors.password}
        />
      </div>

      <Link
        to={'/signup'}
        className="text-right text-slate-800 underline underline-offset-4 hover:text-slate-500"
      >
        회원가입 하러가기
      </Link>

      <Button type="submit" onClick={handleLogin} className="py-4">
        로그인
      </Button>
    </form>
  )
}
