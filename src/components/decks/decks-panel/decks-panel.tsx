import { FC, useState } from 'react'

import { Toaster } from 'react-hot-toast'

import s from './decks-panel.module.scss'

import DeleteForever from '@/assets/icons/components/DeleteForever/DeleteForever.tsx'
import { AddDeck } from '@/components/decks/add-deck/add-deck.tsx'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tab-switcher'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'
import { DecksResponse, Tab, useCreateDeckMutation } from '@/services/decks'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch } from '@/services/store.ts'
import { errorToast, successToast } from '@/utils/toasts/toasts.ts'

type DecksPanelProps = {
  decks: DecksResponse
  minCards: number
  maxCards: number | undefined
  currentTab: string
  search: string
}

export const DecksPanel: FC<DecksPanelProps> = ({
  decks,
  currentTab,
  search,
  maxCards,
  minCards,
}) => {
  const dispatch = useAppDispatch()

  const [createDeck] = useCreateDeckMutation()

  const [rangeValue, setRangeValue] = useState([minCards, maxCards])
  const [showCreateModal, setShowCreateModal] = useState(false)

  const setMinCards = (minCards: number) => dispatch(decksSlice.actions.setMinCards(minCards))
  const setMaxCards = (maxCards: number) => dispatch(decksSlice.actions.setMaxCards(maxCards))
  const setCurrentTab = (tab: Tab) => dispatch(decksSlice.actions.setCurrentTab(tab))
  const setSearch = (search: string) => dispatch(decksSlice.actions.setSearch(search))

  const resetFilters = () => {
    dispatch(decksSlice.actions.resetFilters())
    setRangeValue([0, decks?.maxCardsCount || undefined])
  }

  const handleSliderCommitted = (value: number[]) => {
    setMinCards(value[0])
    setMaxCards(value[1])
  }

  const openCreateModal = () => setShowCreateModal(true)

  const onSubmitCreate = (data: FormData) => {
    createDeck(data)
      .unwrap()
      .then(res => successToast(`Pack ${JSON.stringify(res.name)} was successfully created`))
      .catch(error => errorToast(error.data.message))
  }

  return (
    <div>
      <div className={s.head}>
        <Typography.LARGE>Packs list</Typography.LARGE>
        <Button onClick={openCreateModal}>Add New Pack</Button>
        <AddDeck
          onCancel={() => setShowCreateModal(false)}
          onSubmit={onSubmitCreate}
          onOpenChange={setShowCreateModal}
          open={showCreateModal}
        />
      </div>
      <div className={s.filters}>
        <div className={s.textField}>
          <TextField onChangeValue={setSearch} placeholder="Search" iconSearch value={search} />
        </div>
        <div className={s.tabs}>
          <Typography.Body2>Show packs cards</Typography.Body2>
          <Tabs
            onValueChange={value => setCurrentTab(value as Tab)}
            value={currentTab}
            tabs={[
              { value: 'my', title: 'My Cards' },
              { value: 'all', title: 'All Cards' },
            ]}
          />
        </div>
        <div className={s.slider}>
          <Typography.Body2>Number of cards</Typography.Body2>
          <Slider
            max={decks?.maxCardsCount || 0}
            min={0}
            onValueChange={setRangeValue}
            onValueCommit={handleSliderCommitted}
            value={rangeValue as number[]}
          />
        </div>
        <div className={s.button}>
          <Button variant="secondary" onClick={resetFilters}>
            <DeleteForever />
            Clear filters
          </Button>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
