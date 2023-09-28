import { ComponentPropsWithoutRef, forwardRef, ReactNode, useState, ChangeEvent } from 'react'

import { clsx } from 'clsx'

import s from './text-field.module.scss'

import { Close } from '@/assets/icons/components/close/close-icon.tsx'
import { EyeClosed } from '@/assets/icons/components/eye/eye-closed-icon.tsx'
import { Eye } from '@/assets/icons/components/eye/eye-icon.tsx'
import { Search } from '@/assets/icons/components/search/search-icon.tsx'
import { Typography } from '@/components/ui/typography/typography.tsx'

export type TextFieldProps = {
  value: string
  label?: ReactNode
  errorMessage?: string
  iconEnd?: boolean
  iconSearch?: boolean
  onChangeValue?: (value: string) => void
  disabled?: boolean
  onClearClick?: () => void
} & ComponentPropsWithoutRef<'input'>

// НЕ УДАЛЯТЬ КОММЕНТ ПЕРЕД forwardRef - без него ломается tree shaking
export const TextField = /* @__PURE__ */ forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      onChangeValue,
      onChange,
      className,
      errorMessage,
      iconEnd,
      iconSearch,
      onClearClick,
      disabled,
      value,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(!iconEnd)
    const handleClickShowPassword = () => setShowPassword(show => !show)

    const showError = !!errorMessage && errorMessage.length > 0

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onChangeValue?.(e.target.value)
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

    const isShowClearButton = onClearClick && value?.length! > 0

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
              className={value?.length! > 0 ? classNames.activeInput : classNames.input}
              type={showPassword ? 'text' : 'password'}
              ref={ref}
              data-icon={dataIcon}
              onChange={handleChange}
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
