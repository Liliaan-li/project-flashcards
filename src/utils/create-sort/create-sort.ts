import { Sort } from '@/services/cards/cards.types.ts'

export const createSort = (sort: Sort | undefined) => {
  if (sort) {
    return `${sort.key}-${sort.direction}`
  }
}
