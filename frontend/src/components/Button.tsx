interface ButtonProps {
  children: string
  onClick: () => void
  className?: string
}

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-lg bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700 active:bg-slate-900 ${className}`}
    >
      {children}
    </button>
  )
}
