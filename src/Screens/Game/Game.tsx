import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CardType } from './Cards'
import { Text } from 'MemoryGame'
import CardItem, { CARDS_PER_ROW } from './CardItem'
import styled from 'styled-components/native'
import CardFlip from 'react-native-card-flip'
import useAvoidLeavingScreen from './useAvoidLeavingScreen'
import Footer from './Footer'
import useGame from './useGame'

const Game: React.FC = () => {
  // Só carrego as cartas depois que a tela finalizou a sua transição de entrada, para evitar travamentos e e lentidão
  const [is_game_loaded, setIsGameLoaded] = useState(false)
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsGameLoaded(true)
    }, 500)
    
    return () => clearTimeout(timeout)
  }, [])
  
  const insets = useSafeAreaInsets()
  
  const cardsRef = useRef<Record<string, CardFlip | null>>({})
  
  const { onCardPress, rounds, is_game_finished, random_cards } = useGame(cardsRef)
  
  useAvoidLeavingScreen({ is_playing: rounds > 0 && !is_game_finished })
  
  const renderItem = useCallback(({ item }: { item: CardType }) => (
    <CardItem
      item={item}
      onCardPress={onCardPress}
      cardsRef={cardsRef}
    />
  ), [])
  
  return (
    <Container>
      <FlatList
        bounces={false}
        data={is_game_loaded ? random_cards : []}
        numColumns={CARDS_PER_ROW}
        keyExtractor={useCallback((_, index) => index.toString(), [])}
        renderItem={renderItem}
        ListHeaderComponent={
          <Text size="large" alignCenter pBottom={25} pTop={15}>
            Jogadas: {rounds}
          </Text>
        }
        ListFooterComponent={
          is_game_loaded
            ? <Footer time_paused={is_game_finished} />
            : undefined
        }
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingHorizontal: 5,
        }}
      />
    </Container>
  )
}

export default Game

const Container = styled.View`
  flex: 1;
`
