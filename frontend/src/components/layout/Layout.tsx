import { Outlet } from 'react-router-dom'

export default function LoginLayout() {
  return (
    <div className="m-auto flex h-dvh w-full flex-col justify-center">
      <Outlet />
    </div>
  )
}
