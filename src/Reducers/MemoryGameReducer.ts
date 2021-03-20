import { createDispatchHook, createSelectorHook } from 'react-redux'
import { createStore } from 'redux'
import { Animals } from '../Modals/AvatarSelector/Avatars'
import { persistReducer, persistStore } from 'redux-persist'
import MemoryGame from './MemoryGameTypes'
import AsyncStorage from '@react-native-async-storage/async-storage'

type MemoryGameStateType = {
  current_player: MemoryGame.PlayerType,
  ranking: MemoryGame.RankingType[],
}

export type MemoryGameActionType =
  | { type: 'set_current_player', payload: MemoryGame.PlayerType }
  | { type: 'add_game_to_ranking', payload: MemoryGame.RankingType['rounds'] }

const initial_state: MemoryGameStateType = {
  current_player: {
    name: '',
    // Quando abre o aplicativo (e não está logado) carrega um animal aleatorio
    avatar: Animals[Math.floor(Math.random() * Animals.length)],
  },
  ranking: [],
}

export const useMemoryGameSelector = createSelectorHook<MemoryGameStateType, MemoryGameActionType>()

export const useMemoryGameDispatch = createDispatchHook<MemoryGameStateType, MemoryGameActionType>()

const addGameToRanking = (state: MemoryGameStateType, rounds: number) => {
  const user_ranking = { player: state.current_player, rounds }
  
  const index = state.ranking.findIndex(rank => rank.player.name === state.current_player.name)
  if (index === -1) {
    return { ...state, ranking: [...state.ranking, user_ranking] }
  }
  
  const new_ranking = [...state.ranking]
  new_ranking[index] = user_ranking
  
  return { ...state, ranking: new_ranking }
}

const MemoryGameReducer = (state = initial_state, action: MemoryGameActionType) => {
  switch (action.type) {
    case 'add_game_to_ranking':
      return addGameToRanking(state, action.payload)
    case 'set_current_player':
      return { ...state, current_player: action.payload }
    default:
      return state
  }
}

const persist_config = {
  key: 'root',
  storage: AsyncStorage,
}

const PersistedReducer = persistReducer(persist_config, MemoryGameReducer)

export const MemoryGameStore = createStore(PersistedReducer)

// @ts-ignore
export const MemoryGamePersistor = persistStore(MemoryGameStore)
