import React, { useState } from 'react'
import { Button, Row, Text } from 'MemoryGame'
import { useMemoryGameDispatch, useMemoryGameSelector } from '../../Reducers/MemoryGameReducer'
import { Keyboard, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import PlayerAvatar from './PlayerAvatar'
import Logo from '../../Components/Logo'

const Login: React.FC = () => {
  const [name, setName] = useState('')
  
  const insets = useSafeAreaInsets()
  
  const dispatch = useMemoryGameDispatch()
  const current_player = useMemoryGameSelector(state => state.current_player)
  
  const login = () => {
    if (name.length === 0) return
    
    dispatch({ type: 'set_current_player', payload: { ...current_player, name } })
  }
  
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      keyboardShouldPersistTaps="always"
      onTouchStart={Keyboard.dismiss}
      contentContainerStyle={{ paddingTop: insets.top }}
    >
      <Container behavior="position">
        <Logo />
        
        <PlayerAvatar />
        
        <Row pTop={35}>
          <NameInput
            placeholder="Informe o seu nome"
            placeholderTextColor="#333"
            onChangeText={setName}
            autoCorrect={false}
            autoCapitalize="words"
            onSubmitEditing={login}
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
    </ScrollView>
  )
}

export default Login

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  margin: 50px 35px 0 35px;
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
