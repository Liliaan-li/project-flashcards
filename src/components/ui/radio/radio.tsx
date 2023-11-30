import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadioRadix from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './radio.module.scss'

import { Typography } from '@/components/ui/typography'

type Option = {
  label: string
  value: string
}

type RadioProp = {
  options: Option[]
  errorMessage?: string
  className?: string
  disabled?: boolean
}

export type RadioProps = RadioProp & ComponentPropsWithoutRef<typeof RadioRadix.Root>

export const Radio = forwardRef<ElementRef<typeof RadioRadix.Root>, RadioProps>((props, ref) => {
  const { options, errorMessage, disabled, className, ...rest } = props
  const classNames = {
    root: clsx(s.root, className),
    item: clsx(s.option, className),
  }

  return (
    <RadioRadix.Root className={classNames.root} ref={ref} disabled={disabled} {...rest}>
      {options.map(option => (
        <div className={s.label} key={option.value}>
          <RadioRadix.Item value={option.value} className={classNames.item}>
            <div className={s.icon}></div>
          </RadioRadix.Item>
          <Typography.Body2 htmlFor={option.value}>{option.label}</Typography.Body2>
        </div>
      ))}
    </RadioRadix.Root>
  )
})
