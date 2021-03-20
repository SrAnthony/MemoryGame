import React from 'react'
import { Row, Text } from 'MemoryGame'
import styled from 'styled-components/native'

const Logo: React.FC = () => {
  
  return (
    <Row column justifyCenter alignCenter pBottom={50}>
      <StyledText color="primary">
        Memory
      </StyledText>
      <StyledText color="primary">
        Game
      </StyledText>
    </Row>
  )
}

export default Logo

const StyledText = styled(Text)`
  font-size: 80px;
  background-color: ${p => p.theme.colors.primary};
  padding: 0 15px;
  text-align: center;
`
