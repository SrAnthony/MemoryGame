import React, { memo, useEffect } from 'react'
import { CardsList } from './Cards'
import TouchableScale from '../../Components/TouchableScale'
import styled from 'styled-components/native'

const back_card = require('Assets/Cards/Back/Asset1.png')

type CardItemProps = {
  is_flipped: boolean,
  index: number,
  item: typeof CardsList[0],
  onCardPress: (card: typeof CardsList[0], index: number) => void
}

const CardItem: React.FC<CardItemProps> = ({ item, index, is_flipped, onCardPress }) => {
  useEffect(() => {
    console.log(index, 'updated')
  })
  
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

const CardImage = styled.Image`
  width: ${p => (p.theme.screen_width * 0.25) - 10}px;
  height: ${p => ((p.theme.screen_width * 713 / 500) * 0.25) - 10}px;
  margin: 5px;
`
