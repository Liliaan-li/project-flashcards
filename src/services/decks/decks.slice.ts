import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Tab } from '@/services/decks/decks.types.ts'

export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
    minCards: 0,
    maxCards: undefined as number | undefined,
    currentTab: 'all' as Tab,
    searchByName: '',
    currentPage: 1,
    page: 7,
  },
  reducers: {
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setPageElementsCount: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
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
