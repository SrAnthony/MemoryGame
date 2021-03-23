import { useMemo } from 'react'
import { CardsList } from './Cards'

export const CARDS_NUMBER = 10

const shuffle = (arr: typeof CardsList) => (
  arr.sort(() => Math.random() - 0.5)
)

// Eu randomizo a lista de todos os cards e pego CARDS_NUMBER deles
// Depois eu duplico a lista e randomizo de novo
const useRandomCards = (): typeof CardsList => {
  return useMemo(() => {
    const cards = shuffle(CardsList).slice(0, CARDS_NUMBER)
    
    let duplicated_cards = [...cards, ...cards].map((card, i) => ({ ...card, key: `${card.key}-${i}` }))
    
    return shuffle(duplicated_cards)
  }, [])
}

export default useRandomCards
