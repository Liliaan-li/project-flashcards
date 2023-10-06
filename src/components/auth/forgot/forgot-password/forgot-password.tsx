import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './forgot-password.module.scss'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Enter email'),
})

type FormType = z.infer<typeof forgotPasswordSchema>

type ForgotPasswordProps = {
  onSubmit: (data: FormType) => void
}

export const ForgotPassword = ({ onSubmit }: ForgotPasswordProps) => {
  const { control, handleSubmit } = useForm<FormType>({
    mode: 'onSubmit',
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })
  const formOnSubmit = handleSubmit(onSubmit)

  const classNames = {
    card: s.card,
    title: s.title,
    input: s.input,
    instructions: s.instructions,
    button: s.button,
    rememberPassword: s.rememberPassword,
    buttonLink: s.buttonLink,
  }

  return (
    <div>
      <DevTool control={control} />
      <Card className={classNames.card}>
        <Typography.LARGE className={classNames.title}>Forgot your password?</Typography.LARGE>
        <form onSubmit={formOnSubmit}>
          <ControlledTextField
            placeholder="Email"
            name="email"
            control={control}
            label="Email"
            className={classNames.input}
          />
          <Typography.Body2 className={classNames.instructions}>
            Enter your email address and we will send you further instructions
          </Typography.Body2>
          <Button className={classNames.button} fullWidth type="submit">
            Send Instructions
          </Button>
        </form>
        <Typography.Body2 className={classNames.rememberPassword}>
          Did you remember your password?
        </Typography.Body2>
        <Typography.Link1 as="a" href="#" className={classNames.buttonLink}>
          Try logging in
        </Typography.Link1>
      </Card>
    </div>
  )
}
