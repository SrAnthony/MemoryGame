import React from 'react'
import { Row } from 'MemoryGame'
import { useMemoryGameDispatch, useMemoryGameSelector } from '../../Reducers/MemoryGameReducer'
import TouchableScale from '../../Components/TouchableScale'
import styled from 'styled-components/native'
import Avatars from './Avatars'

const AvatarSelector: React.FC = () => {
  const dispatch = useMemoryGameDispatch()
  const current_player = useMemoryGameSelector(state => state.current_player)
  
  const onAvatarSelect = (avatar: typeof Avatars[0]) => {
    dispatch({ type: 'set_current_player', payload: { ...current_player, avatar } })
  }
  
  return (
    <Row justifyCenter alignCenter>
      {Avatars.map(avatar => (
        <TouchableScale key={avatar.color} onPress={() => onAvatarSelect(avatar)}>
          <Avatar source={avatar.image} />
        </TouchableScale>
      ))}
    </Row>
  )
}

export default AvatarSelector

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
