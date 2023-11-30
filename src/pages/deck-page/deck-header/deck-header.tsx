import { FC, useState } from 'react'

import { Link } from 'react-router-dom'

import s from './deck-header.module.scss'

import { CardForm } from '@/components/cards/add-card/card-form.tsx'
import { DeckDropdown } from '@/components/deck/deck-dropdown/deck-dropdown.tsx'
import { DecksEdit } from '@/components/deck/deck-edit/decks-edit.tsx'
import { DeleteDeck } from '@/components/deck/delete-deck/delete-deck.tsx'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { selectCardsSearch } from '@/services/cards/cards.selectors.ts'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { Deck, useDeleteDeckMutation, useUpdateDeckMutation } from '@/services/decks'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

type DeckHeaderProps = {
  isOwner: boolean
  deckData: Deck
  onSubmitCreate: (data: FormData) => void
  setShowCreateModal: (show: boolean) => void
  showCreateModal: boolean
  isEmptyCard: boolean
}

const options = [
  { value: 'Text', label: 'Text' },
  { value: 'Picture', label: 'Picture' },
]

export const DeckHeader: FC<DeckHeaderProps> = ({
  deckData,
  isOwner,
  isEmptyCard,
  onSubmitCreate,
  setShowCreateModal,
  showCreateModal,
}) => {
  const dispatch = useAppDispatch()

  const [deckEditId, setDeckEditId] = useState<null | string>(null)
  const [deckDeleteId, setDeckDeleteId] = useState<null | string>(null)

  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const search = useAppSelector(selectCardsSearch)

  const setSearch = (search: string) => dispatch(cardsSlice.actions.setSearch(search))

  const deckToDeleteName = deckData.id
  const deckToEdit = deckData.id === deckEditId
  const showEditModal = !!deckEditId
  const showDeleteModal = !!deckDeleteId

  const onConfirmDelete = () => {
    deleteDeck({ id: deckDeleteId ?? '' })
    setDeckDeleteId(null)
  }

  const onConfirmEdit = (data: any) => {
    updateDeck({ id: deckEditId, ...data })
    setDeckEditId(null)
  }

  return (
    <div>
      <DecksEdit
        defaultValues={deckToEdit}
        onConfirm={onConfirmEdit}
        onOpenChange={() => setDeckEditId(null)}
        open={showEditModal}
      />
      <DeleteDeck
        name={deckToDeleteName ?? ''}
        onCancel={() => setDeckDeleteId(null)}
        onConfirm={onConfirmDelete}
        onOpenChange={() => setDeckDeleteId(null)}
        open={showDeleteModal}
        text="Do you really want to remove"
        deleteText="Delete Pack"
      />
      <CardForm
        options={options}
        onSubmit={onSubmitCreate}
        onCancel={() => setShowCreateModal(false)}
        onOpenChange={setShowCreateModal}
        open={showCreateModal}
        buttonText="Add New Card"
        title="Add New Card"
      />
      <div className={s.header}>
        <div className={s.dropdown}>
          <DeckDropdown
            setDeckDeleteId={setDeckDeleteId}
            setDeckEditId={setDeckEditId}
            isOwner={isOwner}
            data={deckData}
            openCreateModal={() => setShowCreateModal(true)}
          />
        </div>
        {!isOwner && isEmptyCard && (
          <div className={s.button}>
            <Button as={Link} to={`/decks/${deckData.id}/learn`} variant="primary">
              Learn to Pack
            </Button>
          </div>
        )}
      </div>
      {deckData.cover && (
        <div className={s.image}>
          <img src={deckData.cover} alt="Cover Image" />
        </div>
      )}
      <div className={s.input}>
        <TextField onChangeValue={setSearch} placeholder="Search..." iconSearch value={search} />
      </div>
    </div>
  )
}
