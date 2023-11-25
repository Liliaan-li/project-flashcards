import { Navigate, useParams } from 'react-router-dom'

import { CreateNewPassword } from '@/components/auth/forgot/create-new-password'
import { Header } from '@/components/ui/header'
import { useCreateNewPasswordMutation } from '@/services/auth/auth.service.ts'

export const CreateNewPasswordPage = () => {
  const [create, { status }] = useCreateNewPasswordMutation()
  const { token } = useParams()

  if (status === 'pending' || status === 'rejected') return <div>Loading...</div>
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
