import React from 'react'
import { Row, Text } from 'MemoryGame'
import { darken } from 'polished'
import styled from 'styled-components/native'
import AvatarSelector from './AvatarSelector'
import TouchableScale from '../../Components/TouchableScale'

const Home: React.FC = () => {
  
  return (
    <Container>
      <AvatarSelector />
      
      <Row pTop={35}>
        <NameInput
          placeholder="Informe o seu nome"
          placeholderTextColor="#333"
        />
      </Row>
      
      <Row pTop={35}>
        <Button>
          <Text size={32} hex={darken(.5, '#C4ABB9')}>
            ENTRAR
          </Text>
        </Button>
      </Row>
    </Container>
  )
}

export default Home

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 0 35px;
`

const Button = styled(TouchableScale)`
  border-width: 2px;
  border-bottom-width: 6px;
  border-color: ${darken(.1, '#C4ABB9')};
  padding: 10px 20px;
  width: 100%;
  align-items: center;
  border-radius: 10px;
  background-color: #C4ABB9;
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
