import { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import ContainerView from '@/components/ContainerView'
import LastReadBar from '@/components/LastReadBar'
import { supabase } from '@/libs/supabase'
import { Tables } from '@/types/supabase'
import BookCard from '@/components/BookCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

export default function HomeScreen() {
  const [books, setBooks] = useState<Tables<'books_metadata'>[]>([])
  const [lastReadItems, setLastReadItems] = useState<LastReadItem[]>([])
  const lastStorageDataRef = useRef<string>('')

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase.from('books_metadata').select('*')
      if (error) {
        console.error(error)
      } else {
        setBooks(data)
      }
    }
    fetchBooks()
  }, [])

  const fetchLastReadItemsFromStorage = useCallback(async () => {
    const res = await AsyncStorage.getItem('@last_read_bookmark')
    // If there's no new data, or it's the same as before, don't update
    if (!res || res === lastStorageDataRef.current) return
    // Update our reference to the latest storage data
    lastStorageDataRef.current = res
    const parsedRes: LastReadBookmark[] = res ? JSON.parse(res) : []
    const newLastReadItems: LastReadItem[] = []
    for (const item of parsedRes) {
      const { data, error } = await supabase.from('chapters').select('*, books_metadata(english_title)').match({ id: item.chapterId, book_id: item.bookId })
      if (error) {
        console.error('error', error)
        continue
      }
      if (data && data[0]) {
        newLastReadItems.push({ ...data[0], hadith_id: item.hadithId })
      }
    }
    if (newLastReadItems.length > 0) {
      setLastReadItems(newLastReadItems)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchLastReadItemsFromStorage()
    }, [fetchLastReadItemsFromStorage])
  )

  return (
    <ContainerView>
      <ThemedText type='title'>Salam Rushan!</ThemedText>
      <LastReadBar lastReadItems={lastReadItems} />
      <ThemedText type='subtitle' style={{ marginBottom: 10 }}>
        Books
      </ThemedText>
      <ThemedView style={styles.bookContainer}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </ThemedView>
    </ContainerView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hadithsContainer: {
    gap: 14,
    marginBottom: 8,
  },
  bookContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
})
