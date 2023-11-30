import { RootState } from '@/services/store.ts'
import { createSort } from '@/utils/create-sort/create-sort.ts'

export const updateQuery = (state: RootState) => {
  const { question, sort } = state.cards

  const sorted = createSort(sort)

  return {
    question,
    orderBy: sorted,
  }
}
