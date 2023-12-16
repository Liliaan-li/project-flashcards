import { Toaster } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import { BarLoader } from 'react-spinners'

import { SignIn } from '@/components/auth/login/sign-in'
import { Header } from '@/components/ui/header'
import { useLoginMutation, useMeQuery } from '@/services/auth/auth.service.ts'
import { errorToast } from '@/utils/toasts/toasts.ts'

export const SignInPage = () => {
  const [logIn] = useLoginMutation()
  const { isLoading, data } = useMeQuery()
  const isAuthenticated = !!data

  if (isAuthenticated) return <Navigate to="/" replace={true} />

  return (
    <>
      <Header isAuth={isAuthenticated} />
      {isLoading && (
        <div>
          <BarLoader color="var(--color-accent-300)" width={'100%'} />
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
        <SignIn
          onSubmit={data =>
            logIn(data)
              .unwrap()
              .catch(error => errorToast(error.data.message))
          }
        />
      </div>
      <Toaster />
    </>
  )
}
