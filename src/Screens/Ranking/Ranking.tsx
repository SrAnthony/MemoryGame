import React, { useMemo } from 'react'
import { useMemoryGameSelector } from '../../Reducers/MemoryGameReducer'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text } from 'MemoryGame'
import Header from './Header'
import RankingItem from './RankingItem'

const Ranking: React.FC = () => {
  const ranking = useMemoryGameSelector(state => state.ranking)
  
  const insets = useSafeAreaInsets()
  
  const sorted_ranking = useMemo(() => (
    ranking.sort((a, b) => a.rounds - b.rounds)
  ), [ranking])
  
  return (
    <FlatList
      data={sorted_ranking}
      keyExtractor={item => item.player.name}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: insets.top || 30,
        paddingBottom: insets.bottom || 30,
        paddingHorizontal: 30,
      }}
      ListEmptyComponent={
        <Text alignCenter size="large" color="light_gray" pTop={50}>
          Nenhum jogo para ser exibido
        </Text>
      }
      ListHeaderComponent={<Header />}
      renderItem={({ item }) => (
        <RankingItem item={item} />
      )}
    />
  )
  
}

export default Ranking
