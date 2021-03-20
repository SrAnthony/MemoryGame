import { useEffect } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const useAvoidLeavingScreen = (is_playing: boolean) => {
  const navigation = useNavigation()
  
  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      // Se não jogou ainda, pode voltar
      if (!is_playing) return
      
      e.preventDefault()
      
      Alert.alert(
        'Desistir do jogo?',
        'Ao sair seu progresso será perdido',
        [
          {
            text: 'Continuar jogo', style: 'cancel', onPress: () => {
            },
          },
          {
            text: 'Desistir',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ],
      )
    }), [navigation, is_playing])
  
  return null
}

export default useAvoidLeavingScreen
