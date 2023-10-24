import { Navigate } from 'react-router-dom'

import { SignIn } from '@/components/auth/login/sign-in'
import { useLoginMutation, useMeQuery } from '@/services/auth/auth.service.ts'

export const SignInPage = () => {
  const [logIn] = useLoginMutation()
  const { isLoading, data } = useMeQuery()
  const isAuthenticated = !!data

  if (isLoading) return <div>Loading...</div>
  if (isAuthenticated) return <Navigate to="/" replace={true} />

  return (
    <>
      <SignIn onSubmit={logIn} />
    </>
  )
}
