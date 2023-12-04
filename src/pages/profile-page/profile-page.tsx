import { defaultAva } from '@/assets/avatar/defaultAva.ts'
import { EditProfile } from '@/components/profile/edit-profile'
import { Header } from '@/components/ui/header'
import {
  useEditUserInfoMutation,
  useLogoutMutation,
  useMeQuery,
} from '@/services/auth/auth.service.ts'

export const ProfilePage = () => {
  const { data } = useMeQuery()
  const [logout] = useLogoutMutation()
  const [editUser] = useEditUserInfoMutation()
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
          avatar={data.avatar === null ? defaultAva : data.avatar}
          name={data.name}
          onLogout={logout}
          onHandleEditUserInfo={data => {
            editUser(data)
          }}
        />
      </div>
    </>
  )
}
