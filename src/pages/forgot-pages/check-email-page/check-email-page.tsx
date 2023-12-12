import { CheckEmail } from '@/components/auth/forgot/check-email'
import { Header } from '@/components/ui/header'

const CheckEmailPage = () => {
  return (
    <>
      <Header isAuth={false} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
        <CheckEmail />
      </div>
    </>
  )
}

export default CheckEmailPage
