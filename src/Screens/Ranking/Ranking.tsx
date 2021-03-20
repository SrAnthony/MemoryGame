import React, { useMemo } from 'react'
import { Avatar, Row, Text } from 'MemoryGame'
import { useMemoryGameSelector } from '../../Reducers/MemoryGameReducer'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BackButton from '../../Components/BackButton'

const Ranking: React.FC = () => {
  const current_player = useMemoryGameSelector(state => state.current_player)
  
  const insets = useSafeAreaInsets()
  
  const fake_data = useMemo(() => {
    return [...Array(10)].map((_, i) => ({
      ...current_player, name: `${current_player.name} ${i}`,
    }))
  }, [])
  
  return (
    <FlatList
      data={fake_data}
      keyExtractor={item => item.name}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: 30,
      }}
      ListHeaderComponent={
        <>
          <BackButton />
          
          <Text size={40} pBottom={30}>
            Ranking
          </Text>
          
          <Row alignCenter pBottom={50}>
            <Avatar source={current_player.avatar.image} size={80} />
            
            <Row column pLeft={20}>
              <Text size="large" color="primary">
                {current_player.name}
              </Text>
              <Text size="medium" color="light_gray" pTop={5}>
                Recorde: 25 jogadas
              </Text>
            </Row>
          </Row>
        </>
      }
      renderItem={({ item }) => (
        <Row pBottom={15} alignCenter>
          <Avatar source={item.avatar.image} size={50} />
          
          <Row justify="space-between" isFlex>
            <Text pLeft={20} size="medium">
              {item.name}
            </Text>
            
            <Text size="medium">
              25
            </Text>
          </Row>
        </Row>
      )}
    />
  )
  
}

export default Ranking
