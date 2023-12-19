import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Sort } from '@/services/cards/cards.types.ts'

const initialState = {
  question: '',
  sort: null as Sort,
  currentPage: 1,
  page: 7,
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.question = action.payload
    },
    setSort: (state, action: PayloadAction<{ sortParam: Sort }>) => {
      state.sort = action.payload.sortParam
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setPageElementsCount: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
  },
})
