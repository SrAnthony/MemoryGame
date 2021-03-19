import { createSelectorHook, useDispatch } from 'react-redux'
import { createStore } from 'redux'
import { Animals } from '../Screens/Login/Avatars'
import MemoryGame from './MemoryGameTypes'

type MemoryGameStateType = {
  current_player: MemoryGame.PlayerType,
}

export type MemoryGameActionType =
  | { type: 'set_current_player', payload: MemoryGameStateType['current_player'] }

const initial_state: MemoryGameStateType = {
  current_player: {
    name: '',
    // Quando abre o aplicativo (e não está logado) carrega um animal aleatorio
    avatar: Animals[Math.floor(Math.random() * Animals.length)],
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

export const MemoryGameStore = createStore(
  MemoryGameReducer,
)
