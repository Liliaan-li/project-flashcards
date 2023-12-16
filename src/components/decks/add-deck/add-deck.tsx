import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './add-deck.module.scss'

import { ImageCover } from '@/assets/icons/components/image-cover/image-cover.tsx'
import { UploadImage } from '@/components/cards/add-card/upload-image/upload-image.tsx'
import { ControlledTextField } from '@/components/controlled'
import { ControlledCheckbox } from '@/components/controlled/conrolled-checkbox'
import { Button } from '@/components/ui/button'
import { Modal, ModalProps } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'

export type DialogProps = ModalProps & {
  onCancel?: () => void
}

type Props = Pick<DialogProps, 'onCancel' | 'onOpenChange' | 'open'> & {
  onSubmit: (data: FormData) => void
  name?: string
  isPrivate?: boolean
  image?: string | null
}

export const AddDeck = ({ onCancel, onSubmit, name, isPrivate, image, ...dialogProps }: Props) => {
  const { control, handleSubmit, reset } = useDeckForm({
    name: name || '',
    isPrivate: isPrivate || false,
  })

  const [cover, setCover] = useState<File | null>(null)

  const imageUrl = cover ? URL.createObjectURL(cover) : image

  const onSubmitHandler = handleSubmit((data: FormValues) => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('isPrivate', `${data.isPrivate}`)
    cover && formData.append('cover', cover)

    onSubmit(formData)

    dialogProps.onOpenChange?.(false)

    reset()
  })

  const handleCancel = () => {
    reset()
    onCancel?.()
  }

  const onLoadCover = (data: File) => {
    setCover(data)
  }

  return (
    <Modal {...dialogProps} title="Add New Pack" className={s.modal}>
      <form className={s.content} onSubmit={onSubmitHandler}>
        {imageUrl && (
          <div className={s.image}>
            <img src={imageUrl} alt="Pack cover" />
          </div>
        )}
        <UploadImage className={s.uploader} onLoadCover={onLoadCover}>
          <Button type="button" variant="secondary">
            <ImageCover />
            <Typography.Subtitle2>Cover</Typography.Subtitle2>
          </Button>
        </UploadImage>
        <ControlledTextField control={control} label="Name Pack" name="name" />
        <ControlledCheckbox
          onChange={() => {}}
          control={control}
          label="Private pack"
          name="isPrivate"
        />
        <div className={s.button}>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">Add New Pack</Button>
        </div>
      </form>
    </Modal>
  )
}

const newDeckSchema = z.object({
  name: z.string(),
  isPrivate: z.boolean().default(false),
})

type FormValues = z.infer<typeof newDeckSchema>

export const useDeckForm = (defaultValues: FormValues) => {
  return useForm<FormValues>({
    resolver: zodResolver(newDeckSchema),
    defaultValues,
  })
}
