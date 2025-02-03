import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import ContainerView from '@/components/ContainerView'
import LastReadBar from '@/components/LastReadBar'
import { supabase } from '@/libs/supabase'
import { Tables } from '@/types/supabase'
import BookCard from '@/components/BookCard'

export default function HomeScreen() {
  const [books, setBooks] = useState<Tables<'books_metadata'>[]>([])

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

  return (
    <ContainerView>
      <ThemedText type='title'>Salam Rushan!</ThemedText>
      <LastReadBar />
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
    gap: 8,
  },
})
