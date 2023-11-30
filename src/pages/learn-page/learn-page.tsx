import { FC, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import s from './learn-page.module.scss'

import { ArrowLeftBack } from '@/assets/icons/components/arrow/arrow-left-back.tsx'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/ui/header'
import { Typography } from '@/components/ui/typography'
import {
  GradeLearnCard,
  GradeLearnCardValues,
} from '@/pages/learn-page/grade-learn-card/grade-learn-card.tsx'
import { useMeQuery } from '@/services/auth/auth.service.ts'
import { useGetShuffleCardQuery, useGradeCardMutation } from '@/services/cards/cards.service.ts'

type Props = {
  to?: string
}

export const LearnPage: FC<Props> = ({ to }) => {
  const navigate = useNavigate()
  const params = useParams()

  const [isShowAnswer, setIsShowAnswer] = useState(false)

  const [gradeCard] = useGradeCardMutation()
  const id = params.id as string
  const { data: cardsData } = useGetShuffleCardQuery({ id })
  const { data } = useMeQuery()

  const onShowAnswer = () => {
    setIsShowAnswer(true)
  }

  const onSubmit = (data: GradeLearnCardValues) => {
    gradeCard({ deckId: id, cardId: cardsData!.id, grade: Number(data.grade) })
  }

  const onBack = () => {
    to ? navigate(to) : navigate(-1)
  }

  return (
    <>
      <Header
        isAuth
        userInfo={{
          name: data!.name,
          avatar: data!.avatar,
          email: data!.email,
        }}
      />
      <div className={s.back}>
        <Link onClick={onBack} to="">
          <Typography.Body1>
            <span>
              <ArrowLeftBack size={25} />
            </span>
            Back to Packs List
          </Typography.Body1>
        </Link>
      </div>
      <Card className={s.root}>
        <Typography.LARGE className={s.title}>Learn {cardsData?.name}</Typography.LARGE>
        <Typography.Body1 className={s.question}>
          <b>Question:</b> {cardsData?.question}
        </Typography.Body1>
        {cardsData?.questionImg && (
          <div className={s.imgWrapper}>
            <img src={cardsData.questionImg} alt="question" />
          </div>
        )}
        <Typography.Subtitle2 className={s.shots}>
          Количество попыток ответов на вопрос:<b> {cardsData?.shots}</b>
        </Typography.Subtitle2>

        {isShowAnswer ? (
          <>
            <Typography.Body1 className={s.answer}>
              <b>Answer:</b> {cardsData?.answer}
            </Typography.Body1>
            {cardsData?.answerImg && (
              <div className={s.imgWrapper}>
                <img src={cardsData.answerImg} alt="answer" />
              </div>
            )}
            <Typography.Subtitle1 className={s.grade}>Rate yourself:</Typography.Subtitle1>
            <GradeLearnCard onSubmit={onSubmit} />
          </>
        ) : (
          <div className={s.button}>
            <Button onClick={onShowAnswer}>Show Answer</Button>
          </div>
        )}
      </Card>
    </>
  )
}
