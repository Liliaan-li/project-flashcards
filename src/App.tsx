import { useState } from 'react'

import { Checkbox } from './components/ui/checkbox/checkbox'
import className from './components/ui/typography/typography.module.scss'

// eslint-disable-next-line import/no-unresolved
import { Typography } from '@/components/ui/typography/typography'

export function App() {
  const [bool, setBool] = useState<boolean>(false)

  function onChange(checked: boolean): void {
    setBool(checked)
  }

  return (
    <div>
      <Typography.Link2 className={className.link2}>Hi</Typography.Link2>
      <Checkbox checked={bool} onChange={onChange} />
    </div>
  )
}
