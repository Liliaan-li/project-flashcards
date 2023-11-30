import { useState } from 'react'

import ShowMoreText from 'react-show-more-text'

import s from './cards-table.module.scss'

import { DeleteOutlined } from '@/assets/icons/components/DeleteForever/DeleteOutlined.tsx'
import Edit from '@/assets/icons/components/edit/edit.tsx'
import { CardForm } from '@/components/cards/add-card/card-form.tsx'
import { CardsSort, Column } from '@/components/cards/cards-sort/cards-sort.tsx'
import { Rating } from '@/components/ui/rating'
import { Table } from '@/components/ui/table'
import { useUpdateCardMutation } from '@/services/cards/cards.service.ts'
import { Card, Sort } from '@/services/cards/cards.types.ts'

type Props = {
  cards: Card[] | undefined
  isOwner: boolean
  sort: Sort
  onChangeSort: (value: Sort) => void
  onDeleteClick: (id: string) => void
  openEditModal: () => void
  showEditModal: boolean
  setShowEditModal: (show: boolean) => void
}

export const cardsColumn: Column[] = [
  {
    key: 'question',
    title: 'Question',
    sortable: true,
    className: s.question,
  },
  {
    key: 'answer',
    title: 'Answer',
    sortable: true,
    className: s.answer,
  },
  {
    key: 'updated',
    title: 'Last Updated',
    sortable: true,
    className: s.lastUpdated,
  },
  {
    key: 'grade',
    title: 'Grade',
    sortable: true,
    className: s.grade,
  },
  {
    key: 'icons',
    title: '',
  },
]

const options = [
  { value: 'Text', label: 'Text' },
  { value: 'Picture', label: 'Picture' },
]

export const getCardsHeaderColumns = (isOwner: boolean) => {
  if (isOwner) return cardsColumn

  return cardsColumn.slice(0, cardsColumn.length - 1)
}

export const CardsTable = ({
  cards,
  isOwner,
  onChangeSort,
  sort,
  onDeleteClick,
  openEditModal,
  setShowEditModal,
  showEditModal,
}: Props) => {
  const [showButton, setShowButton] = useState(true)

  const [updateCard] = useUpdateCardMutation()

  const onSubmit = (body: FormData, id: string) => {
    updateCard({ cardId: id ?? '', body, deckId: id })
  }

  return (
    <div className={s.root}>
      <CardsSort columns={getCardsHeaderColumns(isOwner)} sort={sort} onSort={onChangeSort} />
      <Table.Body>
        {cards?.map(card => (
          <Table.Row key={card.id}>
            <Table.Cell>
              <div className={s.nameCell}>
                {card.questionImg && (
                  <img alt="Card Question" src={card.questionImg || ''} className={s.deckImage} />
                )}
                <p>{card.question}</p>
              </div>
            </Table.Cell>
            <Table.Cell>
              <ShowMoreText
                lines={1}
                more="Show more"
                less="...Show less"
                onClick={() => setShowButton(!showButton)}
                width={-1}
                anchorClass={s.showText}
              >
                <div>
                  {card.answerImg && (
                    <img alt="Card Answer" src={card.answerImg || ''} className={s.deckImage} />
                  )}
                  <p>{card.answer}</p>
                </div>
              </ShowMoreText>
            </Table.Cell>
            <Table.Cell>{new Date(card.updated).toLocaleString()}</Table.Cell>
            <Table.Cell>
              <Rating rating={card.grade} size={25} />
            </Table.Cell>
            {isOwner && (
              <Table.Cell>
                <div className={s.tools}>
                  <Edit onClick={openEditModal} />
                  <CardForm
                    options={options}
                    onSubmit={body => onSubmit(body, card.id)}
                    onCancel={() => setShowEditModal(false)}
                    onOpenChange={setShowEditModal}
                    open={showEditModal}
                    buttonText="Save Changes"
                    title="Edit Card"
                  />
                  <DeleteOutlined size={16} onClick={() => onDeleteClick(card.id)} />
                </div>
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </div>
  )
}
