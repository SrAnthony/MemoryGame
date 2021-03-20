import React, { useCallback, useRef } from 'react'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CardsList } from './Cards'
import { Text } from 'MemoryGame'
import CardItem, { CARDS_PER_ROW } from './CardItem'
import styled from 'styled-components/native'
import CardFlip from 'react-native-card-flip'
import useAvoidLeavingScreen from './useAvoidLeavingScreen'
import Footer from './Footer'
import useGame from './useGame'

const Game: React.FC = () => {
  const insets = useSafeAreaInsets()
  
  const cardsRef = useRef<(CardFlip | null)[]>([])
  
  const { onCardPress, rounds, game_is_finished, random_cards } = useGame(cardsRef)
  
  useAvoidLeavingScreen({ is_playing: rounds > 0 && !game_is_finished })
  
  const renderItem = useCallback(({ item, index }: { item: typeof CardsList[0], index: number }) => (
    <CardItem
      index={index}
      item={item}
      onCardPress={onCardPress}
      cardsRef={cardsRef}
    />
  ), [])
  
  return (
    <Container>
      <FlatList
        bounces={false}
        data={random_cards}
        numColumns={CARDS_PER_ROW}
        keyExtractor={useCallback((_, index) => index.toString(), [])}
        renderItem={renderItem}
        ListHeaderComponent={
          <Text size="large" alignCenter pBottom={25} pTop={15}>
            Jogadas: {rounds}
          </Text>
        }
        ListFooterComponent={<Footer time_paused={game_is_finished} />}
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
