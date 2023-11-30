import { Deck, Pagination } from '@/services/decks'

export type Card = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg?: string | null
  answerImg?: string | null
  created: string
  updated: string
  shots: number
  grade: number
  userId: string
}

export type ShuffleCardRequest = {
  id: string
  previousCardId?: string
}

export type CardResponse = Omit<Card, 'userId'>

export type CardsResponse = {
  pagination: Pagination
  items: Card[]
}

export type GetDeckResponseType = Omit<Deck, 'author'>

export type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

export type CardsParams = {
  question?: string
  answer?: string
  orderBy?: string
}

export type CardValues = {
  answer: string
  question: string
  answerImg: string
  questionImg: string
}

export type CardGradeRequest = {
  deckId: string
  cardId: string
  grade: number
}

export type DeleteCard = {
  cardId: string
  deckId: string
}
