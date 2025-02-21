import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import LinksPage from './pages/LinksPage'

// Create a client
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/links',
    element: <LinksPage />,
  },
])

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
