import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Tab } from '@/services/decks/decks.types.ts'

export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
    minCards: 0,
    maxCards: undefined as number | undefined,
    currentTab: 'all' as Tab,
  },
  reducers: {
    setCurrentTab: (state, action: PayloadAction<Tab>) => {
      state.currentTab = action.payload
    },
    setMinCards: (state, action: PayloadAction<number>) => {
      state.minCards = action.payload
    },
    setMaxCards: (state, action: PayloadAction<number>) => {
      state.maxCards = action.payload
    },
    resetFilters: state => {
      state.currentTab = 'all'
      state.minCards = 0
      state.maxCards = undefined
    },
  },
})
