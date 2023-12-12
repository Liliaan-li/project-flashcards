import { useState } from 'react'

import { CircleLoader } from 'react-spinners'

import s from './decks-page.module.scss'

import { DecksEdit } from '@/components/deck/deck-edit/decks-edit.tsx'
import { DeleteDeck } from '@/components/deck/delete-deck/delete-deck.tsx'
import { DecksPanel } from '@/components/decks/decks-panel/decks-panel.tsx'
import { Pagination } from '@/components/ui/pagination/pagination.tsx'
import { useDebounce } from '@/hooks/use-debounce/use-debounce.ts'
import TableForDecksPage from '@/pages/decks-page/Table/table-for-decks-page.tsx'
import { useMeQuery } from '@/services/auth/auth.service.ts'
import { useDeleteDeckMutation, useGetDecksQuery, useUpdateDeckMutation } from '@/services/decks'
import {
  selectDecksCurrentPage,
  selectDecksCurrentTab,
  selectDecksItemsPerPage,
  selectDecksMaxCards,
  selectDecksMinCards,
  selectDecksSearch,
} from '@/services/decks/decks.selectors.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'
import { errorToast, successToast } from '@/utils/toasts/toasts.ts'

export const DecksPage = () => {
  const dispatch = useAppDispatch()

  const { data: user } = useMeQuery()

  const minCards = useAppSelector(selectDecksMinCards)
  const maxCards = useAppSelector(selectDecksMaxCards)
  const currentTab = useAppSelector(selectDecksCurrentTab)
  const itemsPerPage = useAppSelector(selectDecksItemsPerPage)
  const currentPage = useAppSelector(selectDecksCurrentPage)
  const search = useAppSelector(selectDecksSearch)

  const [deckToDeleteId, setDeckToDeleteId] = useState<null | string>(null)
  const [deckToEditId, setDeckToEditId] = useState<null | string>(null)

  const searchWithDebounce = useDebounce(search)

  const setCurrentPage = (page: number) => {
    dispatch(decksSlice.actions.setCurrentPage(page))
  }
  const setPageElementsCount = (page: number) =>
    dispatch(decksSlice.actions.setPageElementsCount(page))

  const currentUserId = user?.id
  const authorId = currentTab === 'my' ? currentUserId : undefined
  const showDeleteModal = !!deckToDeleteId
  const showEditModal = !!deckToEditId

  const { data: decks } = useGetDecksQuery({
    authorId,
    maxCardsCount: maxCards,
    minCardsCount: minCards,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    name: searchWithDebounce,
  })
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  const deckToDeleteName = decks?.items?.find(deck => deck.id === deckToDeleteId)?.name
  const deckToEdit = decks?.items?.find(deck => deck.id === deckToEditId)

  const onConfirmDelete = () => {
    deleteDeck({ id: deckToDeleteId ?? '' })
      .unwrap()
      .then(() => successToast(`Pack was successfully deleted`))
      .catch(error => errorToast(error.data.message))
    setDeckToDeleteId(null)
  }

  const onConfirmEdit = (data: any) => {
    if (!deckToEditId) {
      return
    }

    updateDeck({ id: deckToEditId, ...data })
      .unwrap()
      .then(() => successToast(`Deck info was successfully changed`))
      .catch(error => errorToast(error.data.message))
  }

  if (!decks) {
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
        }}
      >
        <CircleLoader color="var(--color-accent-300)" size={100} />
      </div>
    )
  }

  return (
    <div className={s.container}>
      <DeleteDeck
        name={deckToDeleteName ?? ''}
        onCancel={() => setDeckToDeleteId(null)}
        onConfirm={onConfirmDelete}
        onOpenChange={() => setDeckToDeleteId(null)}
        open={showDeleteModal}
        text="Do you really want to remove"
        deleteText="Delete Pack"
      />
      <DecksEdit
        defaultValues={deckToEdit}
        key={deckToEditId}
        onConfirm={onConfirmEdit}
        onOpenChange={() => setDeckToEditId(null)}
        open={showEditModal}
      />
      <div className={s.root}>
        <DecksPanel
          decks={decks}
          currentTab={currentTab}
          maxCards={maxCards}
          minCards={minCards}
          search={search}
        />

        <TableForDecksPage
          decks={decks}
          currentUserId={currentUserId}
          onDeleteClick={setDeckToDeleteId}
          onEditClick={setDeckToEditId}
        />

        <div className={s.paginationContainer}>
          <Pagination
            page={itemsPerPage}
            pageChange={itemPage => {
              setPageElementsCount(itemPage)
            }}
            currentPage={decks.pagination.currentPage}
            lastPage={decks.pagination.totalPages}
            maxLength={7}
            setCurrentPage={page => {
              setCurrentPage(page)
            }}
            options={[5, 7, 10, 12]}
          />
        </div>
      </div>
    </div>
  )
}
