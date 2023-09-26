import { ComponentProps, forwardRef, ReactNode, KeyboardEvent, useState } from 'react'

import { clsx } from 'clsx'

import s from './text-field.module.scss'

import { Typography } from '@/components/ui/typography/typography.tsx'
import { Close } from '@/icons/close/close-icon.tsx'
import { EyeClosed } from '@/icons/eye/eye-closed-icon.tsx'
import { Eye } from '@/icons/eye/eye-icon.tsx'
import { Search } from '@/icons/search/search-icon.tsx'

export type TextFieldProps = {
  value?: string
  label?: ReactNode
  errorMessage?: string
  iconEnd?: boolean
  iconSearch?: boolean
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
  disabled?: boolean
  onClearClick?: () => void
} & ComponentProps<'input'>

// НЕ УДАЛЯТЬ КОММЕНТ ПЕРЕД forwardRef - без него ломается tree shaking
export const TextField = /* @__PURE__ */ forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      onEnter,
      onKeyDown,
      className,
      errorMessage,
      iconEnd,
      iconSearch,
      onClearClick,
      disabled,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(!iconEnd)
    const handleClickShowPassword = () => setShowPassword(show => !show)

    const showError = !!errorMessage && errorMessage.length > 0

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (onEnter && e.key === 'Enter') {
        onEnter(e)
      }
      onKeyDown?.(e)
    }
    const classNames = {
      root: clsx(s.box, className),
      label: s.label,
      mainContainer: s.mainContainer,
      input: clsx(s.input, showError && s.error),
      iconStart: s.iconStart,
      iconEnd: s.iconEnd,
      inputContainer: s.inputContainer,
      clearButton: s.clearButton,
      disabled: s.disabled,
      activeInput: s.activeInput,
    }

    const isShowClearButton = onClearClick && rest?.value?.length! > 0

    const dataIconStart = iconSearch ? 'search' : ''
    const dataIconEnd = iconEnd ? 'end' : ''
    const dataIcon = dataIconStart + dataIconEnd

    return (
      <div className={classNames.root}>
        <div className={classNames.mainContainer}>
          {label && <div className={classNames.label}>{label}</div>}
          <div className={classNames.inputContainer}>
            {iconSearch && (
              <span className={classNames.iconStart}>
                <Search
                  size={23}
                  color={isShowClearButton ? 'var(--color-light-100)' : 'var(--color-dark-300)'}
                />
              </span>
            )}
            <input
              className={rest?.value?.length! > 0 ? classNames.activeInput : classNames.input}
              type={showPassword ? 'text' : 'password'}
              ref={ref}
              data-icon={dataIcon}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              {...rest}
            />
            {isShowClearButton && (
              <button className={classNames.clearButton} onClick={onClearClick} type="button">
                {<Close />}
              </button>
            )}
            {iconEnd && (
              <span className={classNames.iconEnd} onClick={handleClickShowPassword}>
                {showPassword ? (
                  <EyeClosed
                    color={disabled ? 'var(--color-dark-300)' : 'var(--color-light-100)'}
                  />
                ) : (
                  <Eye color={disabled ? 'var(--color-dark-300)' : 'var(--color-light-100)'} />
                )}
              </span>
            )}
          </div>

          {showError && <Typography.Error>{errorMessage}</Typography.Error>}
        </div>
      </div>
    )
  }
)
