import React from 'react'
import { Platform, TouchableOpacityProps } from 'react-native'
import OriginalTouchableScale from 'react-native-touchable-scale'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

type TouchableScaleProps = {
  activeScale?: number,
  friction?: number,
} & TouchableOpacityProps

const TouchableScale: React.FC<TouchableScaleProps> = (props) => {
  
  return (
    <OriginalTouchableScale
      activeScale={.95}
      friction={7}
      {...props}
      onPress={(event) => {
        if (Platform.OS === 'ios')
          ReactNativeHapticFeedback.trigger('impactLight', {})
        
        props.onPress?.(event)
      }}
    />
  )
}

export default TouchableScale
