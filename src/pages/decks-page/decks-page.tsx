import { useState } from 'react'

import s from './decks-page.module.scss'

import DeleteForever from '@/assets/icons/components/DeleteForever/DeleteForever.tsx'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tab-switcher'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'
import { Tab, useGetDecksQuery } from '@/services/decks'
import {
  selectDecksCurrentTab,
  selectDecksMaxCards,
  selectDecksMinCards,
} from '@/services/decks/decks.selectors.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

export const DecksPage = () => {
  const dispatch = useAppDispatch()

  const minCards = useAppSelector(selectDecksMinCards)
  const maxCards = useAppSelector(selectDecksMaxCards)
  const currentTab = useAppSelector(selectDecksCurrentTab)

  const [rangeValue, setRangeValue] = useState([minCards, maxCards])

  const setMinCards = (minCards: number) => dispatch(decksSlice.actions.setMinCards(minCards))
  const setMaxCards = (maxCards: number) => dispatch(decksSlice.actions.setMaxCards(maxCards))
  const setCurrentTab = (tab: Tab) => dispatch(decksSlice.actions.setCurrentTab(tab))

  const resetFilters = () => {
    dispatch(decksSlice.actions.resetFilters())
    setRangeValue([0, decks?.maxCardsCount || undefined])
  }

  const handleSliderCommitted = (value: number[]) => {
    setMinCards(value[0])
    setMaxCards(value[1])
  }
  const currentUserId = '7bc6df13-ef78-4eed-bced-3423a36b0009'
  const authorId = currentTab === 'my' ? currentUserId : undefined

  const { data: decks } = useGetDecksQuery({
    authorId,
    maxCardsCount: maxCards,
    minCardsCount: minCards,
  })

  if (!decks) {
    return <div>loading...</div>
  }

  return (
    <div className={s.container}>
      <div className={s.root}>
        <div className={s.head}>
          <Typography.LARGE>Packs list</Typography.LARGE>
          <Button>Add new deck</Button>
        </div>
        <div className={s.filters}>
          <div className={s.textField}>
            <TextField placeholder="Search" iconSearch={true} value="" />
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
      </div>
    </div>
  )
}
