import React from 'react'
import { ChevronLeft } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import TouchableScale from './TouchableScale'

const BackButton: React.FC = () => {
  const navigation = useNavigation()
  
  return (
    <TouchableScale style={{ left: -10 }} onPress={() => navigation.goBack()}>
      <ChevronLeft stroke='#333' width={40} height={40} />
    </TouchableScale>
  )
}

export default BackButton
