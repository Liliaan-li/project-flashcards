import { CreateDeckArgsType, Deck, DecksResponse, GetDecksParams } from './decks.types.ts'

import { baseApi } from '@/services/base-api.ts'

export const DecksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, GetDecksParams | void>({
        query: params => {
          return {
            url: `v1/decks`,
            params: params ?? {},
          }
        },
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<Deck, CreateDeckArgsType>({
        query: body => ({
          url: `v1/decks`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Decks'],
      }),
    }
  },
})
export const { useGetDecksQuery, useCreateDeckMutation } = DecksService
