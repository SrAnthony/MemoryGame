import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { Dimensions } from 'react-native'
import { FullModalStackParamList } from './Types'
import HomeNavigator from './HomeNavigator'
import AvatarSelector from '../Modals/AvatarSelector/AvatarSelector'

const Stack = createStackNavigator<FullModalStackParamList>()

const { height } = Dimensions.get('window')

const FullModalNavigator: React.FC = () => {
  
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={({ navigation, route }) => ({
        headerShown: false,
        // @ts-ignore
        gestureEnabled: route.params?.gestureEnabled || false,
        cardOverlayEnabled: true,
        gestureResponseDistance: {
          vertical: height,
        },
        ...TransitionPresets.ModalPresentationIOS,
      })}
    >
      <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
      <Stack.Screen name="AvatarSelector" component={AvatarSelector} />
    </Stack.Navigator>
  )
}

export default FullModalNavigator
