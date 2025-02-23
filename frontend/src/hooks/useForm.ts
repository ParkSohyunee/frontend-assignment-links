import { ChangeEvent, useEffect, useState } from 'react'

interface UseFormProps<T> {
  initialValue: T
  validate?: (inputs: T) => Record<keyof T, string>
}

export default function useForm<T>({
  initialValue,
  validate,
}: UseFormProps<T>) {
  const [inputs, setInputs] = useState(initialValue)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChangeInputs = (name: keyof T, text: string) => {
    setInputs((prev) => ({
      ...prev,
      [name]: text,
    }))
  }

  const handleBlur = (name: keyof T) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
  }

  const getTextInputProps = (name: keyof T) => {
    const input = inputs[name]
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      handleChangeInputs(name, e.target.value)
    }
    const onBlur = () => {
      handleBlur(name)
    }

    return {
      input,
      onChange,
      onBlur,
    }
  }

  useEffect(() => {
    if (validate) {
      const errors = validate(inputs)
      setErrors(errors)
    }
  }, [inputs, validate])

  return {
    inputs,
    setInputs,
    touched,
    errors,
    getTextInputProps,
  }
}
