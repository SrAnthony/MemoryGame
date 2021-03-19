import React from 'react'
import { Text } from 'MemoryGame'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useMemoryGameDispatch, useMemoryGameSelector } from '../../Reducers/MemoryGameReducer'
import { useNavigation } from '@react-navigation/native'
import Avatars from '../../Screens/Login/Avatars'
import styled from 'styled-components/native'
import TouchableScale from '../../Components/TouchableScale'
import DismissableFlatList from '../../Components/DismissableFlatList'

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
    <DismissableFlatList
      data={Avatars}
      numColumns={3}
      contentContainerStyle={{
        alignItems: 'center',
        paddingBottom: insets.bottom,
      }}
      ListHeaderComponent={
        <Text size="large" alignCenter paddings={[30, 0]}>
          Selecione um avatar
        </Text>
      }
      renderItem={({ item }) => (
        <TouchableScale onPress={() => onAvatarPress(item)}>
          <Avatar source={item.image} />
        </TouchableScale>
      )}
    />
  )
}

export default AvatarSelector

const Avatar = styled.ImageBackground`
  width: 100px;
  height: 100px;
  border-radius: 15px;
  margin: 10px;

  shadow-color: #000;
  shadow-offset: 0 8px;
  shadow-opacity: .2;
  shadow-radius: 10px;
  elevation: 16;
`
