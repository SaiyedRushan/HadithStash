import { ScrollView, StyleSheet } from 'react-native'

import { ThemedView } from './ThemedView'

export default function ContainerView({ children }: { children: React.ReactNode }) {
  return (
    <ThemedView style={styles.container}>
      <ScrollView>{children}</ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
})
