import React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { HomeStackParamList } from './Types'
import { useMemoryGameSelector } from '../Reducers/MemoryGameReducer'
import Ranking from '../Screens/Ranking/Ranking'
import Game from '../Screens/Game/Game'
import Login from '../Screens/Login/Login'
import Home from '../Screens/Home/Home'

const Stack = createNativeStackNavigator<HomeStackParamList>()

const HomeNavigator: React.FC = () => {
  const current_player = useMemoryGameSelector(state => state.current_player)
  const game_key = useMemoryGameSelector(state => state.game_key)
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      {current_player.name ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Ranking" component={Ranking} />
          
          {/* A key é para quando quiser resetar o jogo */}
          <Stack.Screen name="Game" options={{ gestureEnabled: false }}>
            {() => <Game key={game_key} />}
          </Stack.Screen>
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} options={{ gestureEnabled: false }} />
      )}
    </Stack.Navigator>
  )
}

export default HomeNavigator
