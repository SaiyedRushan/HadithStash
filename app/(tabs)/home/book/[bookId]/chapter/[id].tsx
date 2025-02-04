import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Tables } from '@/types/supabase'
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { supabase } from '@/libs/supabase'
import { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import HadithCard from '@/components/HadithCard'
import ContainerView from '@/components/ContainerView'
import { ThemedText } from '@/components/ThemedText'

type Hadith = Tables<'hadiths'> & { books_metadata: Tables<'books_metadata'>; chapters: Tables<'chapters'> }

export default function ChapterScreen() {
  const { bookId, id } = useLocalSearchParams()
  const [hadiths, setHadiths] = useState<Hadith[]>([])

  useEffect(() => {
    const fetchHadiths = async () => {
      const { data, error } = await supabase.from('hadiths').select('*, books_metadata(*), chapters(*)').eq('chapter_id', id).eq('book_id', bookId)
      if (error) {
        console.error('Error fetching hadiths:', error)
      } else {
        setHadiths(data)
      }
    }
    fetchHadiths()
  }, [])

  return (
    <ContainerView>
      <ThemedView style={styles.hadithsContainer}>
        <ThemedText>
          Book # {hadiths[0]?.books_metadata.id} - {hadiths[0]?.books_metadata.english_title}
        </ThemedText>
        <ThemedText>
          Chapter # {hadiths[0]?.chapters.id} - {hadiths[0]?.chapters.english}
        </ThemedText>
        <ThemedText>
          {hadiths.length} Hadith{hadiths.length > 1 ? 's' : ''}
        </ThemedText>
        {hadiths.map((hadith) => (
          <HadithCard key={hadith.id} hadith={hadith} />
        ))}
      </ThemedView>
    </ContainerView>
  )
}

const styles = StyleSheet.create({
  hadithsContainer: {
    gap: 14,
    marginBottom: 8,
  },
})
