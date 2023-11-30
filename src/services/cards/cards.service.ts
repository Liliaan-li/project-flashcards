import { baseApi } from '@/services/base-api.ts'
import {
  Card,
  CardGradeRequest,
  CardResponse,
  CardsParams,
  CardsResponse,
  CardValues,
  DeleteCard,
  GetDeckResponseType,
  ShuffleCardRequest,
} from '@/services/cards/cards.types.ts'
import { DeckResponse } from '@/services/decks'
import { RootState } from '@/services/store.ts'
import { convertFormDataToBlob } from '@/utils/convert-form-data-to-blob/convert-form-data-to-blob.ts'
import { convertFormDataToString } from '@/utils/convert-form-data-to-string/convert-form-data-to-string.ts'
import { updateQuery } from '@/utils/update-query/update-query.ts'

export const CardsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCards: builder.query<CardsResponse, { id: string; params: CardsParams }>({
      query: ({ id, params }) => ({
        url: `v1/decks/${id}/cards`,
        method: 'GET',
        params: params,
      }),

      providesTags: ['Cards'],
    }),

    createCard: builder.mutation<Card, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `v1/decks/${id}/cards`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cards'],
    }),

    updateCard: builder.mutation<Card, { cardId: string; deckId: string; body: FormData }>({
      query: ({ cardId, body }) => ({
        url: `cards/${cardId}`,
        method: 'PATCH',
        body,
      }),
      async onQueryStarted({ cardId, deckId, body }, { dispatch, getState, queryFulfilled }) {
        const state = getState() as RootState

        let questionImage = ''
        let answerImage = ''

        const patchResult = dispatch(
          CardsService.util.updateQueryData(
            'getCards',
            {
              id: deckId,
              params: updateQuery(state),
            },
            draft => {
              const index = draft.items.findIndex(card => card.id === cardId)

              if (index !== -1) {
                const question = convertFormDataToString(body.get('question'))
                const answer = convertFormDataToString(body.get('answer'))

                const updatedCard: Partial<CardValues> = {
                  question,
                  answer,
                }

                const questionImgBlob = convertFormDataToBlob(body, 'questionImg')
                const answerImgBlob = convertFormDataToBlob(body, 'answerImg')

                if (questionImgBlob) {
                  questionImage = URL.createObjectURL(questionImgBlob)
                  updatedCard.questionImg = questionImage
                }
                if (answerImgBlob) {
                  answerImage = URL.createObjectURL(answerImgBlob)
                  updatedCard.answerImg = answerImage
                }

                draft.items[index] = { ...draft.items[index], ...updatedCard }
              }
            }
          )
        )

        try {
          await queryFulfilled
        } catch (e) {
          patchResult.undo()
        }
      },
    }),

    deleteCard: builder.mutation<void, DeleteCard>({
      query: ({ cardId }) => ({
        url: `v1/cards/${cardId}`,
        method: 'DELETE',
      }),

      async onQueryStarted({ cardId, deckId }, { dispatch, getState, queryFulfilled }) {
        const state = getState() as RootState
        const deleteResult = dispatch(
          CardsService.util.updateQueryData(
            'getCards',
            {
              id: deckId,
              params: updateQuery(state),
            },
            draft => {
              const index = draft.items.findIndex(card => card.id === cardId)

              if (index !== -1) {
                draft.items = draft.items.filter((_, cardIndex) => cardIndex !== index)
              }
            }
          )
        )

        try {
          await queryFulfilled
        } catch (e) {
          deleteResult.undo()
        }
      },
      invalidatesTags: ['Cards'],
    }),

    getDeck: builder.query<DeckResponse, { id: string }>({
      query: ({ id }) => `v1/decks/${id}`,
    }),

    getShuffleCard: builder.query<CardResponse & { name?: string }, ShuffleCardRequest>({
      queryFn: async (arg, _api, _extraOptions, fetchWithBQ) => {
        const deckResponse = await fetchWithBQ(`v1/decks/${arg.id}`)

        const cardsResponse = await fetchWithBQ({
          url: `v1/decks/${arg.id}/learn`,
          method: 'GET',
          params: { previousCardId: arg.previousCardId },
        })

        const deckData = deckResponse.data as GetDeckResponseType
        const cardData = cardsResponse.data as CardResponse

        return { data: { ...cardData, name: deckData.name } }
      },
    }),

    gradeCard: builder.mutation<CardResponse, CardGradeRequest>({
      query: ({ deckId, ...rest }) => ({
        url: `v1/decks/${deckId}/learn`,
        method: 'POST',
        body: rest,
      }),
      async onQueryStarted({ deckId }, { dispatch, queryFulfilled }) {
        const { data: newCard } = await queryFulfilled

        dispatch(
          CardsService.util.updateQueryData('getShuffleCard', { id: deckId }, () => {
            return newCard
          })
        )
      },
      invalidatesTags: ['Cards'],
    }),
  }),
})

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useGetDeckQuery,
  useGetShuffleCardQuery,
  useUpdateCardMutation,
  useGradeCardMutation,
} = CardsService
