import TextField from '../components/TextField'
import useForm from '../hooks/useForm'

export default function LoginPage() {
  const { inputs, getTextInputProps } = useForm({
    initialValue: {
      id: '',
      password: '',
    },
  })

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
          {...getTextInputProps('id')}
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
    </form>
  )
}
