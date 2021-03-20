import React from 'react'
import { Avatar, Text } from 'MemoryGame'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useMemoryGameDispatch, useMemoryGameSelector } from '../../Reducers/MemoryGameReducer'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native'
import Avatars from './Avatars'
import TouchableScale from '../../Components/TouchableScale'

const AvatarSelector: React.FC = () => {
  const dispatch = useMemoryGameDispatch()
  const current_player = useMemoryGameSelector(state => state.current_player)
  
  const insets = useSafeAreaInsets()
  
  const navigation = useNavigation()
  
  const onAvatarPress = (avatar: typeof Avatars[0]) => {
    dispatch({ type: 'set_current_player', payload: { ...current_player, avatar } })
    navigation.goBack()
  }
  
  return (
    <FlatList
      data={Avatars}
      numColumns={3}
      contentContainerStyle={{
        alignItems: 'center',
        paddingBottom: insets.bottom || 30,
      }}
      ListHeaderComponent={
        <Text size="large" alignCenter paddings={[30, 0]}>
          Selecione um avatar
        </Text>
      }
      renderItem={({ item }) => (
        <TouchableScale onPress={() => onAvatarPress(item)}>
          <Avatar style={{ margin: 10 }} source={item.image} />
        </TouchableScale>
      )}
    />
  )
}

export default AvatarSelector
