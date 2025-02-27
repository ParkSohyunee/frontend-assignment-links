import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TextField from './TextField'
import CategoryButton from './CategoryButton'
import Modal from './modal/Modal'

import useGetCategories from '../hooks/useCategory'
import useForm from '../hooks/useForm'
import { useGetLinkById, useLinksMutation } from '../hooks/useLinks'

import { validateLinkForm } from '../utils'
import { alertMessage, defaultCategoryKey } from '../constants'

interface EditLinkFormProps {
  linkId: number
  onClose: () => void
}

export default function EditLinkForm({ linkId, onClose }: EditLinkFormProps) {
  const navigate = useNavigate()

  const { data: categories } = useGetCategories()
  const { data, error: linkError } = useGetLinkById(linkId)
  const { updateLinkMutation } = useLinksMutation()

  const [selectedCategoryId, setSelectedCategoryId] =
    useState(defaultCategoryKey)

  const { inputs, setInputs, touched, errors, getTextInputProps } = useForm({
    initialValue: { name: '', url: '' },
    validate: validateLinkForm,
  })

  const handleChangeCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId)
  }

  const handleUpdateLink = () => {
    const { name, url } = inputs

    if (!name || !url) {
      alert(alertMessage.EMPTY_FORM_LINKS)
      return
    }

    updateLinkMutation.mutate(
      {
        id: linkId,
        link: {
          name,
          url,
          categoryId: selectedCategoryId,
        },
      },
      { onSuccess: onClose },
    )
  }

  useEffect(() => {
    if (data) {
      setInputs((prev) => ({
        ...prev,
        name: data.name,
        url: data.url,
      }))

      setSelectedCategoryId(data.categoryId)
    }
  }, [data, setInputs])

  if (linkError) {
    if (linkError?.isAxiosError && linkError.response?.status === 401) {
      alert(linkError.response?.data.message)
      navigate('/', { replace: true })
    }
  }

  return (
    <Modal onClose={() => onClose()}>
      <Modal.Title>링크 수정하기</Modal.Title>

      <div className="flex w-full flex-col justify-center gap-2">
        <label htmlFor="id" className="text-sm text-slate-600">
          웹 링크 이름
        </label>
        <TextField
          id="name"
          placeholder="추가할 링크 이름을 입력해주세요."
          defaultValue={inputs.name}
          {...getTextInputProps('name')}
          touched={touched.name}
          isError={!!errors.name}
          errorMessage={errors.name}
        />
      </div>

      <div className="flex w-full flex-col justify-center gap-2">
        <label htmlFor="id" className="text-sm text-slate-600">
          저장할 웹 사이트의 URL
        </label>
        <TextField
          id="url"
          placeholder="ex) https://google.com"
          defaultValue={inputs.url}
          {...getTextInputProps('url')}
          touched={touched.url}
          isError={!!errors.url}
          errorMessage={errors.url}
        />
      </div>

      <div className="flex gap-2">
        {categories?.map(({ id, name }) => (
          <CategoryButton
            key={id}
            categoryId={id}
            selectedCategoryId={selectedCategoryId}
            handleChangeCategory={handleChangeCategory}
          >
            {name}
          </CategoryButton>
        ))}
      </div>

      <Modal.Button onClick={handleUpdateLink}>수정</Modal.Button>
    </Modal>
  )
}
