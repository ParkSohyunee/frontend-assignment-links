interface ModalButtoneProps {
  children: string
  onClick: () => void
}

export default function ModalButton({ children, onClick }: ModalButtoneProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full cursor-pointer rounded-lg bg-slate-800 p-2 text-white hover:bg-slate-700 active:bg-slate-900"
    >
      {children}
    </button>
  )
}
