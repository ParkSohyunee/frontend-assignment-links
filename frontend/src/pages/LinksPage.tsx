import { useState } from 'react'

import useGetCategories from '../hooks/useCategory'
import useForm from '../hooks/useForm'
import useLinks from '../hooks/useLinks'

import TextField from '../components/TextField'
import Modal from '../components/modal/Modal'
import LinkCard from '../components/LinkCard'
import Button from '../components/Button'
import CategoryButton from '../components/CategoryButton'

import { validateLinkForm } from '../utils'
import { alertMessage, defaultCategoryKey } from '../constants'
import { CategoryIdType } from '../types'

export default function LinksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<CategoryIdType>(defaultCategoryKey)

  const { data: categories } = useGetCategories()
  const {
    getLinksQuery: { data: links },
    createLinkMutation,
  } = useLinks()

  const { inputs, touched, errors, getTextInputProps } = useForm({
    initialValue: { name: '', url: '', categoryId: defaultCategoryKey },
    validate: validateLinkForm,
  })

  const handleChangeCategory = (categoryId: CategoryIdType) => {
    setSelectedCategoryId(categoryId)
  }

  const handleCreateLink = () => {
    const { name, url } = inputs

    if (!name || !url) {
      alert(alertMessage.EMPTY_FORM_LINKS)
      return
    }

    createLinkMutation.mutate(
      { name, url, categoryId: selectedCategoryId },
      { onSuccess: () => setIsModalOpen(false) },
    )
  }

  return (
    <div className="px-8 py-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          {categories?.map((category) => (
            <button
              key={category.id}
              id={String(category.id)}
              className="cursor-pointer"
            >
              {category.name}
            </button>
          ))}
        </div>
        <Button onClick={() => setIsModalOpen(true)}>링크 추가하기</Button>
      </div>

      <div>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <Modal.Title>링크 추가하기</Modal.Title>

            <div className="flex w-full flex-col justify-center gap-2">
              <label htmlFor="id" className="text-sm text-slate-600">
                웹 링크 이름
              </label>
              <TextField
                id="name"
                placeholder="추가할 링크 이름을 입력해주세요."
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
                  categoryId={id as CategoryIdType}
                  selectedCategoryId={selectedCategoryId}
                  handleChangeCategory={handleChangeCategory}
                >
                  {name}
                </CategoryButton>
              ))}
            </div>

            <Modal.Button onClick={handleCreateLink}>확인</Modal.Button>
          </Modal>
        )}

        <ul className="grid grid-cols-3 gap-4">
          {links?.map((link) => <LinkCard key={link.id} link={link} />)}
        </ul>
      </div>
    </div>
  )
}
