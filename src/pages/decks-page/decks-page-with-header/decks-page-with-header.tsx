import { Header } from '@/components/ui/header'
import { DecksPage } from '@/pages'
import { useMeQuery } from '@/services/auth/auth.service.ts'

export const MainDecksPage = () => {
  const { data } = useMeQuery()

  return (
    <div>
      <Header
        isAuth
        userInfo={{
          name: data.name,
          avatar:
            'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
          email: data.email,
        }}
      />
      <DecksPage />
    </div>
  )
}
