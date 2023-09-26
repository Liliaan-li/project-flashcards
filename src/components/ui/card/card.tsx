import { ComponentProps, FC, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

type CardProps = {
  children: ReactNode
} & ComponentProps<'div'>
export const Card: FC<CardProps> = ({ children, className, ...rest }) => {
  const classNames = {
    box: clsx(s.box, className),
    content: s.content,
  }

  return (
    <div className={classNames.box} {...rest}>
      <div className={classNames.content}>{children}</div>
    </div>
  )
}
