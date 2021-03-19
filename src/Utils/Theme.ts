import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('screen')

const Theme = {
  screen_width: width,
  screen_height: height,
  font_family: 'VT323-Regular',
  
  colors: {
    primary: '#324855',
    secondary: '',
    
    almost_black: '#1d1d1d',
    hard_black: '#333333',
    black: '#000',
    white: '#fff',
    gray: '#606162',
    light_gray: '#8c8881',
  },
}

export type ThemeType = typeof Theme

export default Theme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {
  }
}
