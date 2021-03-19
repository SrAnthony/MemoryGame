import { createDispatchHook, createSelectorHook } from 'react-redux'
import { createStore } from 'redux'
import { Animals } from '../Screens/Login/Avatars'
import { persistReducer, persistStore } from 'redux-persist'
import MemoryGame from './MemoryGameTypes'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

export const useMemoryGameSelector = createSelectorHook<MemoryGameStateType, MemoryGameActionType>()

export const useMemoryGameDispatch = createDispatchHook<MemoryGameStateType, MemoryGameActionType>()

const MemoryGameReducer = (state = initial_state, action: MemoryGameActionType) => {
  // Cria todos os sets
  if (action.type.includes('set_') && 'payload' in action) {
    const key = action.type.split('set_')[1]
    
    return { ...state, [key]: action.payload }
  }
  
  return state
}

const persist_config = {
  key: 'root',
  storage: AsyncStorage,
}

const PersistedReducer = persistReducer(persist_config, MemoryGameReducer)

export const MemoryGameStore = createStore(PersistedReducer)

// @ts-ignore
export const MemoryGamePersistor = persistStore(MemoryGameStore)
