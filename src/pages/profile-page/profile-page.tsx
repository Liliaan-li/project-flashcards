import { EditProfile } from '@/components/profile/edit-profile'
import { Header } from '@/components/ui/header'
import {
  useChangeUserNameMutation,
  useLogoutMutation,
  useMeQuery,
} from '@/services/auth/auth.service.ts'

export const ProfilePage = () => {
  const { data } = useMeQuery()
  const [logout] = useLogoutMutation()
  const [changeUserName] = useChangeUserNameMutation()

  const isAuthenticated = !!data

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
        onSignOut={logout}
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
        <EditProfile
          email={data.email}
          avatar={
            data.avatar === null
              ? 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg'
              : data.avatar
          }
          name={data.name}
          onLogout={logout}
          onAvatarChange={() => {}}
          onNameChange={name => {
            changeUserName(name)
          }}
        />
      </div>
    </>
  )
}
