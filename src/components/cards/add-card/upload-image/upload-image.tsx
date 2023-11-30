import { ChangeEvent, ComponentPropsWithoutRef, ReactNode, useRef } from 'react'

import { clsx } from 'clsx'
import { z } from 'zod'

import s from './upload-image.module.scss'

import { Typography } from '@/components/ui/typography'

type Props = {
  children: ReactNode
  onLoadCover: (file: FormValuesUploadImageSchema) => void
} & ComponentPropsWithoutRef<'input'>

export const UploadImage = ({ children, className, onLoadCover, ...restProps }: Props) => {
  const ref = useRef<HTMLInputElement>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    try {
      uploadImageSchema.parse(file)
      if (file) {
        onLoadCover(file)
      }
    } catch (e) {
      console.error(e)
    }
  }
  const classNames = clsx(s.container, className)

  return (
    <Typography.Subtitle2 className={classNames} onClick={() => ref.current?.click()}>
      {children}
      <input ref={ref} className={s.input} type="file" onChange={onChange} {...restProps} />
    </Typography.Subtitle2>
  )
}

export const uploadImageSchema = z
  .instanceof(File)
  .refine(
    file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported.'
  )

export type FormValuesUploadImageSchema = z.infer<typeof uploadImageSchema>
