import { PropsWithChildren } from 'react'

import ModalPortal from './ModalPortal'
import ModalTitle from './ModalTitle'
import ModalButton from './ModalButton'

import { useDetectClose } from '../../hooks/useDetectClose'

interface ModalProps {
  onClose: () => void
}

export default function Modal({
  children,
  onClose,
}: PropsWithChildren<ModalProps>) {
  const ref = useDetectClose(onClose)

  return (
    <ModalPortal>
      <div className="fixed top-0 left-0 flex h-full w-full flex-col items-center justify-center bg-slate-900/50 p-8">
        <div
          ref={ref}
          className="flex w-[430px] flex-col items-start justify-center gap-8 rounded-lg bg-white p-6"
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  )
}

Modal.Title = ModalTitle
Modal.Button = ModalButton
