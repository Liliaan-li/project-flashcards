import { useState } from 'react'

import { Toaster } from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'
import { BarLoader } from 'react-spinners'

import s from './deck-page.module.scss'

import { ArrowLeftBack } from '@/assets/icons/components/arrow/arrow-left-back.tsx'
import { CardsTable } from '@/components/cards/cards-table/cards-table.tsx'
import { DeckAddCard } from '@/components/deck/deck-add-card/deck-add-card.tsx'
import { DeleteDeck } from '@/components/deck/delete-deck/delete-deck.tsx'
import { Header } from '@/components/ui/header'
import { Pagination } from '@/components/ui/pagination/pagination.tsx'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { useDebounce } from '@/hooks/use-debounce/use-debounce.ts'
import { DeckHeader } from '@/pages/deck-page/deck-header/deck-header.tsx'
import { useMeQuery } from '@/services/auth/auth.service.ts'
import {
  selectCardsCurrentPage,
  selectCardsItemsPerPage,
  selectCardsSearch,
  selectCardsSort,
} from '@/services/cards/cards.selectors.ts'
import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useGetDeckQuery,
} from '@/services/cards/cards.service.ts'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { Sort } from '@/services/cards/cards.types.ts'
import { useGetDecksQuery } from '@/services/decks'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'
import { createSort } from '@/utils/create-sort/create-sort.ts'
import { errorToast, successToast } from '@/utils/toasts/toasts.ts'

export const DeckPage = () => {
  const dispatch = useAppDispatch()
  const { id = '' } = useParams<{ id: string }>()

  const [cardDeleteId, setCardDeleteId] = useState<null | string>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const search = useDebounce(useAppSelector(selectCardsSearch))
  const sort = useAppSelector(selectCardsSort)
  const currentPage = useAppSelector(selectCardsCurrentPage)
  const itemsPerPage = useAppSelector(selectCardsItemsPerPage)
  const orderBy = useDebounce(createSort(sort))

  const onChangeSort = (sortParam: Sort) => dispatch(cardsSlice.actions.setSort({ sortParam }))
  const setCurrentPage = (page: number) => dispatch(cardsSlice.actions.setCurrentPage(page))
  const setPageElementsCount = (page: number) =>
    dispatch(cardsSlice.actions.setPageElementsCount(page))

  const [createCard] = useCreateCardMutation()
  const { data: deckData, refetch } = useGetDeckQuery({ id: id || '' })
  const { data: decks } = useGetDecksQuery()
  const [deleteCard] = useDeleteCardMutation()
  const { data } = useMeQuery()
  const {
    data: cardsData,
    isLoading,
    refetch: refetchCards,
  } = useGetCardsQuery({
    id,
    params: { question: search, orderBy, currentPage: currentPage, itemsPerPage: itemsPerPage },
  })

  const isOwner = data?.id === deckData?.userId
  const isEmptyCard = deckData && deckData.cardsCount > 0

  const showDeleteModal = !!cardDeleteId
  const cardDelete = cardsData?.items?.find(card => card.id === cardDeleteId)?.deckId
  const isSearchResultsEmpty = cardsData?.items.length === 0

  const onSubmitCreate = (body: FormData) => {
    createCard({ id, body })
      .unwrap()
      .then(() => {
        successToast(`Card was successfully created`)
        refetch()
      })
      .catch(error => errorToast(error.data.errorMessages[0].message))
  }

  const onSubmitDelete = () => {
    deleteCard({ cardId: cardDeleteId ?? '', deckId: id })
      .unwrap()
      .then(() => {
        successToast(`Card was successfully deleted`)
        refetch()
      })
      .catch(error => errorToast(error.data.errorMessages[0].message))
    setCardDeleteId(null)
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
      {isLoading && (
        <div>
          <BarLoader color="var(--color-accent-300)" width={'100%'} />
        </div>
      )}
      <div className={s.container}>
        <DeleteDeck
          name={cardDelete ?? ''}
          onCancel={() => setCardDeleteId(null)}
          onConfirm={onSubmitDelete}
          onOpenChange={() => setCardDeleteId(null)}
          open={showDeleteModal}
          text="Do you really want to remove Card Name? All cards will be deleted."
          deleteText="Delete Card"
        />
        <div className={s.back}>
          <Link to="/">
            <Typography.Body1>
              <span>
                <ArrowLeftBack size={25} />
              </span>
              Back to Packs List
            </Typography.Body1>
          </Link>
        </div>
        {deckData && (
          <DeckHeader
            setShowCreateModal={setShowCreateModal}
            showCreateModal={showCreateModal}
            deckData={deckData || []}
            isOwner={isOwner}
            isEmptyCard={isEmptyCard!}
            onSubmitCreate={onSubmitCreate}
            decksData={decks}
            refetch={refetch}
          />
        )}
        {isSearchResultsEmpty && isEmptyCard && (
          <div className={s.typography}>
            <Typography.Body1>Card Not Detected</Typography.Body1>
          </div>
        )}
        {isEmptyCard && !isSearchResultsEmpty && (
          <>
            <CardsTable
              cards={cardsData?.items}
              isOwner={isOwner}
              sort={sort}
              onChangeSort={onChangeSort}
              onDeleteClick={setCardDeleteId}
              openEditModal={() => setShowEditModal(true)}
              setShowEditModal={setShowEditModal}
              showEditModal={showEditModal}
              refetch={refetchCards}
            />
          </>
        )}
        {cardsData && isEmptyCard && !isSearchResultsEmpty && (
          <div className={s.pagination}>
            <Pagination
              currentPage={cardsData.pagination.currentPage}
              lastPage={cardsData.pagination.totalPages}
              maxLength={7}
              setCurrentPage={page => {
                setCurrentPage(page)
              }}
              page={itemsPerPage}
              options={[5, 7, 10, 12]}
              pageChange={itemPage => {
                setPageElementsCount(itemPage)
              }}
            />
          </div>
        )}
        <DeckAddCard
          onSubmitCreate={onSubmitCreate}
          isEmptyCard={isEmptyCard}
          isOwner={isOwner}
          showCreateModal={showCreateModal}
          setShowCreateModal={setShowCreateModal}
        />
        {!isOwner && !isEmptyCard && !isLoading && <Table.Empty />}
      </div>
      <Toaster />
    </>
  )
}
