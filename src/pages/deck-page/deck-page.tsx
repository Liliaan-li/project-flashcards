import { useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import s from './deck-page.module.scss'

import { ArrowLeftBack } from '@/assets/icons/components/arrow/arrow-left-back.tsx'
import { CardsTable } from '@/components/cards/cards-table/cards-table.tsx'
import { DeckAddCard } from '@/components/deck/deck-add-card/deck-add-card.tsx'
import { DeleteDeck } from '@/components/deck/delete-deck/delete-deck.tsx'
import { Header } from '@/components/ui/header'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { useDebounce } from '@/hooks/use-debounce/use-debounce.ts'
import { DeckHeader } from '@/pages/deck-page/deck-header/deck-header.tsx'
import { useMeQuery } from '@/services/auth/auth.service.ts'
import { selectCardsSearch, selectCardsSort } from '@/services/cards/cards.selectors.ts'
import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useGetDeckQuery,
} from '@/services/cards/cards.service.ts'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { Sort } from '@/services/cards/cards.types.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'
import { createSort } from '@/utils/create-sort/create-sort.ts'

export const DeckPage = () => {
  const dispatch = useAppDispatch()
  const { id = '' } = useParams<{ id: string }>()

  const [cardDeleteId, setCardDeleteId] = useState<null | string>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const search = useDebounce(useAppSelector(selectCardsSearch))
  const sort = useAppSelector(selectCardsSort)

  const orderBy = useDebounce(createSort(sort))

  const onChangeSort = (sortParam: Sort) => dispatch(cardsSlice.actions.setSort({ sortParam }))

  const [createCard] = useCreateCardMutation()
  const { data: deckData } = useGetDeckQuery({ id: id || '' })
  const [deleteCard] = useDeleteCardMutation()
  const { data } = useMeQuery()
  const { data: cardsData, isLoading } = useGetCardsQuery({
    id,
    params: { question: search, orderBy },
  })

  const isOwner = data?.id === deckData?.userId
  const isEmptyCard = deckData && deckData.cardsCount > 0

  const showDeleteModal = !!cardDeleteId
  const cardDelete = cardsData?.items?.find(card => card.id === cardDeleteId)?.deckId

  const onSubmitCreate = (body: FormData) => {
    createCard({ id, body })
  }

  const onSubmitDelete = () => {
    deleteCard({ cardId: cardDeleteId ?? '', deckId: id })
    setCardDeleteId(null)
  }

  if (isLoading) {
    return <div>Loading...</div>
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
        {isEmptyCard && (
          <>
            <DeckHeader
              setShowCreateModal={setShowCreateModal}
              showCreateModal={showCreateModal}
              deckData={deckData || []}
              isOwner={isOwner}
              isEmptyCard={isEmptyCard!}
              onSubmitCreate={onSubmitCreate}
            />
            <CardsTable
              cards={cardsData?.items}
              isOwner={isOwner}
              sort={sort}
              onChangeSort={onChangeSort}
              onDeleteClick={setCardDeleteId}
              openEditModal={() => setShowEditModal(true)}
              setShowEditModal={setShowEditModal}
              showEditModal={showEditModal}
            />
          </>
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
    </>
  )
}
