import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { ControlledTextField } from '@/components/controlled/text-field-with-control.tsx'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Typography } from '@/components/ui/typography'
import className from '@/components/ui/typography/typography.module.scss'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 character'),
  // rememberMe: z.boolean().default(false),
  rememberMe: z.literal(true, {
    errorMap: () => ({
      message: 'Please check the box',
    }),
  }),
})

type FormValues = z.infer<typeof loginSchema>

type SignInProps = {
  onSubmit: (data: FormValues) => void
}

export const SignIn = ({ onSubmit }: SignInProps) => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const formOnSubmit = handleSubmit(onSubmit)

  const {
    field: { value, onChange },
  } = useController({
    name: 'rememberMe',
    control,
  })

  return (
    <Card>
      <Typography.LARGE className={className.large} style={{ textAlign: 'center' }}>
        Sign In
      </Typography.LARGE>
      <form onSubmit={formOnSubmit}>
        <ControlledTextField
          name={'email'}
          control={control}
          label={'Email'}
          errorMessage={errors.email?.message}
        />
        <ControlledTextField
          name={'password'}
          control={control}
          label={'Password'}
          errorMessage={errors.password?.message}
          iconEnd
        />
        <Checkbox checked={value} onChange={onChange} label={'Remember Me'} />
        <Typography.Link1
          className={className.body2}
          style={{
            color: 'var(--color-light-900)',
            float: 'right',
            marginBottom: '66px',
          }}
          onClick={() => navigate('/password-recovery')}
        >
          Forgot password?
        </Typography.Link1>
        <Button type="submit">Sign in</Button>
      </form>
      <Typography.Body2
        className={className.body2}
        style={{
          color: 'var(--color-light-900)',
          textAlign: 'center',
          marginTop: '20px',
          marginBottom: '11px',
        }}
      >
        {`Don't have an account?`}
      </Typography.Body2>

      <Button variant="link" as={'a'} onClick={() => navigate('/sign-up')}>
        Sign Up
      </Button>
    </Card>
  )
}
