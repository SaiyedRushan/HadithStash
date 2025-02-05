import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { ThemedText } from './ThemedText'
import { router } from 'expo-router'

export default function LastReadBar({ lastReadItems }: { lastReadItems: LastReadItem[] }) {
  return (
    <View style={styles.container}>
      <ThemedText>Last Read:</ThemedText>
      <ScrollView horizontal contentContainerStyle={styles.linkContainer} showsHorizontalScrollIndicator={false}>
        {[...lastReadItems].reverse().map((item) => (
          <TouchableOpacity key={item.hadith_id} style={styles.item} onPress={() => router.push(`/home/book/${item.book_id}/chapter/${item.id}?hadithId=${item.hadith_id}`)}>
            <ThemedText>
              Book #{item.book_id} - Chapter: {item.english}
            </ThemedText>
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
    backgroundColor: '#004643',
    borderRadius: 10,
    padding: 8,
  },
})
