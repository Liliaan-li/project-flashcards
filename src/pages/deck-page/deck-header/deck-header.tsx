import { FC, useState } from 'react'

import { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

import s from './deck-header.module.scss'

import { CardForm } from '@/components/cards/add-card/card-form.tsx'
import { DeckDropdown } from '@/components/deck/deck-dropdown/deck-dropdown.tsx'
import { DecksEdit } from '@/components/deck/deck-edit/decks-edit.tsx'
import { DeleteDeck } from '@/components/deck/delete-deck/delete-deck.tsx'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { selectCardsSearch } from '@/services/cards/cards.selectors.ts'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { Deck, DecksResponse, useDeleteDeckMutation, useUpdateDeckMutation } from '@/services/decks'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'
import { errorToast, successToast } from '@/utils/toasts/toasts.ts'

type DeckHeaderProps = {
  isOwner: boolean
  deckData: Deck
  decksData: DecksResponse | undefined
  onSubmitCreate: (data: FormData) => void
  setShowCreateModal: (show: boolean) => void
  showCreateModal: boolean
  isEmptyCard: boolean
  refetch: () => void
}

const options = [
  { value: 'Text', label: 'Text' },
  { value: 'Picture', label: 'Picture' },
]

export const DeckHeader: FC<DeckHeaderProps> = ({
  deckData,
  decksData,
  isOwner,
  isEmptyCard,
  onSubmitCreate,
  setShowCreateModal,
  showCreateModal,
  refetch,
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [deckEditId, setDeckEditId] = useState<null | string>(null)
  const [deckDeleteId, setDeckDeleteId] = useState<null | string>(null)

  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const search = useAppSelector(selectCardsSearch)

  const setSearch = (search: string) => dispatch(cardsSlice.actions.setSearch(search))

  const deckToEdit = decksData?.items?.find(deck => deck.id === deckEditId)
  const showEditModal = !!deckEditId
  const showDeleteModal = !!deckDeleteId

  const onConfirmDelete = () => {
    deleteDeck({ id: deckDeleteId ?? '' })
      .unwrap()
      .then(() => successToast(`Pack was successfully deleted`))
      .catch(error => errorToast(error.data.message))

    setDeckDeleteId(null)

    navigate('/')
  }

  const onConfirmEdit = (data: { name: string }) => {
    updateDeck({ id: deckData.id, ...data })
      .unwrap()
      .then(() => {
        successToast(`Deck info was successfully changed`)
        refetch()
      })
      .catch(error => errorToast(error.data.message))

    setDeckEditId(null)
  }

  return (
    <div>
      <DecksEdit
        title="Edit Pack"
        defaultValues={deckToEdit}
        onConfirm={onConfirmEdit}
        key={deckEditId}
        onOpenChange={() => setDeckEditId(null)}
        open={showEditModal}
      />
      <DeleteDeck
        name={deckData.id ?? ''}
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
      <Toaster />
    </div>
  )
}
