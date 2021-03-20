import React from 'react'
import { Row, Text } from 'MemoryGame'
import { useNavigation } from '@react-navigation/native'
import TimePlayed from './TimePlayed'
import TouchableScale from '../../Components/TouchableScale'

const Footer: React.FC = () => {
  const navigation = useNavigation()
  
  return (
    <Row column alignCenter pTop={25}>
      <TimePlayed />
      
      <TouchableScale style={{ marginTop: 25 }} onPress={() => navigation.goBack()}>
        <Text size="medium" hex="red">
          Sair do jogo
        </Text>
      </TouchableScale>
    </Row>
  )
}

export default Footer
