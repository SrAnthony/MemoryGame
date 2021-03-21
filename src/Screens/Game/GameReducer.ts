import { CardType } from './Cards'
import CardFlip from 'react-native-card-flip'

type GameStateType = {
  flipped_cards: CardType[],
  playing_cards: CardType[],
  rounds: number,
  is_waiting: boolean,
}

export type GameActionType =
  | { type: 'play_card', payload: { card: CardType, cardRef: CardFlip | null } }
  | { type: 'stop_waiting' }

export const initial_state: GameStateType = {
  flipped_cards: [],
  playing_cards: [],
  rounds: 0,
  is_waiting: false,
}

const playCard = (state: GameStateType, {
  card,
  cardRef,
}: { card: CardType, cardRef: CardFlip | null }): GameStateType => {
  if (state.is_waiting) return state
  
  cardRef?.flip()
  
  // Se é a primeira carta de uma nova jogada, então apenas vira ela
  if (state.playing_cards.length === 0) {
    return { ...state, playing_cards: [card], rounds: state.rounds + 1 }
  }
  
  // Se é a segunda carta selecionada e ela é igual a primeira, então deixa elas viradas e pula para a próxima jogada
  if (card.name === state.playing_cards[0].name) {
    return {
      ...state,
      flipped_cards: [...state.flipped_cards, ...state.playing_cards, card],
      playing_cards: [],
      rounds: state.rounds + 1,
    }
  }
  
  return {
    ...state,
    is_waiting: true,
    playing_cards: [...state.playing_cards, card],
    rounds: state.rounds + 1,
  }
}

export const GameReducer = (state = initial_state, action: GameActionType) => {
  switch (action.type) {
    case 'play_card':
      return playCard(state, action.payload)
    case 'stop_waiting':
      return { ...state, is_waiting: false, playing_cards: [] }
    default:
      return state
  }
}
