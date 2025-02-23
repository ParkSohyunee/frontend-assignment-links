import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useGetCategories from '../hooks/useCategory'
import { useSearchLinks } from '../hooks/useLinks'

import LinkCard from '../components/LinkCard'
import Button from '../components/Button'
import CreateLinkForm from '../components/CreateLinkForm'
import CategoryButton from '../components/CategoryButton'

import { defaultCategoryKey } from '../constants'

export default function LinksPage() {
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [keyword, setKeyword] = useState('')

  const { data: categories } = useGetCategories()

  const [selectedCategoryId, setSelectedCategoryId] =
    useState(defaultCategoryKey)

  const { data: links, error } = useSearchLinks(selectedCategoryId, keyword)

  const handleChangeCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId)
  }

  const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  if (links) {
    if (error?.isAxiosError && error.response?.status === 401) {
      alert(error.response?.data.message)
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="flex flex-col gap-6 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => handleChangeCategory(defaultCategoryKey)}
            className={`cursor-pointer rounded-sm border border-slate-400 px-2 py-1 text-sm ${
              !selectedCategoryId && 'bg-indigo-800 text-white'
            }`}
          >
            전체
          </button>
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
        <Button onClick={() => setIsModalOpen(true)}>링크 추가하기</Button>
      </div>

      <div className="w-96 rounded-sm border border-slate-300 focus-within:outline-1 focus-within:outline-indigo-500">
        <input
          placeholder="검색할 링크 이름을 입력해주세요."
          onChange={handleChangeKeyword}
          className="w-full rounded-sm p-2 text-base outline-none"
        />
      </div>

      <div>
        {isModalOpen && (
          <CreateLinkForm onClose={() => setIsModalOpen(false)} />
        )}

        <ul className="grid grid-cols-3 gap-4">
          {links?.map((link) => <LinkCard key={link.id} link={link} />)}
        </ul>
      </div>
    </div>
  )
}
