import React, { useEffect } from 'react'
import { useMemoryGameDispatch, useMemoryGameSelector } from '../../Reducers/MemoryGameReducer'
import { useNavigation } from '@react-navigation/native'
import { Avatar, Button, Row, Text } from 'MemoryGame'
import { Linking } from 'react-native'
import styled from 'styled-components/native'
import Logo from '../../Components/Logo'
import TouchableScale from '../../Components/TouchableScale'

const Home: React.FC = () => {
  const dispatch = useMemoryGameDispatch()
  const current_player = useMemoryGameSelector(state => state.current_player)
  
  const navigation = useNavigation()
  
  const logout = () => {
    dispatch({ type: 'set_current_player', payload: { ...current_player, name: '' } })
  }
  
  useEffect(() => {
    if (current_player.name) return
    
    // @ts-ignore
    navigation.navigate('Login')
  }, [current_player])
  
  return (
    <Container>
      <Row pTop={35} column>
        <Logo />
        
        {/* @ts-ignore */}
        <Button onPress={() => navigation.navigate('Game')}>
          <Text size="large" color="primary">
            NOVO JOGO
          </Text>
        </Button>
        
        {/* @ts-ignore */}
        <Button style={{ marginTop: 15 }} onPress={() => navigation.navigate('Ranking')}>
          <Text size="large" color="primary">
            RANKING
          </Text>
        </Button>
        
        <Button style={{ marginTop: 15 }} onPress={logout}>
          <Text size="large" color="primary">
            SAIR
          </Text>
        </Button>
        
        <Row pTop={35} alignCenter justifyCenter>
          <Avatar source={current_player.avatar.image} size={40} />
          
          <Text size="medium" color="primary" pLeft={15}>
            {current_player.name}
          </Text>
        </Row>
        
        <TouchableScale onPress={() => Linking.openURL('https://github.com/SrAnthony/MemoryGame')}>
          <Row pTop={50} alignCenter justifyCenter column>
            <Text color="light_gray">
              Desenvolvido por
            </Text>
            <Text size="medium" color="light_gray">
              Anthony Nadaletti
            </Text>
          </Row>
        </TouchableScale>
      </Row>
    </Container>
  )
}

export default Home

const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0 35px;
`
