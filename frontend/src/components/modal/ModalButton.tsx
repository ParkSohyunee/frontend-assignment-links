import Button from '../Button'

interface ModalButtoneProps {
  children: string
  onClick: () => void
}

export default function ModalButton({ children, onClick }: ModalButtoneProps) {
  return (
    <Button type="button" onClick={onClick} className="w-full">
      {children}
    </Button>
  )
}
