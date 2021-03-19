import 'react-native-gesture-handler'
import React, { useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ThemeProvider } from 'styled-components/native'
import { Provider } from 'react-redux'
import { MemoryGameStore, useMemoryGameSelector } from './src/Reducers/MemoryGameReducer'
import Login from 'Screens/Login/Login'
import Theme from './src/Utils/Theme'

const Stack = createStackNavigator()

const App = () => {
  const current_player = useMemoryGameSelector(state => state.current_player)
  
  // Muda a cor do tema sempre o que player mudar de avatar
  const theme = useMemo(() => ({
    ...Theme, colors: { ...Theme.colors, primary: current_player.avatar.color },
  }), [current_player.avatar.color])
  
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default () => (
  <Provider store={MemoryGameStore}>
    <App />
  </Provider>
)
