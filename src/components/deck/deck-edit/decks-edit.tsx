import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './deck-edit.module.scss'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Modal, ModalProps } from '@/components/ui/modal'

const newDeckSchema = z.object({
  isPrivate: z.boolean(),
  name: z.string().min(3).max(50),
})

type FormValues = z.infer<typeof newDeckSchema>

export type DialogProps = ModalProps & {
  onCancel?: () => void
}

type Props = Pick<DialogProps, 'onCancel' | 'onOpenChange' | 'open'> & {
  defaultValues?: any
  onConfirm: (data: FormValues) => void
}

export const DecksEdit = ({ defaultValues, onCancel, onConfirm, ...dialogProps }: Props) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(newDeckSchema),
  })
  const onSubmit = handleSubmit(data => {
    onConfirm(data)
    dialogProps.onOpenChange?.(false)
    reset()
  })

  const handleCancel = () => {
    reset()
    onCancel?.()
  }

  return (
    <Modal {...dialogProps} title="Edit Card">
      <form className={s.content} onSubmit={onSubmit}>
        <ControlledTextField control={control} label="Choose a question format" name="name" />
      </form>
      <div className={s.button}>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>Save Changes</Button>
      </div>
    </Modal>
  )
}
