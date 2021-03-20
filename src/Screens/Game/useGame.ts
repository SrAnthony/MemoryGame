import React, { useCallback, useRef, useState } from 'react'
import { CardsList } from './Cards'
import CardFlip from 'react-native-card-flip'

const useGame = (
  cardsRef: React.MutableRefObject<CardFlip[]>,
  random_cards: typeof CardsList,
) => {
  const [flipped_cards, setFlippedCards] = useState<number[]>([])
  const [playing_cards, setPlayingCards] = useState<number[]>([])
  const [rounds, setRounds] = useState(0)
  
  // Ao virar duas cartas e elas não forem iguais, então aguarda 1 segundo e as esconde
  // Esse ref é usado para não permitir virar outra carta durante esse período
  const isWaitingRef = useRef(false)
  
  const onCardPress = useCallback((card: typeof CardsList[0], index: number) => {
    if (isWaitingRef.current) return
    
    setRounds(prev => prev + 1)
    
    cardsRef.current[index]?.flip()
    
    // Tudo feito dentro do setPlayingCards para não usar o valor dos estados e evitar colocá-los na lista de
    // dependencia desse useCallback. Dessa forma os cards do jogo só são atualizados quando o is_flipped é alterado.
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
  
  return { onCardPress, flipped_cards, playing_cards, rounds }
}

export default useGame
