import { FC, ReactNode } from 'react'

import * as DialogRadix from '@radix-ui/react-dialog'

import s from './modal.module.scss'

import { Close } from '@/assets/icons/components/close/close-icon.tsx'
import { Typography } from '@/components/ui/typography'

type ModalProps = {
  isOpen: boolean
  onChange: (open: boolean) => void
  title?: string
  description?: string
  variant?: 'default' | 'learn'
  children: ReactNode
}

export const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  onChange,
  description,
  title,
  variant = 'default',
}) => {
  const classNames = {
    root: s.root,
    overlay: s.overlay,
    content: s.content,
    title: s.title,
    description: s.description,
    close: s.close,
    upload: s.upload,
    learn: s.learn,
    border: s.border,
  }

  const showClass = variant === 'default'
  const classNameContent = [classNames.content]

  if (variant === 'learn') {
    classNameContent.push(classNames.learn)
  }

  return (
    <div className={classNames.root}>
      <DialogRadix.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
        <DialogRadix.Portal>
          <DialogRadix.Overlay className={classNames.overlay} />
          <DialogRadix.Content className={classNameContent.join(' ')}>
            <DialogRadix.Title className={classNames.title}>
              {showClass ? (
                <Typography.H2>{title}</Typography.H2>
              ) : (
                <Typography.LARGE>{title}</Typography.LARGE>
              )}
            </DialogRadix.Title>
            <DialogRadix.Close asChild>
              <button className={classNames.close}>{showClass && <Close size={24} />}</button>
            </DialogRadix.Close>
            <DialogRadix.Description>
              <Typography.Body1>{description}</Typography.Body1>
            </DialogRadix.Description>
            <div>{children}</div>
          </DialogRadix.Content>
        </DialogRadix.Portal>
      </DialogRadix.Root>
    </div>
  )
}
