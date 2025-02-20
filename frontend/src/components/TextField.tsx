import { InputHTMLAttributes } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean
  errorMessage?: string
  touched: boolean
}

export default function TextField({
  isError = false,
  errorMessage = '',
  touched,
  ...props
}: TextFieldProps) {
  return (
    <div className="relative">
      <div className="rounded-sm border border-slate-200 focus-within:outline-1 focus-within:outline-indigo-500">
        <input
          autoComplete="off"
          className="w-full rounded-sm p-2 text-base outline-none"
          {...props}
        />
      </div>

      {touched && isError && (
        <p className="p-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  )
}
