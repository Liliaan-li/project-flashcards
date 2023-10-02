import { HTMLProps } from 'react'

import clsx from 'clsx'

import s from './pagination.module.scss'

export type PageLinkProps = HTMLProps<HTMLAnchorElement> & { active?: boolean }

export const PagePagination = ({
  className,
  active,
  disabled,
  children,
  ...rest
}: PageLinkProps) => {
  const classNames = clsx(s.item, className, {
    active,
    disabled,
  })

  if (disabled) {
    return <span className={classNames}>{children}</span>
  }

  return (
    <a className={classNames} aria-current={active ? 'page' : undefined} {...rest}>
      {children}
    </a>
  )
}
