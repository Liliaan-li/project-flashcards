import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, forwardRef } from 'react'

import s from './button.module.scss'

type ButtonProps<T extends ElementType = ElementType> = {
  as?: T
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  fullWidth?: boolean
  className?: string
} & ComponentPropsWithoutRef<T>

type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref']

export const Button = forwardRef(
  <T extends ElementType = 'button'>(
    { as, variant = 'primary', fullWidth, className, ...rest }: ButtonProps<T>,
    ref?: PolymorphicRef<T>
  ) => {
    const Component = as || 'button'

    return (
      <Component
        className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
        ref={ref}
        {...rest}
      />
    )
  }
)
