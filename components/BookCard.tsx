import { Text, TouchableOpacity, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Tables } from '@/types/supabase'
import { router } from 'expo-router'
import { ThemedText } from './ThemedText'

export default function BookCard({ book }: { book: Tables<'books_metadata'> }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push(`/home/book/${book.id}` as any)}>
      <ThemedText>{book.english_title}</ThemedText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#004643',
    padding: 5,
    minWidth: 100,
    height: 100,
  },
})
