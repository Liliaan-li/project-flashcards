import { useForm } from 'react-hook-form'

import s from './grade-learn-card.module.scss'

import { ControlledRadio } from '@/components/controlled'
import { Button } from '@/components/ui/button'

export type GradeLearnCardValues = {
  grade: string
}

type Props = {
  onSubmit: (data: GradeLearnCardValues) => void
}

export const gradeOptions = [
  { label: 'Did not know', value: '1' },
  { label: 'Forgot', value: '2' },
  { label: 'A lot of thought', value: '3' },
  { label: 'Confused', value: '4' },
  { label: 'Knew the answer', value: '5' },
]

export const GradeLearnCard = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<GradeLearnCardValues>({
    defaultValues: { grade: '1' },
  })

  return (
    <form className={s.root} onSubmit={handleSubmit(onSubmit)}>
      <ControlledRadio
        className={s.radioGroup}
        control={control}
        name="grade"
        options={gradeOptions}
      />
      <Button type="submit">Next Question</Button>
    </form>
  )
}
