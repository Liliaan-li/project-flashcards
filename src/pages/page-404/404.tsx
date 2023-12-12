import { useNavigate } from 'react-router-dom'

import { Error404 } from '@/assets/error/Error404.tsx'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/ui/header'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/services/auth/auth.service.ts'

const Page404 = () => {
  const { data } = useMeQuery()
  const isAuthenticated = !!data
  const navigate = useNavigate()

  if (!data) {
    return null
  }

  return (
    <>
      <Header
        isAuth={isAuthenticated}
        userInfo={{
          name: data.name,
          avatar: data.avatar,
          email: data.email,
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '8%',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Error404 size={400} style={{ height: '200px' }} />
        <Typography.Body1 style={{ margin: '2% auto' }}>Sorry! Page not found!</Typography.Body1>
        <div>
          <Button onClick={() => navigate('/')}>Back to homepage</Button>
        </div>
      </div>
    </>
  )
}

export default Page404
