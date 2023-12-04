import { ChangeEvent, useRef, useState } from 'react'

import { defaultAva } from '@/assets/avatar/defaultAva.ts'
import Edit from '@/assets/icons/components/edit/edit.tsx'
import s from '@/components/profile/edit-profile/edit-profile.module.scss'

type InputTypeFilePropsType = {
  avatar: string
  onAvatarChange: (newAvatar: File) => void
}

export const InputTypeFile = ({ avatar, onAvatarChange }: InputTypeFilePropsType) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }
  const [isAvaBroken, setIsAvaBroken] = useState(false)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        onAvatarChange(file)
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  const errorHandler = () => {
    setIsAvaBroken(true)
    alert('Кривая картинка')
  }

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
      <img
        src={isAvaBroken ? defaultAva : avatar}
        style={{ width: '100px' }}
        onError={errorHandler}
        alt="ava"
      />
      <button
        className={s.editNameButton}
        style={{
          backgroundColor: '#4C4C4C',
          borderRadius: '4px',
          padding: '3px',
          position: 'absolute',
          right: '-4px',
        }}
        onClick={selectFileHandler}
      >
        <Edit />
      </button>
      <input style={{ display: 'none' }} ref={inputRef} type="file" onChange={uploadHandler} />
    </div>
  )
}
