import React from 'react'
import { Avatar, Row } from 'MemoryGame'
import { useMemoryGameSelector } from '../../Reducers/MemoryGameReducer'
import { useNavigation } from '@react-navigation/native'
import { HomeNavigationType } from '../../Navigators/Types'
import TouchableScale from '../../Components/TouchableScale'

const PlayerAvatar: React.FC = () => {
  const current_player = useMemoryGameSelector(state => state.current_player)
  
  const navigation = useNavigation<HomeNavigationType<'Login'>>()
  
  return (
    <Row justifyCenter alignCenter>
      <TouchableScale onPress={() => navigation.navigate({ name: 'AvatarSelector', key: 'AvatarSelector' })}>
        <Avatar size={100} source={current_player.avatar.image} />
      </TouchableScale>
    </Row>
  )
}

export default PlayerAvatar
