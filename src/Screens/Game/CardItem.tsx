import React, { memo } from 'react'
import { CardsList } from './Cards'
import styled, { css } from 'styled-components/native'
import TouchableScale from '../../Components/TouchableScale'
import CardFlip from 'react-native-card-flip'

const back_card = require('Assets/Cards/Back/Asset1.png')

type CardItemProps = {
  index: number,
  item: typeof CardsList[0],
  onCardPress: (card: typeof CardsList[0], index: number) => void,
  cardsRef: any
}

const CardItem: React.FC<CardItemProps> = ({ item, index, onCardPress, cardsRef }) => {
  
  return (
    <StyledCardFlip ref={ref => cardsRef.current[index] = ref}>
      <TouchableScale
        onPress={() => onCardPress(item, index)}
      >
        <CardImage source={back_card} />
      </TouchableScale>
      
      <CardImage withShadow source={item.image} />
    </StyledCardFlip>
  )
}

export default memo(CardItem)

export const CARDS_PER_ROW = 4

const CardImage = styled.ImageBackground<{ withShadow?: boolean }>`
  width: ${p => (p.theme.screen_width / CARDS_PER_ROW) - 10}px;
  height: ${p => (p.theme.screen_width * 713 / 500 / CARDS_PER_ROW) - 10}px;

  ${p => p.withShadow && css`
    shadow-color: #333;
    shadow-offset: 0 2px;
    shadow-opacity: .1;
    shadow-radius: 6px;
    elevation: 1;
  `}
`

const StyledCardFlip = styled(CardFlip)`
  width: ${p => (p.theme.screen_width / CARDS_PER_ROW) - 10}px;
  height: ${p => (p.theme.screen_width * 713 / 500 / CARDS_PER_ROW) - 10}px;
  margin: 5px;
`
