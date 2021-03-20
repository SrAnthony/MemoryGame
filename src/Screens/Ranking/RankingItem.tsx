import React, { memo } from 'react'
import { Avatar, Row, Text } from 'MemoryGame'
import MemoryGame from '../../Reducers/MemoryGameTypes'

type RankingItemProps = {
  item: MemoryGame.RankingType
}

const RankingItem: React.FC<RankingItemProps> = ({ item }) => {
  
  return (
    <Row pBottom={15} alignCenter>
      <Avatar source={item.player.avatar.image} size={50} />
      
      <Row justify="space-between" isFlex>
        <Text pLeft={20} size="medium">
          {item.player.name}
        </Text>
        
        <Text size="medium">
          {item.rounds}
        </Text>
      </Row>
    </Row>
  )
}

export default memo(RankingItem)
