import { useState } from 'react'

import s from './edit-profile.module.scss'

import Edit from '@/assets/icons/components/edit/edit'
import { LogoutIcon } from '@/assets/icons/components/logout/logout-icon'
import { InputTypeFile } from '@/components/profile/input-type-file/input-type-file.tsx'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'

type Props = {
  email: string
  avatar: string
  name: string
  onLogout: () => void
  onHandleEditUserInfo: (newAvatar: FormData) => void
}

export const EditProfile = ({ avatar, email, name, onHandleEditUserInfo, onLogout }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [nameValue, setNameValue] = useState(name)

  const handleNameChanged = (file?: File) => {
    const formData = new FormData()

    formData.append('name', nameValue)
    file && formData.append('avatar', file)
    onHandleEditUserInfo(formData)

    setEditMode(false)
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
        <InputTypeFile avatar={avatar} onAvatarChange={newAvatar => handleNameChanged(newAvatar)} />
      </div>

      {editMode ? (
        <div>
          <TextField
            label={'Nickname'}
            value={nameValue}
            onChange={e => setNameValue(e.currentTarget.value)}
            autoFocus
            style={{ marginBottom: '1.7px' }}
          />
          <Button onClick={() => handleNameChanged()}>Save changes</Button>
        </div>
      ) : (
        <div>
          <div className={s.nameWithEditButton}>
            <Typography.H1 variant="h1" className={s.name}>
              {nameValue}
            </Typography.H1>
            <button className={s.editNameButton} onClick={() => setEditMode(true)}>
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
        </div>
      )}
    </Card>
  )
}
