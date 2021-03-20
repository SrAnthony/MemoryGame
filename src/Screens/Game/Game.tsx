import React, { useCallback, useMemo, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CardsList } from './Cards'
import styled from 'styled-components/native'
import CardItem from './CardItem'

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
  
  const insets = useSafeAreaInsets()
  
  const isWaitingRef = useRef(false)
  
  // Eu randomizo a lista de todos os cards e pego 8 deles
  // Depois eu duplico a lista e randomizo de novo
  const random_cards = useMemo(() => {
    const cards = shuffle(CardsList).slice(0, 8)
    
    return shuffle([...cards, ...cards])
  }, [])
  
  const onCardPress = useCallback((card: typeof CardsList[0], index: number) => {
    if (isWaitingRef.current) return
    
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
      />
    )
  }, [flipped_cards, playing_cards])
  
  return (
    <Container>
      <FlatList
        scrollEnabled={false}
        data={random_cards}
        numColumns={4}
        keyExtractor={useCallback((_, index) => index.toString(), [])}
        contentContainerStyle={{
          paddingTop: insets.top,
        }}
        renderItem={renderItem}
      />
    </Container>
  )
}

export default Game

const Container = styled.View`
  flex: 1;
`
