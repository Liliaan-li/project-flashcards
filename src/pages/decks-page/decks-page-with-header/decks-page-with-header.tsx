import { Header } from '@/components/ui/header'
import { DecksPage } from '@/pages'
import { useLogoutMutation, useMeQuery } from '@/services/auth/auth.service.ts'

export const MainDecksPage = () => {
  const { data } = useMeQuery()
  const [logout] = useLogoutMutation()

  const isAuthenticated = !!data

  if (!data) {
    return null
  }

  return (
    <div>
      <Header
        isAuth={isAuthenticated}
        userInfo={{
          name: data.name,
          avatar: data.avatar,
          email: data.email,
        }}
        onSignOut={logout}
      />
      <DecksPage />
    </div>
  )
}
