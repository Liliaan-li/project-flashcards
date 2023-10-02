import { useForm } from 'react-hook-form'

import { ControlledCheckbox } from './components/ui/controlled/conrolled-checkbox/controlled-checkbox'
import { Typography } from './components/ui/typography/typography'
import className from './components/ui/typography/typography.module.scss'
import { LogoutIcon } from './assets/icons/components/logout/logout-icon'

export function App() {
  const { control } = useForm()

  return (
    <div>
      <Typography.Link2 className={className.link2}>Hi</Typography.Link2>
      <ControlledCheckbox
        control={control}
        name={'rememberMe'}
        onChange={function (checked: boolean): void {
          throw new Error('Function not implemented.')
        }}
      />
    </div>
  )
}
