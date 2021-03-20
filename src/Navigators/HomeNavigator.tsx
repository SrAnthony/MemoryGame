import React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { HomeStackParamList } from './Types'
import Home from '../Screens/Home/Home'
import Ranking from '../Screens/Ranking/Ranking'
import Game from '../Screens/Game/Game'

const Stack = createNativeStackNavigator<HomeStackParamList>()

const HomeNavigator: React.FC = () => {
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Ranking" component={Ranking} />
      <Stack.Screen name="Game" component={Game} />
    </Stack.Navigator>
  )
}

export default HomeNavigator
