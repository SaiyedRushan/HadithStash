import { StyleSheet, Image, Platform } from 'react-native'
import { Collapsible } from '@/components/Collapsible'
import { ExternalLink } from '@/components/ExternalLink'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import ContainerView from '@/components/ContainerView'
export default function TabTwoScreen() {
  return (
    <ContainerView>
      <ThemedText>Library</ThemedText>
    </ContainerView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
})
