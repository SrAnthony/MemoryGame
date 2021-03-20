import React from 'react'
import { useMemoryGameDispatch, useMemoryGameSelector } from '../../Reducers/MemoryGameReducer'
import { useNavigation } from '@react-navigation/native'
import { Avatar, Button, Row, Text } from 'MemoryGame'
import { Linking } from 'react-native'
import styled from 'styled-components/native'
import Logo from '../../Components/Logo'
import TouchableScale from '../../Components/TouchableScale'
import useModalComponent from '../../Components/useModalComponent'
import AlertModal from '../../Components/AlertModal'

const Home: React.FC = () => {
  const dispatch = useMemoryGameDispatch()
  const current_player = useMemoryGameSelector(state => state.current_player)
  
  const navigation = useNavigation()
  
  const [openLogoutModal] = useModalComponent(AlertModal, {
    title: 'Deseja sair?',
    subtitle: 'Para voltar, utilize o mesmo nome. Você pode alterar seu avatar a qualquer momento.',
    buttons: [{
      label: 'Sim, sair',
      onPress: () => {
        dispatch({ type: 'set_current_player', payload: { ...current_player, name: '' } })
      },
    }, {
      label: 'Não, voltar',
    }],
  })
  
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
        
        <Button style={{ marginTop: 15 }} onPress={() => openLogoutModal()}>
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
