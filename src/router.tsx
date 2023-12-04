import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { SignInPage } from '@/pages'
import { DeckPage } from '@/pages/deck-page/deck-page.tsx'
import { MainDecksPage } from '@/pages/decks-page/decks-page-with-header/decks-page-with-header.tsx'
import CheckEmailPage from '@/pages/forgot-pages/check-email-page/check-email-page.tsx'
import { CreateNewPasswordPage } from '@/pages/forgot-pages/create-new-password-page'
import { ForgotPasswordPage } from '@/pages/forgot-pages/forgot-password-page/forgot-password-page.tsx'
import { LearnPage } from '@/pages/learn-page/learn-page.tsx'
import { ProfilePage } from '@/pages/profile-page'
import { SignUpPage } from '@/pages/sign-up-page'
import { useMeQuery } from '@/services/auth/auth.service.ts'

const publicRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <SignInPage />,
        path: '/login',
      },
      {
        element: <ForgotPasswordPage />,
        path: '/password-recovery',
      },
      {
        element: <CreateNewPasswordPage />,
        path: '/create-new-password/:token',
      },
      {
        element: <CheckEmailPage />,
        path: '/check-email',
      },
      {
        element: <SignUpPage />,
        path: '/sign-up',
      },
    ],
    element: <Outlet />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <MainDecksPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    element: <DeckPage />,
    path: '/decks/:id/cards',
  },
  { element: <LearnPage />, path: `/decks/:id/learn` },
]

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
])

export const Router = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

function PrivateRoutes() {
  const { isError, isLoading } = useMeQuery()
  const isAuthenticated = !isError

  if (isLoading) return <div>Loading...</div>

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
