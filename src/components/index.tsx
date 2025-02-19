import { InputHTMLAttributes } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean
  errorMessage?: string
}

export default function TextField({
  isError = false,
  errorMessage = '',
  ...props
}: TextFieldProps) {
  return (
    <div className="relative">
      <div className="rounded-sm border border-slate-200 focus-within:outline-1 focus-within:outline-indigo-500">
        <input
          className="w-full rounded-sm p-2 text-base outline-none"
          autoFocus
          {...props}
        />
      </div>

      {isError && <p className="p-1 text-sm text-red-600">{errorMessage}</p>}
    </div>
  )
}
