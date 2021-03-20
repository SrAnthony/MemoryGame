import React, { memo } from 'react'
import { CardsList } from './Cards'
import TouchableScale from '../../Components/TouchableScale'
import styled from 'styled-components/native'
import CardFlip from 'react-native-card-flip'

const back_card = require('Assets/Cards/Back/Asset1.png')

type CardItemProps = {
  is_flipped: boolean,
  index: number,
  item: typeof CardsList[0],
  onCardPress: (card: typeof CardsList[0], index: number) => void,
  cardsRef: any
}

const CardItem: React.FC<CardItemProps> = ({ item, index, is_flipped, onCardPress, cardsRef }) => {
  // const cardItemRef = useRef<CardFlip | null>(null)
  
  return (
    <StyledCardFlip ref={ref => cardsRef.current[index] = ref}>
      <TouchableScale
        onPress={() => onCardPress(item, index)}
      >
        <CardImage source={back_card} />
      </TouchableScale>
      
      <CardImage source={item.image} />
    </StyledCardFlip>
  )
  
  // Evita ter um touchable quando a carta não pode ser pressionada (por já estar virada)
  if (is_flipped) {
    return (
      <CardImage source={item.image} />
    )
  }
  
  return (
    <TouchableScale onPress={() => onCardPress(item, index)}>
      <CardImage source={back_card} />
    </TouchableScale>
  )
}

export default memo(CardItem, (prev, next) => prev.is_flipped === next.is_flipped)

export const CARDS_PER_ROW = 4

const CardImage = styled.Image`
  width: ${p => (p.theme.screen_width / CARDS_PER_ROW) - 10}px;
  height: ${p => (p.theme.screen_width * 713 / 500 / CARDS_PER_ROW) - 10}px;
`

const StyledCardFlip = styled(CardFlip)`
  width: ${p => (p.theme.screen_width / CARDS_PER_ROW) - 10}px;
  height: ${p => (p.theme.screen_width * 713 / 500 / CARDS_PER_ROW) - 10}px;
  margin: 5px;
`
