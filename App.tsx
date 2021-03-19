import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ThemeProvider } from 'styled-components/native'
import Home from 'Screens/Home/Home'
import Theme from 'Utils/Theme'

const Stack = createStackNavigator()

const App = () => {
  
  return (
    <ThemeProvider theme={Theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App
