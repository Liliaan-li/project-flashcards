import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as LabelRadix from '@radix-ui/react-label'
import * as RadixSelect from '@radix-ui/react-select'
import { clsx } from 'clsx'

import { Typography } from '../typography'

import s from './select.module.scss'

import { ArrowDown } from '@/assets/icons/components/arrow/arrow-down-icon.tsx'

type Option = { label: string; value: string }

export type SelectProps = {
  options: Option[]
  placeholder?: string
  label?: string
  className?: string
  errorMessage?: string
  disabled?: boolean
} & ComponentPropsWithoutRef<typeof RadixSelect.Root>

export const Select = forwardRef<ElementRef<typeof RadixSelect.Root>, SelectProps>(
  ({ value, onValueChange, options, label, className, errorMessage, disabled, ...rest }, ref) => {
    const showError = !!errorMessage && errorMessage.length > 0
    const classNames = {
      root: s.root,
      trigger: clsx(s.trigger, showError && s.error, className),
      viewport: s.viewport,
      content: s.content,
      icon: s.icon,
      value: s.value,
      item: s.item,
      label: s.label,
    }

    return (
      <LabelRadix.Root {...rest}>
        {label && <div className={classNames.label}>{label}</div>}
        <>{showError && <Typography.Error>{errorMessage}</Typography.Error>}</>
        <div className={classNames.root}>
          <RadixSelect.Root value={value} onValueChange={onValueChange} disabled={disabled}>
            <RadixSelect.Trigger className={classNames.trigger}>
              <RadixSelect.Value className={classNames.value}>{value}</RadixSelect.Value>
              <RadixSelect.Icon className={classNames.icon}>
                <ArrowDown />
              </RadixSelect.Icon>
            </RadixSelect.Trigger>
            <RadixSelect.Portal>
              <RadixSelect.Content
                position="popper"
                className={classNames.content}
                collisionPadding={0}
                sideOffset={0}
                ref={ref}
              >
                <RadixSelect.ScrollUpButton />
                <RadixSelect.Viewport className={classNames.viewport}>
                  {options.map(option => {
                    return (
                      <RadixSelect.Item
                        value={option.value as string}
                        key={option.value}
                        className={classNames.item}
                      >
                        {option.label}
                      </RadixSelect.Item>
                    )
                  })}
                </RadixSelect.Viewport>
                <RadixSelect.ScrollDownButton />
              </RadixSelect.Content>
            </RadixSelect.Portal>
          </RadixSelect.Root>
        </div>
      </LabelRadix.Root>
    )
  }
)
