import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Sort } from '@/services/cards/cards.types.ts'

const initialState = {
  question: '',
  sort: null as Sort,
  pageSize: 10,
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
  },
})
