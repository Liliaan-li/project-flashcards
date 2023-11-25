import { CheckEmail } from '@/components/auth/forgot/check-email'
import { Header } from '@/components/ui/header'
import { useMeQuery } from '@/services/auth/auth.service.ts'

const CheckEmailPage = () => {
  const { isLoading, data } = useMeQuery()
  const isAuthenticated = !!data

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <Header isAuth={isAuthenticated} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
        <CheckEmail />
      </div>
    </>
  )
}

export default CheckEmailPage
