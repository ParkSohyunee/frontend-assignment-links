import { ChangeEvent, useState } from 'react'

interface UseFormProps<T> {
  initialValue: T
}

export default function useForm<T>({ initialValue }: UseFormProps<T>) {
  const [inputs, setInputs] = useState(initialValue)

  const handleChangeInputs = (name: keyof T, text: string) => {
    setInputs((prev) => ({
      ...prev,
      [name]: text,
    }))
  }

  const getTextInputProps = (name: keyof T) => {
    const input = inputs[name]
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      handleChangeInputs(name, e.target.value)
    }

    return {
      input,
      onChange,
    }
  }

  return {
    inputs,
    getTextInputProps,
  }
}
