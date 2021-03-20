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
import useRandomCards from './useRandomCards'
import useGame from './useGame'

const Game: React.FC = () => {
  const insets = useSafeAreaInsets()
  
  const cardsRef = useRef<CardFlip[]>([])
  
  const random_cards = useRandomCards()
  
  const { onCardPress, flipped_cards, playing_cards, rounds } = useGame(cardsRef, random_cards)
  
  useAvoidLeavingScreen(rounds > 0)
  
  const renderItem = useCallback(({ item, index }: { item: typeof CardsList[0], index: number }) => (
    <CardItem
      index={index}
      item={item}
      onCardPress={onCardPress}
      cardsRef={cardsRef}
    />
  ), [flipped_cards, playing_cards])
  
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
        ListFooterComponent={<Footer />}
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
