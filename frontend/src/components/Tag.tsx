interface TagProps {
  children: string
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="block max-w-20 rounded-sm bg-slate-600 px-2 py-1 text-xs text-white">
      {children}
    </span>
  )
}
