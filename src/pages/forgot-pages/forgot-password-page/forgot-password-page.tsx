import { Navigate } from 'react-router-dom'

import { ForgotPassword } from '@/components/auth/forgot/forgot-password'
import { Header } from '@/components/ui/header'
import { file } from '@/pages/forgot-pages/forgot-password-page/mail.ts'
import { useMeQuery, useRecoverPasswordMutation } from '@/services/auth/auth.service.ts'

export const ForgotPasswordPage = () => {
  const { isLoading, data } = useMeQuery()
  const [recover, { status }] = useRecoverPasswordMutation()
  const isAuthenticated = !!data

  if (isLoading) return <div>Loading...</div>
  if (status === 'fulfilled') return <Navigate to="/check-email" replace={true} />

  return (
    <>
      <Header isAuth={isAuthenticated} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
        <ForgotPassword
          onSubmit={email =>
            recover({
              html: file,
              ...email,
              subject: 'Password recovery',
            })
          }
        />
      </div>
    </>
  )
}
