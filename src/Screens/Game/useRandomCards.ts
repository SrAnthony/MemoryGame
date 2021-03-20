import { useMemo } from 'react'
import { CardsList } from './Cards'

export const CARDS_NUMBER = 1

// Eu randomizo a lista de todos os cards e pego CARDS_NUMBER deles
// Depois eu duplico a lista e randomizo de novo
const useRandomCards = (): typeof CardsList => {
  return useMemo(() => {
    const cards = shuffle(CardsList).slice(0, CARDS_NUMBER)
    
    return shuffle([...cards, ...cards])
  }, [])
}

export default useRandomCards

const shuffle = (arra1: any[]) => {
  let ctr = arra1.length, temp, index
  
  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr)
    // Decrease ctr by 1
    ctr--
    // And swap the last element with it
    temp = arra1[ctr]
    arra1[ctr] = arra1[index]
    arra1[index] = temp
  }
  return arra1
}
