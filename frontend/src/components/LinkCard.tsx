import { useState } from 'react'
import { Link } from 'react-router-dom'

import Tag from './Tag'
import EditLinkForm from './EditLinkForm'
import Modal from './modal/Modal'

import { CategoryIdType, LinkType } from '../types'
import { alertMessage, categoryKey } from '../constants'

import { useLinksMutation } from '../hooks/useLinks'
import useForm from '../hooks/useForm'
import TextField from './TextField'

interface LinkCardProps {
  link: LinkType
}

export default function LinkCard({ link }: LinkCardProps) {
  const { categoryId, name, url, id } = link

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const { deleteLinkMutation, useShareLinkMutation } = useLinksMutation()

  const { inputs, touched, getTextInputProps } = useForm({
    initialValue: { username: '' },
  })

  const handleShareLink = () => {
    if (!inputs.username) {
      alert(alertMessage.EMPTY_FORM_SHARE_LINKS)
      return
    }

    useShareLinkMutation.mutate(
      { username: inputs.username, linkId: id },
      { onSuccess: () => setIsShareModalOpen(false) },
    )
  }

  return (
    <>
      <li className="flex flex-col gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-6 hover:bg-slate-100">
        <div className="flex justify-between">
          <Tag>{categoryKey[categoryId as CategoryIdType]}</Tag>
          <div className="flex gap-0.5 text-sm">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="cursor-pointer px-1 py-0.5 hover:text-slate-400"
            >
              수정
            </button>
            <button
              onClick={() => deleteLinkMutation.mutate(id)}
              className="cursor-pointer px-1 py-0.5 hover:text-slate-400"
            >
              삭제
            </button>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="cursor-pointer px-1 py-0.5 hover:text-slate-400"
            >
              공유
            </button>
          </div>
        </div>
        <h2 className="text-xl text-slate-900">{name}</h2>
        <Link
          to={url}
          target="_blank"
          className="truncate text-sm text-blue-600"
        >
          {url}
        </Link>
      </li>

      {isEditModalOpen && (
        <EditLinkForm linkId={id} onClose={() => setIsEditModalOpen(false)} />
      )}

      {isShareModalOpen && (
        <Modal onClose={() => setIsShareModalOpen(false)}>
          <Modal.Title>링크 공유하기</Modal.Title>

          <div className="flex w-full flex-col justify-center gap-2">
            <label htmlFor="id" className="text-sm text-slate-600">
              공유 대상
            </label>
            <TextField
              id="name"
              placeholder="링크를 공유할 대상의 아이디를 입력해주세요."
              {...getTextInputProps('username')}
              touched={touched.name}
            />
          </div>
          <Modal.Button onClick={handleShareLink}>공유하기</Modal.Button>
        </Modal>
      )}
    </>
  )
}
