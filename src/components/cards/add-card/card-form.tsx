import { FC, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './card-form.module.scss'

import { ImageCover } from '@/assets/icons/components/image-cover/image-cover.tsx'
import { UploadImage } from '@/components/cards/add-card/upload-image/upload-image.tsx'
import { ControlledTextField } from '@/components/controlled'
import { ControlledSelect } from '@/components/controlled/controlled-select/controlled-select.tsx'
import { Button } from '@/components/ui/button'
import { Modal, ModalProps } from '@/components/ui/modal'
import { Option } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { CardValues } from '@/services/cards/cards.types.ts'

export type DialogProps = ModalProps & {
  onCancel?: () => void
}

type Props = Pick<DialogProps, 'onCancel' | 'onOpenChange' | 'open'> & {
  options: Option[]
  cardValues?: CardValues
  onSubmit: (data: FormData) => void
  buttonText: string
  title: string
  error?: FetchBaseQueryError | SerializedError | undefined
}

export const CardForm: FC<Props> = ({
  options,
  onCancel,
  buttonText,
  cardValues,
  onSubmit,
  title,
  error,
  ...dialogProps
}) => {
  const [questionImage, setQuestionImage] = useState<File | null>(null)
  const [answerImage, setAnswerImage] = useState<File | null>(null)
  const [questionCoverError, setQuestionCoverError] = useState<null | string>(null)
  const [answerCoverError, setAnswerCoverError] = useState<null | string>(null)

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useCardForm({
    answer: cardValues?.answer || '',
    question: cardValues?.question || '',
  })

  const questionFormat = watch('questionFormat')
  const questionError = errors.question?.message

  const answerFormat = watch('answerFormat')
  const answerError = errors.answer?.message

  if (questionError && questionFormat === 'Picture') {
    setValue('questionFormat', 'Text')
  }
  if (answerError && answerFormat === 'Picture') {
    setValue('answerFormat', 'Text')
  }

  const questionImageUrl = questionImage
    ? URL.createObjectURL(questionImage)
    : cardValues?.questionImg

  const answerImageUrl = answerImage ? URL.createObjectURL(answerImage) : cardValues?.questionImg

  const onSubmitHandler = handleSubmit((data: FormValues) => {
    const formData = new FormData()

    formData.append('question', data.question)
    formData.append('answer', data.answer)

    if (questionImage) {
      formData.append('questionImg', questionImage || '')
    }
    if (answerImage) {
      formData.append('answerImg', answerImage || '')
    }

    onSubmit(formData)

    onCancel?.()
  })

  const onLoadQuestionCover = (data: File) => {
    setQuestionImage(data)
    setQuestionCoverError(questionCoverError)
  }

  const onLoadAnswerCover = (data: File) => {
    setAnswerImage(data)
    setAnswerCoverError(answerCoverError)
  }

  const cancel = () => {
    onCancel?.()
  }

  return (
    <Modal {...dialogProps} title={title} className={s.modal}>
      <form className={s.content} onSubmit={onSubmitHandler}>
        <ControlledSelect
          options={options}
          control={control}
          name={'questionFormat' || 'answerFormat'}
          label="Choose an question format"
        />

        <ControlledTextField control={control} label="Question" name="question" />
        {questionFormat === 'Picture' && (
          <>
            {questionImageUrl && (
              <div className={s.image}>
                <img src={questionImageUrl} alt="Card cover" />
              </div>
            )}
            <UploadImage onLoadCover={onLoadQuestionCover}>
              <Button className={s.uploadButton} variant="secondary" type="button">
                <ImageCover size={16} />
                <Typography.Subtitle2>Add Cover</Typography.Subtitle2>
              </Button>
            </UploadImage>
          </>
        )}
        <ControlledTextField control={control} label="Answer" name="answer" />
        {questionFormat === 'Picture' && (
          <>
            {answerImageUrl && (
              <div className={s.image}>
                <img src={answerImageUrl} alt="Card cover" />
              </div>
            )}
            <UploadImage onLoadCover={onLoadAnswerCover}>
              <Button className={s.uploadButton} variant="secondary" type="button">
                <ImageCover size={16} />
                <Typography.Subtitle2>Add Cover</Typography.Subtitle2>
              </Button>
            </UploadImage>
          </>
        )}
        <div className={s.button}>
          <Button variant="secondary" onClick={cancel}>
            Cancel
          </Button>
          <Button type="submit">{buttonText}</Button>
        </div>
      </form>
    </Modal>
  )
}

const newCardSchema = z.object({
  questionFormat: z.string().trim().optional(),
  answerFormat: z.string().trim().optional(),
  question: z.string().min(3, 'Name must be longer than or equal to 3 characters').trim(),
  answer: z.string().min(3, 'Name must be longer than or equal to 3 characters').trim(),
})

export type FormValues = z.infer<typeof newCardSchema>

type DefaultCardValueType = Omit<FormValues, 'questionFormat' | 'answerFormat'>

export const useCardForm = (defaultValues: DefaultCardValueType) => {
  return useForm<FormValues>({
    resolver: zodResolver(newCardSchema),
    defaultValues: {
      questionFormat: 'Text',
      answerFormat: 'Text',
      question: defaultValues.question,
      answer: defaultValues.answer,
    },
  })
}
