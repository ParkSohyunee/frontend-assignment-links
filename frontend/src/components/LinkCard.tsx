import { useState } from 'react'
import { Link } from 'react-router-dom'

import Tag from './Tag'

import { LinkType } from '../types'
import { categoryKey } from '../constants'
import EditLinkForm from './EditLinkForm'

interface LinkCardProps {
  link: LinkType
}

export default function LinkCard({ link }: LinkCardProps) {
  const { categoryId, name, url, id } = link

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  return (
    <>
      <li className="flex flex-col gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-6 hover:bg-slate-100">
        <div className="flex justify-between">
          <Tag>{categoryKey[categoryId]}</Tag>
          <div className="flex gap-0.5 text-sm">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="cursor-pointer px-1 py-0.5 hover:text-slate-400"
            >
              수정
            </button>
            <button className="cursor-pointer px-1 py-0.5 hover:text-slate-400">
              삭제
            </button>
            <button className="cursor-pointer px-1 py-0.5 hover:text-slate-400">
              공유
            </button>
          </div>
        </div>
        <h2 className="text-xl text-slate-900">{name}</h2>
        <Link to={url} target="_blank" className="text-sm text-blue-600">
          {url}
        </Link>
      </li>

      {isEditModalOpen && (
        <EditLinkForm linkId={id} onClose={() => setIsEditModalOpen(false)} />
      )}
    </>
  )
}
