import React, { useCallback, useMemo, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CardsList } from './Cards'
import { Text } from 'MemoryGame'
import CardItem, { CARDS_PER_ROW } from './CardItem'
import styled from 'styled-components/native'
import CardFlip from 'react-native-card-flip'
import useAvoidLeavingScreen from './useAvoidLeavingScreen'

const shuffle = (arra1: any[]) => {
  let ctr = arra1.length, temp, index
  
  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr)
    // Decrease ctr by 1
    ctr--
    // And swap the last element with it
    temp = arra1[ctr]
    arra1[ctr] = arra1[index]
    arra1[index] = temp
  }
  return arra1
}

const Game: React.FC = () => {
  const [flipped_cards, setFlippedCards] = useState<number[]>([])
  const [playing_cards, setPlayingCards] = useState<number[]>([])
  const [rounds, setRounds] = useState(0)
  
  const insets = useSafeAreaInsets()
  
  useAvoidLeavingScreen(rounds > 0)
  
  // Ao virar duas cartas e elas não forem iguais, então aguarda 1 segundo e as esconde
  // Esse ref é usado para não permitir virar outra carta durante esse período
  const isWaitingRef = useRef(false)
  
  const cardsRef = useRef<CardFlip[]>([])
  
  // Eu randomizo a lista de todos os cards e pego 8 deles
  // Depois eu duplico a lista e randomizo de novo
  const random_cards = useMemo(() => {
    const cards = shuffle(CardsList).slice(0, 8)
    
    return shuffle([...cards, ...cards])
  }, [])
  
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
  
  const renderItem = useCallback(({ item, index }: { item: typeof CardsList[0], index: number }) => {
    const is_flipped = flipped_cards.includes(index) || playing_cards.includes(index)
    
    return (
      <CardItem
        is_flipped={is_flipped}
        index={index}
        item={item}
        onCardPress={onCardPress}
        cardsRef={cardsRef}
      />
    )
  }, [flipped_cards, playing_cards])
  
  return (
    <Container>
      <FlatList
        scrollEnabled={false}
        data={random_cards}
        key={CARDS_PER_ROW}
        numColumns={CARDS_PER_ROW}
        keyExtractor={useCallback((_, index) => index.toString(), [])}
        renderItem={renderItem}
        ListHeaderComponent={
          <Text size="large" alignCenter pBottom={25}>
            Jogadas: {rounds}
          </Text>
        }
        contentContainerStyle={{
          paddingTop: insets.top,
        }}
      />
    </Container>
  )
}

export default Game

const Container = styled.View`
  flex: 1;
`
