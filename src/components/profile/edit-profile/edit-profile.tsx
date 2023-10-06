import s from './edit-profile.module.scss'

import Camera from '@/assets/icons/components/camera/camera'
import Edit from '@/assets/icons/components/edit/edit'
import { LogoutIcon } from '@/assets/icons/components/logout/logout-icon'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

type Props = {
  email: string
  avatar: string
  name: string
  onLogout: () => void
  onAvatarChange: (newAvatar: string) => void
  onNameChange: (newName: string) => void
}
export const EditProfile = ({
  avatar,
  email,
  name,
  onAvatarChange,
  onNameChange,
  onLogout,
}: Props) => {
  const handleAvatarChanged = () => {
    onAvatarChange('new Avatar')
  }
  const handleNameChanged = () => {
    onNameChange('New name')
  }
  const handleLogout = () => {
    onLogout()
  }

  return (
    <Card className={s.card}>
      <Typography.LARGE variant="large" className={s.title}>
        Personal Information
      </Typography.LARGE>
      <div className={s.photoContainer}>
        <div>
          <img src={avatar} alt={'avatar'} />
          <button className={s.editAvatarButton} onClick={handleAvatarChanged}>
            <Camera />
          </button>
        </div>
      </div>
      <div className={s.nameWithEditButton}>
        <Typography.H1 variant="h1" className={s.name}>
          {name}
        </Typography.H1>
        <button className={s.editNameButton} onClick={handleNameChanged}>
          <Edit />
        </button>
      </div>
      <Typography.Body2 variant="body2" className={s.email}>
        {email}
      </Typography.Body2>
      <div className={s.buttonContainer}>
        <Button variant={'secondary'} onClick={handleLogout}>
          <LogoutIcon />
          Sign Out
        </Button>
      </div>
    </Card>
  )
}
