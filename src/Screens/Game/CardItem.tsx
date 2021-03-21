import React, { memo } from 'react'
import { CardType } from './Cards'
import { Dimensions } from 'react-native'
import styled, { css } from 'styled-components/native'
import TouchableScale from '../../Components/TouchableScale'
import CardFlip from 'react-native-card-flip'

const back_card = require('Assets/Cards/Back/Asset1.png')

type CardItemProps = {
  item: CardType,
  onCardPress: (card: CardType) => void,
  cardsRef: React.MutableRefObject<Record<string, CardFlip | null>>,
}

const CardItem: React.FC<CardItemProps> = ({ item, onCardPress, cardsRef }) => {
  
  return (
    <StyledCardFlip ref={ref => cardsRef.current[item.key] = ref}>
      <TouchableScale
        onPress={() => onCardPress(item)}
      >
        <CardImage source={back_card} />
      </TouchableScale>
      
      <CardImage withShadow source={item.image} />
    </StyledCardFlip>
  )
}

export default memo(CardItem)

export const CARDS_PER_ROW = 4

const CARD_IMAGE_RATIO = 713 / 500

// Flatlist tem 5 de padding horizontal, por isso o - 10 aqui
const SCREEN_WIDTH = Dimensions.get('window').width - 10

const StyledCardFlip = styled(CardFlip)`
  width: ${(SCREEN_WIDTH / CARDS_PER_ROW) - 10}px;
  height: ${(SCREEN_WIDTH * CARD_IMAGE_RATIO / CARDS_PER_ROW) - 10}px;
  margin: 5px;
`

const CardImage = styled.ImageBackground<{ withShadow?: boolean }>`
  width: 100%;
  height: 100%;

  ${p => p.withShadow && css`
    shadow-color: #333;
    shadow-offset: 0 2px;
    shadow-opacity: .1;
    shadow-radius: 6px;
    elevation: 1;
  `}
`
