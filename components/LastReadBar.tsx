import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { ThemedText } from './ThemedText'
import { router } from 'expo-router'

export default function LastReadBar() {
  const lastReadItems = [
    {
      hadithId: '1',
      title: 'Hadith 1',
    },
    {
      hadithId: '2',
      title: 'Hadith 2',
    },
    {
      hadithId: '2',
      title: 'Hadith 2',
    },
    {
      hadithId: '2',
      title: 'Hadith 2',
    },
    {
      hadithId: '2',
      title: 'Hadith 2',
    },
    {
      hadithId: '2',
      title: 'Hadith 2',
    },
    {
      hadithId: '2',
      title: 'Hadith 2',
    },
    {
      hadithId: '2',
      title: 'Hadith 2',
    },
  ]
  return (
    <View style={styles.container}>
      <ThemedText>Last Read:</ThemedText>
      <ScrollView horizontal contentContainerStyle={styles.linkContainer} showsHorizontalScrollIndicator={false}>
        {lastReadItems.map((item) => (
          <TouchableOpacity key={item.hadithId} style={styles.item} onPress={() => router.push({ pathname: '/hadith/[id]', params: { id: item.hadithId } })}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 16,
    gap: 8,
  },
  linkContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
  },
})
