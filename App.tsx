import 'react-native-gesture-handler'
import React, { useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'styled-components/native'
import { Provider } from 'react-redux'
import { MemoryGamePersistor, MemoryGameStore, useMemoryGameSelector } from './src/Reducers/MemoryGameReducer'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PersistGate } from 'redux-persist/integration/react'
import Theme from './src/Utils/Theme'
import FullModalNavigator from './src/Navigators/FullModalNavigator'

const App = () => {
  const current_player = useMemoryGameSelector(state => state.current_player)
  
  // Muda a cor do tema sempre o que player mudar de avatar
  const theme = useMemo(() => ({
    ...Theme, colors: { ...Theme.colors, primary: current_player.avatar.color },
  }), [current_player.avatar.color])
  
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StatusBar hidden />
        
        <NavigationContainer>
          <FullModalNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default () => (
  <Provider store={MemoryGameStore}>
    <PersistGate persistor={MemoryGamePersistor}>
      <App />
    </PersistGate>
  </Provider>
)
