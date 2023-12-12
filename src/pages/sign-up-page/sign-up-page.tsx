import { Toaster } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import { BarLoader } from 'react-spinners'

import { SignUp } from '@/components/auth/login/sign-up'
import { Header } from '@/components/ui/header'
import { useSignUpMutation } from '@/services/auth/auth.service.ts'
import { errorToast } from '@/utils/toasts/toasts.ts'

export const SignUpPage = () => {
  const [signUp, { status }] = useSignUpMutation()

  if (status === 'fulfilled') return <Navigate to="/login" replace={true} />

  return (
    <>
      <Header isAuth={false} />
      {status === 'pending' && (
        <div>
          <BarLoader color="var(--color-accent-300)" width={'100%'} />
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
        <SignUp
          onSubmit={data =>
            signUp({
              html: '<b>Hello, ##name##!</b><br/>Please confirm your email by clicking on the link below:<br/><a href="http://localhost:3000/confirm-email/##token##">Confirm email</a>. If it doesn\'t work, copy and paste the following link in your browser:<br/>http://localhost:3000/confirm-email/##token##',
              ...data,
              name: data.email,
              subject: 'Confirm sign up',
              sendConfirmationEmail: false,
            })
              .unwrap()
              .catch(error => errorToast(error.data.errorMessages[0]))
          }
        />
        <Toaster />
      </div>
    </>
  )
}
