import { Link, useNavigate } from 'react-router-dom'

import s from './header.module.scss'

import { Logo } from '@/assets/icons/components/logo/Logo.tsx'
import { LogoutIcon } from '@/assets/icons/components/logout/logout-icon.tsx'
import { Person } from '@/assets/icons/components/person/person.tsx'
import { Avatar } from '@/components/ui/avatar/avatar.tsx'
import { Button } from '@/components/ui/button'
import { Dropdown, ToolbarItem, ToolbarItemWithIcon } from '@/components/ui/dropdown/dropdown.tsx'
import { Typography } from '@/components/ui/typography/typography.tsx'

type HeaderProps = {
  isAuth: boolean
  userInfo?: {
    name: string
    avatar?: string
    email: string
  } | null
  onSignOut?: () => void
}
export const Header = ({ isAuth, userInfo, onSignOut }: HeaderProps) => {
  // const navigate = useNavigate()

  return (
    <div className={s.header}>
      <div className={s.container}>
        <div className={s.logo}>
          <Typography.Link1 href={'#'}>
            <Logo />
          </Typography.Link1>
        </div>
        <div>
          {isAuth && (
            <Dropdown
              trigger={
                <button className={s.userMenuTrigger}>
                  <Typography.Subtitle1 className={s.userName}>
                    {userInfo?.name}
                  </Typography.Subtitle1>
                  <Avatar src={userInfo?.avatar} name={userInfo?.name} />
                </button>
              }
            >
              <ToolbarItem onSelect={() => {}} className={s.userInfo}>
                <div className={s.userInfoContainer}>
                  <Avatar src={userInfo?.avatar} />
                  <div className={s.userDetails}>
                    <Typography.Subtitle2>{userInfo?.name}</Typography.Subtitle2>
                    <Typography.Caption style={{ color: 'var(--color-dark-100)' }}>
                      {userInfo?.email}
                    </Typography.Caption>
                  </div>
                </div>
              </ToolbarItem>
              <ToolbarItemWithIcon
                icon={<Person color={'var(--color-light-100)'} />}
                text="My Profile"
                onSelect={() => {}}
                className={s.profile}
              />
              <ToolbarItemWithIcon
                icon={<LogoutIcon />}
                text="Sign out"
                onSelect={() => {}}
                className={s.signOut}
              />
            </Dropdown>
          )}
          {!isAuth && <Button variant="primary">Sign In</Button>}
        </div>
      </div>
    </div>
  )
}