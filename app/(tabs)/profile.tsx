import ContainerView from '@/components/ContainerView'
import { ThemedText } from '@/components/ThemedText'
import { StyleSheet } from 'react-native'

export default function ProfileScreen() {
  return (
    <ContainerView>
      <ThemedText>Profile</ThemedText>
    </ContainerView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
