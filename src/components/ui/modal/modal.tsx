import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import * as DialogRadix from '@radix-ui/react-dialog'

import s from './modal.module.scss'

import { Close } from '@/assets/icons/components/close/close-icon.tsx'
import { Typography } from '@/components/ui/typography'

export type ModalProps = {
  children: ReactNode
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
} & Omit<ComponentPropsWithoutRef<typeof DialogRadix.Dialog>, 'onOpenChange' | 'open'>

export const Modal: FC<ModalProps> = ({ children, title, ...props }) => {
  const classNames = {
    overlay: s.overlay,
    content: s.content,
    header: s.header,
    close: s.close,
  }

  return (
    <DialogRadix.Root {...props}>
      <DialogRadix.Portal>
        <DialogRadix.Overlay className={classNames.overlay} />
        <DialogRadix.Content className={classNames.content}>
          <div className={classNames.header}>
            <DialogRadix.Title asChild>
              <Typography.H2>{title}</Typography.H2>
            </DialogRadix.Title>
            <DialogRadix.Close className={classNames.close}>
              <Close />
            </DialogRadix.Close>
          </div>
          {children}
        </DialogRadix.Content>
      </DialogRadix.Portal>
    </DialogRadix.Root>
  )
}
