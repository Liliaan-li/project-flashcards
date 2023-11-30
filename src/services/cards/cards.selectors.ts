import { RootState } from '@/services/store.ts'

export const selectCardsSearch = (state: RootState) => state.cards.question
export const selectCardsSort = (state: RootState) => state.cards.sort
