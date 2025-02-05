import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { ThemedText } from './ThemedText'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { useState } from 'react'
import { supabase } from '@/libs/supabase'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function LastReadBar() {
  const [lastReadItems, setLastReadItems] = useState<LastReadItem[]>([])

  useEffect(() => {
    const fetchLastReadItemsFromStorage = async () => {
      setLastReadItems([])
      const res = await AsyncStorage.getItem('@last_read_bookmark')
      const parsedRes: LastReadBookmark[] = res ? JSON.parse(res) : []
      for (const item of parsedRes) {
        const { data, error } = await supabase.from('chapters').select('*, books_metadata(english_title)').match({ id: item.chapterId, book_id: item.bookId })
        if (error) console.error('error', error)
        if (data) setLastReadItems((prev) => [...prev, { ...data[0], hadith_id: item.hadithId }])
      }
    }
    return () => {
      fetchLastReadItemsFromStorage()
    }
  }, [])

  return (
    <View style={styles.container}>
      <ThemedText>Last Read:</ThemedText>

      <ScrollView horizontal contentContainerStyle={styles.linkContainer} showsHorizontalScrollIndicator={false}>
        {[...lastReadItems].reverse().map((item) => (
          <TouchableOpacity key={item.id} style={styles.item} onPress={() => router.push(`/home/book/${item.book_id}/chapter/${item.id}?hadithId=${item.hadith_id}`)}>
            <ThemedText>
              Book #{item.book_id} - Chapter - {item.english}
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
