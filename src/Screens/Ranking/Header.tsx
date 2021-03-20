import React from 'react'
import { Avatar, Row, Text } from 'MemoryGame'
import { useMemoryGameSelector } from '../../Reducers/MemoryGameReducer'
import BackButton from '../../Components/BackButton'

const Header: React.FC = () => {
  const current_player = useMemoryGameSelector(state => state.current_player)
  const ranking = useMemoryGameSelector(state => state.ranking)
  
  const current_player_ranking = ranking.find(rank => rank.player.name === current_player.name)
  
  return (
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
            {current_player_ranking
              ? `Recorde: ${current_player_ranking.rounds} jogadas`
              : 'Sem recorde'}
          </Text>
        </Row>
      </Row>
    </>
  )
}

export default Header
