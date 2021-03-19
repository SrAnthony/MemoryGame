import React, { useState } from 'react'
import { Button, Row, Text } from 'MemoryGame'
import { useMemoryGameDispatch, useMemoryGameSelector } from '../../Reducers/MemoryGameReducer'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import PlayerAvatar from './PlayerAvatar'

const Login: React.FC = () => {
  const [name, setName] = useState('')
  
  const dispatch = useMemoryGameDispatch()
  const current_player = useMemoryGameSelector(state => state.current_player)
  
  const navigation = useNavigation()
  
  const login = () => {
    if (name.length === 0) return
    
    dispatch({ type: 'set_current_player', payload: { ...current_player, name } })
    navigation.goBack()
  }
  
  return (
    <Container behavior="padding">
      <PlayerAvatar />
      
      <Row pTop={35}>
        <NameInput
          placeholder="Informe o seu nome"
          placeholderTextColor="#333"
          onChangeText={setName}
          onEndEditing={login}
        />
      </Row>
      
      <Row pTop={35}>
        <Button onPress={login}>
          <Text size="large" color="primary">
            ENTRAR
          </Text>
        </Button>
      </Row>
    </Container>
  )
}

export default Login

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 0 35px;
`

const NameInput = styled.TextInput`
  background-color: lightgray;
  padding: 15px 20px;
  border-radius: 10px;
  font-size: 24px;
  text-align: center;
  width: 100%;
  font-family: ${p => p.theme.font_family};
`
