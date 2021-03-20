import React from 'react'
import { FullModalStackParamList } from './Types'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import HomeNavigator from './HomeNavigator'
import AvatarSelector from '../Modals/AvatarSelector/AvatarSelector'

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
    </Stack.Navigator>
  )
}

export default FullModalNavigator
