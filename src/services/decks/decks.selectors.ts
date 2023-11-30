import { RootState } from '@/services/store.ts'

export const selectDecksCurrentTab = (state: RootState) => state.decks.currentTab

export const selectDecksItemsPerPage = (state: RootState) => state.decks.page

export const selectDecksCurrentPage = (state: RootState) => state.decks.currentPage

export const selectDecksMinCards = (state: RootState) => state.decks.minCards

export const selectDecksMaxCards = (state: RootState) => state.decks.maxCards

export const selectDecksSearch = (state: RootState) => state.decks.search
