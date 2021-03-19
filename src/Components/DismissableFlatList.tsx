import React, { useCallback, useRef } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { GestureHandlerRefContext } from '@react-navigation/stack'
import { FlatList } from 'react-native-gesture-handler'
import { FlatListProps } from 'react-native'

// FlatList feita para ser usada dentro de um FullModal
// Permite fechar o modal arrastando para baixo de forma mais simples
const DismissableFlatList: React.FC<FlatListProps<any>> = (props) => {
  const navigation = useNavigation()
  const route = useRoute()
  
  // @ts-ignore
  const { gestureEnabled } = route.params || {}
  const scrolledTop = useRef(true)
  
  const onScroll = useCallback(
    ({ nativeEvent }) => {
      scrolledTop.current = nativeEvent.contentOffset.y <= 0
      if (gestureEnabled !== scrolledTop.current) {
        navigation.setParams({ gestureEnabled: scrolledTop.current })
      }
    },
    [gestureEnabled],
  )
  
  return (
    <GestureHandlerRefContext.Consumer>
      {ref => (
        <FlatList
          // @ts-ignore
          waitFor={scrolledTop ? ref : undefined}
          onScroll={onScroll}
          scrollEventThrottle={16}
          {...props}
        />
      )}
    </GestureHandlerRefContext.Consumer>
  )
}

export default DismissableFlatList
