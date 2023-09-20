import className from './components/ui/typography/typography.module.scss'

// eslint-disable-next-line import/no-unresolved
import { Typography } from '@/components/ui/typography/typography'

export function App() {
  return (
    <div>
      <Typography.Link2 className={className.link2}>Hi</Typography.Link2>
    </div>
  )
}
