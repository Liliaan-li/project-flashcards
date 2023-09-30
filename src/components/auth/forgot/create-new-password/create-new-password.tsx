import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './create-new-password.module.scss'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

const createNewPasswordSchema = z.object({
  password: z.string().nonempty('Enter password'),
})

type FormType = z.infer<typeof createNewPasswordSchema>

type CreateNewPasswordProps = {
  onSubmit: (data: FormType) => void
}

export const CreateNewPassword = ({ onSubmit }: CreateNewPasswordProps) => {
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(createNewPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const formOnSubmit = handleSubmit(onSubmit)

  const classNames = {
    card: s.card,
    title: s.title,
    instructions: s.instructions,
  }

  return (
    <>
      <DevTool control={control} />
      <Card className={classNames.card}>
        <Typography.LARGE className={classNames.title}>Create new password</Typography.LARGE>
        <form onSubmit={formOnSubmit}>
          <ControlledTextField
            placeholder="Password"
            name="password"
            control={control}
            type="password"
            label="Password"
            iconEnd={true}
          />
          <Typography.Body2 className={classNames.instructions}>
            Create new password and we will send you further instructions to email
          </Typography.Body2>
          <Button fullWidth type="submit">
            Create new password
          </Button>
        </form>
      </Card>
    </>
  )
}
