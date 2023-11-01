import { Navigate } from 'react-router-dom'

import { SignIn } from '@/components/auth/login/sign-in'
import { Header } from '@/components/ui/header'
import { useLoginMutation, useMeQuery } from '@/services/auth/auth.service.ts'

export const SignInPage = () => {
  const [logIn] = useLoginMutation()
  const { isLoading, data } = useMeQuery()
  const isAuthenticated = !!data

  if (isLoading) return <div>Loading...</div>
  if (isAuthenticated) return <Navigate to="/" replace={true} />

  return (
    <>
      <Header isAuth={isAuthenticated} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
        <SignIn onSubmit={logIn} />
      </div>
    </>
  )
}
