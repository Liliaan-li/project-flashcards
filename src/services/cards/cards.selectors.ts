import { RootState } from '@/services/store.ts'

export const selectCardsSearch = (state: RootState) => state.cards.question

export const selectCardsSort = (state: RootState) => state.cards.sort

export const selectCardsCurrentPage = (state: RootState) => state.cards.currentPage

export const selectCardsItemsPerPage = (state: RootState) => state.cards.page
