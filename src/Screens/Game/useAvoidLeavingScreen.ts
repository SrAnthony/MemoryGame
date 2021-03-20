import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import useModalComponent from '../../Components/useModalComponent'
import AlertModal from '../../Components/AlertModal'

const useAvoidLeavingScreen = ({ is_playing }: { is_playing: boolean }) => {
  const navigation = useNavigation()
  
  const [openAlertModal] = useModalComponent(AlertModal, {
    title: 'Desistir do jogo?',
    subtitle: 'Ao sair seu progresso será perdido',
  })
  
  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      // Se não jogou ainda, pode voltar
      if (!is_playing) return
      
      e.preventDefault()
      
      openAlertModal({
        buttons: [{
          label: 'Continuar no jogo',
        }, {
          label: 'Desistir',
          onPress: () => navigation.dispatch(e.data.action),
        }],
      })
    }), [navigation, is_playing])
  
  return null
}

export default useAvoidLeavingScreen
