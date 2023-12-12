import { Navigate, useParams } from 'react-router-dom'
import { CircleLoader } from 'react-spinners'

import { CreateNewPassword } from '@/components/auth/forgot/create-new-password'
import { Header } from '@/components/ui/header'
import { useCreateNewPasswordMutation } from '@/services/auth/auth.service.ts'

export const CreateNewPasswordPage = () => {
  const [create, { status }] = useCreateNewPasswordMutation()
  const { token } = useParams()

  if (status === 'pending' || status === 'rejected')
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
        }}
      >
        <CircleLoader color="var(--color-accent-300)" size={100} />
      </div>
    )
  if (status === 'fulfilled') return <Navigate to="/login" replace={true} />
  if (!token) {
    return null
  }

  return (
    <>
      <Header isAuth={false} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
        <CreateNewPassword onSubmit={password => create({ token, ...password })} />
      </div>
    </>
  )
}
