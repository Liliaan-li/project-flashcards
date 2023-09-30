import s from './check-email.module.scss'

import { EmailIcon } from '@/assets/icons/components/email/email-icon.tsx'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

type CheckEmailProps = {
  email: string
}

export const CheckEmail = ({ email }: CheckEmailProps) => {
  const classNames = {
    card: s.card,
    title: s.title,
    icon: s.icon,
    instructions: s.instructions,
  }

  return (
    <Card className={classNames.card}>
      <Typography.LARGE className={classNames.title}>Check Email</Typography.LARGE>
      <div className={classNames.icon}>
        <EmailIcon size={96} />
      </div>
      <Typography.Body2 className={classNames.instructions}>
        We’ve sent an Email with instructions to {email}
      </Typography.Body2>
      <Button fullWidth as="a" href="#" className={s.buuton}>
        Back to Sign In
      </Button>
    </Card>
  )
}
