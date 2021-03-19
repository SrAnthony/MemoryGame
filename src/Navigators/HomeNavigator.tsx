import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from 'Screens/Login/Login'
import { HomeStackParamList } from './Types'

const Stack = createStackNavigator<HomeStackParamList>()

const HomeNavigator: React.FC = () => {
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}

export default HomeNavigator
