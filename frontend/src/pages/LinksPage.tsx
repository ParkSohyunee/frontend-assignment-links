import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useGetCategories from '../hooks/useCategory'
import { useGetLinks } from '../hooks/useLinks'

import LinkCard from '../components/LinkCard'
import Button from '../components/Button'

import CreateLinkForm from '../components/CreateLinkForm'

export default function LinksPage() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: categories } = useGetCategories()
  const { data: links, error: linksError } = useGetLinks()

  if (linksError) {
    if (linksError?.isAxiosError && linksError.response?.status === 401) {
      alert(linksError.response?.data.message)
      navigate('/', { replace: true })
    }
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
          <CreateLinkForm onClose={() => setIsModalOpen(false)} />
        )}

        <ul className="grid grid-cols-3 gap-4">
          {links?.map((link) => <LinkCard key={link.id} link={link} />)}
        </ul>
      </div>
    </div>
  )
}
