import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'
import ContainerView from '@/components/ContainerView'
import { ThemedText } from '@/components/ThemedText'

const HadithDetails = () => {
  const { id } = useLocalSearchParams()
  return (
    <ContainerView>
      <ThemedText>Hadith Details for id {id}</ThemedText>
    </ContainerView>
  )
}

export default HadithDetails
