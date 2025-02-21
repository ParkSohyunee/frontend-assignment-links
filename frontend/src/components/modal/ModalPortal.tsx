import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export default function ModalPortal({ children }: PropsWithChildren) {
  const el = document.getElementById('root') as HTMLElement

  return createPortal(children, el)
}
