import React from 'react'
import { ChevronLeft, ChevronRight } from 'react-native-feather'
import { Row } from 'MemoryGame'
import TouchableScale from '../../Components/TouchableScale'
import styled from 'styled-components/native'

const AvatarSelector: React.FC = () => {
  
  return (
    <Row justifyCenter alignCenter>
      <TouchableScale>
        <ChevronLeft />
      </TouchableScale>
      
      <TouchableScale>
        <Avatar source={require('Assets/Avatars/Male/1.png')} />
      </TouchableScale>
      
      <TouchableScale>
        <ChevronRight />
      </TouchableScale>
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
