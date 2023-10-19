import { ComponentProps, ElementType, FC, JSXElementConstructor, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './typography.module.scss'

export type PropsOf<T extends ReactTag> = T extends ElementType
  ? Omit<ComponentProps<T>, 'ref'>
  : never
export type ReactTag = keyof JSX.IntrinsicElements | JSXElementConstructor<any>

export type TypographyProps<Ttag extends ReactTag> = {
  children: ReactNode
  component?: Ttag
  className?: string
} & PropsOf<Ttag>

const createTypographyComponent = <T extends ReactTag>(
  basicClassName: Component
): FC<TypographyProps<T>> => {
  return ({ children, color, component, className, style, ...rest }) => {
    const Component = component || COMPONENTS[basicClassName] || 'span'

    const classNames = clsx(s[basicClassName], className)

    return (
      <Component className={classNames} style={style} {...rest}>
        {children}
      </Component>
    )
  }
}

export const Typography = {
  LARGE: createTypographyComponent('large'),
  H1: createTypographyComponent('h1'),
  H2: createTypographyComponent('h2'),
  H3: createTypographyComponent('h3'),
  Subtitle1: createTypographyComponent('subtitle1'),
  Subtitle2: createTypographyComponent('subtitle2'),
  Body1: createTypographyComponent('body1'),
  Body2: createTypographyComponent('body2'),
  Overline: createTypographyComponent('overline'),
  Caption: createTypographyComponent('caption'),
  Link1: createTypographyComponent('link1'),
  Link2: createTypographyComponent('link2'),
  Error: createTypographyComponent('error'),
}

const COMPONENTS = {
  large: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  subtitle1: 'p',
  subtitle2: 'p',
  body1: 'p',
  body2: 'p',
  overline: 'p',
  caption: 'p',
  error: 'span',
  link1: 'a',
  link2: 'a',
} as const

type Component = keyof typeof COMPONENTS
