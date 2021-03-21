import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import { CardType } from './Cards'
import { useMemoryGameDispatch } from '../../Reducers/MemoryGameReducer'
import { GameReducer, initial_state } from './GameReducer'
import useRandomCards, { CARDS_NUMBER } from './useRandomCards'
import CardFlip from 'react-native-card-flip'
import useSuccessModal from './useSuccessModal'

const useGame = (cardsRef: React.MutableRefObject<Record<string, CardFlip | null>>) => {
  const [state, dispatch] = useReducer(GameReducer, initial_state)
  
  const { flipped_cards, playing_cards, rounds, is_waiting } = state
  
  const rootDispatch = useMemoryGameDispatch()
  
  const random_cards = useRandomCards()
  
  // Ao virar duas cartas e elas não forem iguais, então aguarda 1 segundo e as esconde
  // Esse ref é usado para não permitir virar outra carta durante esse período
  const isWaitingRef = useRef(false)
  
  const [openSuccessModal] = useSuccessModal(rounds)
  
  const is_game_finished = playing_cards.length === 0 && flipped_cards.length === (CARDS_NUMBER * 2)
  
  // Quando ganha o jogo
  useEffect(() => {
    if (!is_game_finished) return
    
    rootDispatch({ type: 'add_game_to_ranking', payload: rounds })
    
    // Um tempinho antes de abrir o modal só pra dar um tchan
    setTimeout(() => {
      openSuccessModal()
    }, 500)
  }, [is_game_finished])
  
  useEffect(() => {
    isWaitingRef.current = is_waiting
    
    if (!is_waiting) return
    
    const timeout = setTimeout(() => {
      cardsRef.current[playing_cards[0]?.key]?.flip()
      cardsRef.current[playing_cards[1]?.key]?.flip()
      
      dispatch({ type: 'stop_waiting' })
    }, 1000)
    
    return () => clearTimeout(timeout)
  }, [is_waiting])
  
  const onCardPress = useCallback((card: CardType) => {
    dispatch({ type: 'play_card', payload: { card, cardRef: cardsRef.current[card.key] } })
  }, [])
  
  return { onCardPress, rounds, is_game_finished, random_cards }
}

export default useGame
