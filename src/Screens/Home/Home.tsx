import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useMemoryGameSelector } from '../../Reducers/MemoryGameReducer'
import { useNavigation } from '@react-navigation/native'

const Home: React.FC = () => {
  const current_player = useMemoryGameSelector(state => state.current_player)
  
  const navigation = useNavigation()
  
  useEffect(() => {
    if (current_player.name) return
    
    // @ts-ignore
    navigation.navigate('Login')
  }, [current_player])
  
  return (
    <View />
  )
}

export default Home
