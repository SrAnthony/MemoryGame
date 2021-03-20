import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CardsList } from './Cards'
import { useNavigation } from '@react-navigation/native'
import { useMemoryGameDispatch } from '../../Reducers/MemoryGameReducer'
import CardFlip from 'react-native-card-flip'
import useModalComponent from '../../Components/useModalComponent'
import AlertModal from '../../Components/AlertModal'

const useGame = (
  cardsRef: React.MutableRefObject<(CardFlip | null)[]>,
  random_cards: typeof CardsList,
) => {
  const [flipped_cards, setFlippedCards] = useState<number[]>([])
  const [playing_cards, setPlayingCards] = useState<number[]>([])
  const [rounds, setRounds] = useState(0)
  
  const navigation = useNavigation()
  
  const dispatch = useMemoryGameDispatch()
  
  // Ao virar duas cartas e elas não forem iguais, então aguarda 1 segundo e as esconde
  // Esse ref é usado para não permitir virar outra carta durante esse período
  const isWaitingRef = useRef(false)
  
  const [openSuccessModal] = useModalComponent(AlertModal, {
    title: 'Você ganhou!',
    subtitle: `Você finalizou o jogo em ${rounds} rodadas!`,
    buttons: [{
      label: 'Jogar de novo',
    }, {
      label: 'Sair',
      onPress: () => navigation.goBack(),
    }],
  })
  
  const game_is_finished = playing_cards.length === 0 && flipped_cards.length === 16
  
  // Quando ganha o jogo
  useEffect(() => {
    if (!game_is_finished) return
    
    openSuccessModal()
    dispatch({ type: 'add_game_to_ranking', payload: rounds })
  }, [game_is_finished])
  
  const onCardPress = useCallback((card: typeof CardsList[0], index: number) => {
    if (isWaitingRef.current) return
    
    setRounds(prev => prev + 1)
    
    cardsRef.current[index]?.flip()
    
    // Tudo feito dentro do setPlayingCards para não usar o valor dos estados e evitar colocá-los na lista de
    // dependencia desse useCallback. Dessa forma os cards do jogo só são atualizados quando realmente preciso.
    setPlayingCards(prev_playing_cards => {
      if (prev_playing_cards.length === 0) {
        return [index]
      }
      
      // Se está pressionando a segunda carta e é igual ao que selecionou antes
      if (card.key === random_cards[prev_playing_cards[0]].key) {
        setFlippedCards(prev => [...prev, index, prev_playing_cards[0]])
        return []
      }
      
      isWaitingRef.current = true
      setTimeout(() => {
        cardsRef.current[index]?.flip()
        cardsRef.current[prev_playing_cards[0]]?.flip()
        
        setPlayingCards([])
        isWaitingRef.current = false
      }, 1000)
      
      return [...prev_playing_cards, index]
    })
  }, [])
  
  return { onCardPress, rounds, game_is_finished }
}

export default useGame
