import { RootState } from '@/services/store.ts'

export const selectDecksCurrentTab = (state: RootState) => state.decks.currentTab

export const selectDecksMinCards = (state: RootState) => state.decks.minCards

export const selectDecksMaxCards = (state: RootState) => state.decks.maxCards