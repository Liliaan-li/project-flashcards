import s from './delete-deck.module.scss'

import { Button } from '@/components/ui/button'
import { Modal, ModalProps } from '@/components/ui/modal'

export type DialogProps = ModalProps & {
  onCancel?: () => void
  onConfirm?: () => void
}

type Props = Pick<DialogProps, 'onCancel' | 'onConfirm' | 'onOpenChange' | 'open'> & {
  name: string
  text: string
  deleteText: string
}
export const DeleteDeck = ({
  name,
  onConfirm,
  onCancel,
  text,
  deleteText,
  ...dialogProps
}: Props) => {
  const cancel = () => {
    onCancel?.()
  }

  return (
    <Modal {...dialogProps} title="Delete Deck">
      <div className={s.content}>
        <p>
          {text} <span>{name}</span>?
        </p>
        <p>All cards will be deleted.</p>
      </div>
      <div className={s.buttons}>
        <Button onClick={cancel} variant="secondary">
          Cancel
        </Button>
        <Button onClick={onConfirm}>{deleteText}</Button>
      </div>
    </Modal>
  )
}
