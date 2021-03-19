import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeStackParamList } from './Types'
import Home from '../Screens/Home/Home'

const Stack = createStackNavigator<HomeStackParamList>()

const HomeNavigator: React.FC = () => {
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}

export default HomeNavigator
