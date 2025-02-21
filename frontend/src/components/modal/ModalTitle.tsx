interface ModalTitleProps {
  children: string
}

export default function ModalTitle({ children }: ModalTitleProps) {
  return <h2 className="text-xl">{children}</h2>
}
