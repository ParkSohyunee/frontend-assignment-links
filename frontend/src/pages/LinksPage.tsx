import { Link } from 'react-router-dom'

import useGetCategories from '../hooks/useCategory'
import useForm from '../hooks/useForm'
import useLinks from '../hooks/useLinks'

import TextField from '../components/TextField'

import { validateLinkForm } from '../utils'
import { alertMessage, defaultCategoryKey } from '../constants'

export default function LinksPage() {
  const { data: categories } = useGetCategories()
  const {
    getLinksQuery: { data: links },
    createLinkMutation,
  } = useLinks()

  const { inputs, touched, errors, getTextInputProps } = useForm({
    initialValue: { name: '', url: '', categoryId: defaultCategoryKey },
    validate: validateLinkForm,
  })

  const handleCreateLink = () => {
    const { name, url, categoryId } = inputs

    if (!name || !url) {
      alert(alertMessage.EMPTY_FORM_LINKS)
      return
    }

    createLinkMutation.mutate({
      name,
      url,
      categoryId,
    })
  }

  return (
    <div>
      <section>
        {categories?.map((category) => (
          <button
            key={category.id}
            id={String(category.id)}
            className="cursor-pointer"
          >
            {category.name}
          </button>
        ))}
      </section>

      <section>
        <button onClick={handleCreateLink}>링크 추가하기 +</button>

        <div className="flex flex-col justify-center gap-2">
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

        <div className="flex flex-col justify-center gap-2">
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

        <ul className="flex flex-col gap-4">
          {links?.map((link) => (
            <li key={link.id}>
              <div className="flex justify-between">
                <button>{link.categoryId}</button>
                <div className="flex gap-1">
                  <button>수정</button>
                  <button>삭제</button>
                  <button>공유</button>
                </div>
              </div>
              <h2 className="text-xl">{link.name}</h2>
              <Link to={link.url} target="_blank" className="text-sm">
                {link.url}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
