import { Navigate } from 'react-router-dom'
import { BarLoader } from 'react-spinners'

import { ForgotPassword } from '@/components/auth/forgot/forgot-password'
import { Header } from '@/components/ui/header'
import { file } from '@/pages/forgot-pages/forgot-password-page/mail.ts'
import { useRecoverPasswordMutation } from '@/services/auth/auth.service.ts'

export const ForgotPasswordPage = () => {
  const [recover, { status, isLoading }] = useRecoverPasswordMutation()

  if (status === 'fulfilled') return <Navigate to="/check-email" replace={true} />

  return (
    <>
      <Header isAuth={false} />
      {isLoading && (
        <div>
          <BarLoader color="var(--color-accent-300)" width={'100%'} />
        </div>
      )}
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
