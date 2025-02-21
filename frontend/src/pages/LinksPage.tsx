import { Link } from 'react-router-dom'
import useGetCategories from '../hooks/useCategory'

const links = [
  {
    id: 1,
    name: 'React',
    url: 'https://naver.com',
    createdById: 1,
    categoryId: 1,
  },
  {
    id: 2,
    name: 'React',
    url: 'https://naver.com',
    createdById: 1,
    categoryId: 1,
  },
  {
    id: 3,
    name: 'React',
    url: 'https://naver.com',
    createdById: 1,
    categoryId: 1,
  },
  {
    id: 4,
    name: 'React',
    url: 'https://naver.com',
    createdById: 1,
    categoryId: 1,
  },
  {
    id: 5,

    name: 'React',
    url: 'https://naver.com',
    createdById: 1,
    categoryId: 1,
  },
]

export default function LinksPage() {
  const { data: categories } = useGetCategories()

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
        <button>링크 추가하기 +</button>

        <ul className="flex flex-col gap-4">
          {links.map((link) => (
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
