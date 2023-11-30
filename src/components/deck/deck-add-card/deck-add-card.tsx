import { FC } from 'react'

import s from './deck-add-card.module.scss'

import { CardForm } from '@/components/cards/add-card/card-form.tsx'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'

type DeckAddCardProps = {
  isOwner: boolean
  isEmptyCard: boolean | undefined
  showCreateModal: boolean
  setShowCreateModal: (show: boolean) => void
  onSubmitCreate: (data: FormData) => void
}

const options = [
  { value: 'Text', label: 'Text' },
  { value: 'Picture', label: 'Picture' },
]

export const DeckAddCard: FC<DeckAddCardProps> = ({
  isEmptyCard,
  isOwner,
  onSubmitCreate,
  setShowCreateModal,
  showCreateModal,
}) => {
  return (
    <>
      {isOwner && !isEmptyCard && (
        <div className={s.newCard}>
          <Table.Empty />
          <div className={s.button}>
            <Button onClick={() => setShowCreateModal(true)}>
              <Typography.Subtitle2>Add New Card</Typography.Subtitle2>
            </Button>
            <CardForm
              options={options}
              onSubmit={onSubmitCreate}
              onCancel={() => setShowCreateModal(false)}
              onOpenChange={setShowCreateModal}
              open={showCreateModal}
              buttonText="Add New Card"
              title="Add New Card"
            />
          </div>
        </div>
      )}
    </>
  )
}
