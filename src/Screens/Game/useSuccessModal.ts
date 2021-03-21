import { useMemoryGameDispatch } from '../../Reducers/MemoryGameReducer'
import useModalComponent from '../../Components/useModalComponent'
import AlertModal from '../../Components/AlertModal'

const useSuccessModal = (rounds: number) => {
  const dispatch = useMemoryGameDispatch()
  
  return useModalComponent(AlertModal, {
    title: 'Você ganhou!',
    subtitle: `Você finalizou o jogo em ${rounds} rodadas!`,
    buttons: [{
      label: 'Jogar de novo',
      onPress: () => {
        dispatch({ type: 'set_game_key', payload: Math.random().toString() })
      },
    }, {
      label: 'Sair',
      // @ts-ignore
      onPress: () => navigation.navigate('Home'),
    }],
  })
}

export default useSuccessModal
