import React, { useEffect } from 'react'
import { useMemoryGameDispatch, useMemoryGameSelector } from '../../Reducers/MemoryGameReducer'
import { useNavigation } from '@react-navigation/native'
import { Button, Row, Text } from 'MemoryGame'
import styled from 'styled-components/native'

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
        <Button>
          <Text size="large" color="primary">
            JOGAR
          </Text>
        </Button>
        
        <Button style={{ marginTop: 15 }}>
          <Text size="large" color="primary">
            RANKING
          </Text>
        </Button>
        
        <Button style={{ marginTop: 15 }} onPress={logout}>
          <Text size="large" color="primary">
            SAIR
          </Text>
        </Button>
      </Row>
    </Container>
  )
}

export default Home

const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0 35px;
`
