import React from 'react'
import { Button, Row, Text } from 'MemoryGame'
import { ModalComponent } from './useModalComponent'
import styled from 'styled-components/native'
import Modal from 'react-native-modal'

type AlertModalProps = {
  title: string,
  subtitle: string,
  buttons?: {
    label: string,
    onPress?: () => void,
  }[]
}

const AlertModal: ModalComponent<AlertModalProps> = ({ visible, close, title, subtitle, buttons }) => {
  
  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={close}
      onBackButtonPress={close}
      onBackdropPress={close}
      swipeDirection={['down', 'up']}
      animationIn="pulse"
      style={{ alignItems: 'center' }}
    >
      <Content>
        <Text size="large" alignCenter>
          {title}
        </Text>
        
        <Text paddings={[20, 0]} size="medium" alignCenter>
          {subtitle}
        </Text>
        
        <Row wrap style={{ width: '100%' }}>
          {buttons && buttons.map((button, i) => (
            <Button
              key={button.label}
              onPress={() => {
                close()
                button.onPress?.()
              }}
              style={{ marginTop: i === 0 ? 25 : 10 }}
            >
              <Text size="medium" alignCenter>
                {button.label}
              </Text>
            </Button>
          ))}
          
          {!buttons && (
            <Button onPress={() => close()}>
              <Text size="medium" alignCenter>
                Voltar
              </Text>
            </Button>
          )}
        </Row>
      </Content>
    </Modal>
  )
}

export default AlertModal

const Content = styled.View`
  justify-content: center;
  align-items: center;
  padding: 25px;
  border-radius: 15px;
  border: 1px solid #555;
  background-color: ${p => p.theme.colors.background};
  max-width: 320px;
`
