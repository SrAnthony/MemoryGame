import React from 'react'
import { FullModalStackParamList } from './Types'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import HomeNavigator from './HomeNavigator'
import AvatarSelector from '../Modals/AvatarSelector/AvatarSelector'
import Login from '../Screens/Login/Login'

const Stack = createNativeStackNavigator<FullModalStackParamList>()

const FullModalNavigator: React.FC = () => {
  
  return (
    <Stack.Navigator
      screenOptions={{
        stackPresentation: 'modal',
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
      <Stack.Screen name="AvatarSelector" component={AvatarSelector} />
      <Stack.Screen name="Login" component={Login} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  )
}

export default FullModalNavigator
