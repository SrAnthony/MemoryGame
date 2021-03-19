import React from 'react'
import { Row } from 'MemoryGame'
import { useMemoryGameSelector } from '../../Reducers/MemoryGameReducer'
import { useNavigation } from '@react-navigation/native'
import { HomeNavigationType } from '../../Navigators/Types'
import TouchableScale from '../../Components/TouchableScale'
import styled from 'styled-components/native'

const PlayerAvatar: React.FC = () => {
  const current_player = useMemoryGameSelector(state => state.current_player)
  
  const navigation = useNavigation<HomeNavigationType<'Login'>>()
  
  const onAvatarPress = () => {
    // @ts-ignore
    navigation.navigate('AvatarSelector')
  }
  
  return (
    <Row justifyCenter alignCenter>
      <TouchableScale onPress={onAvatarPress}>
        <Avatar source={current_player.avatar.image} />
      </TouchableScale>
    </Row>
  )
}

export default PlayerAvatar

// Precisa ser ImageBackground para funcionar as sombras
const Avatar = styled.ImageBackground`
  width: 100px;
  height: 100px;
  border-radius: 15px;

  shadow-color: #000;
  shadow-offset: 0 8px;
  shadow-opacity: .2;
  shadow-radius: 10px;
  elevation: 16;
`
