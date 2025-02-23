interface CategoryButtonProps {
  children: string
  categoryId: number
  selectedCategoryId?: number
  handleChangeCategory: (categoryId: number) => void
}

export default function CategoryButton({
  children,
  categoryId,
  selectedCategoryId,
  handleChangeCategory,
}: CategoryButtonProps) {
  return (
    <button
      onClick={() => handleChangeCategory(categoryId)}
      className={`cursor-pointer rounded-sm border border-slate-400 px-2 py-1 text-sm ${
        selectedCategoryId === categoryId && 'bg-indigo-800 text-white'
      }`}
    >
      {children}
    </button>
  )
}
