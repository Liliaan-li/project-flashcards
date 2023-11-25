import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { omit } from 'remeda'
import { z } from 'zod'

import { Button } from '../../../ui/button'

import { ControlledTextField } from '@/components/controlled/text-field-with-control.tsx'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import className from '@/components/ui/typography/typography.module.scss'

const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 character'),
    passwordConfirmation: z.string().min(8, 'Password must be at least 8 character'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        message: 'Passwords do not match',
        code: z.ZodIssueCode.custom,
        path: ['passwordConfirmation'],
      })
    }

    return data
  })

type FormValues = z.infer<typeof loginSchema>

type SignUpProps = {
  onSubmit: (data: Omit<FormValues, 'passwordConfirmation'>) => void
}

export const SignUp = ({ onSubmit }: SignUpProps) => {
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const formOnSubmit = handleSubmit(data => onSubmit(omit(data, ['passwordConfirmation'])))

  return (
    <Card>
      <Typography.LARGE className={className.large} style={{ textAlign: 'center' }}>
        Sign Up
      </Typography.LARGE>
      <form onSubmit={formOnSubmit}>
        <ControlledTextField
          name={'email'}
          control={control}
          label={'Email'}
          errorMessage={errors.email?.message}
          defaultValue={''}
        />
        <ControlledTextField
          name={'password'}
          control={control}
          label={'Password'}
          errorMessage={errors.password?.message}
          iconEnd
        />
        <ControlledTextField
          name={'passwordConfirmation'}
          control={control}
          label={'Confirm password'}
          errorMessage={errors.password?.message}
          iconEnd
        />
        <Button type="submit" style={{ marginTop: '55px' }}>
          Sign up
        </Button>
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
        Already have an account?
      </Typography.Body2>
      <Button variant="link" as={'a'} onClick={() => navigate('/login')}>
        Sign In
      </Button>
    </Card>
  )
}
