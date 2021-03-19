import { createSelectorHook, useDispatch } from 'react-redux'
import { createStore } from 'redux'
import MemoryGame from './MemoryGameTypes'
import Avatars from '../Screens/Login/Avatars'

type MemoryGameStateType = {
  current_player: MemoryGame.PlayerType,
}

export type MemoryGameActionType =
  | { type: 'set_current_player', payload: MemoryGameStateType['current_player'] }

const initial_state: MemoryGameStateType = {
  current_player: {
    name: '',
    avatar: Avatars[0],
  },
}

type useMemoryGameDispatchType = () => (action: MemoryGameActionType) => void

export const useMemoryGameSelector = createSelectorHook<MemoryGameStateType, MemoryGameActionType>()

export const useMemoryGameDispatch: useMemoryGameDispatchType = useDispatch

const MemoryGameReducer = (state = initial_state, action: MemoryGameActionType) => {
  // Cria todos os sets
  if (action.type.includes('set_') && 'payload' in action) {
    const key = action.type.split('set_')[1]
    
    return { ...state, [key]: action.payload }
  }
  
  return state
}

export default MemoryGameReducer

export const MemoryGameStore = createStore(
  MemoryGameReducer,
)
