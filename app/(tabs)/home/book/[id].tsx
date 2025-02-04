import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Tables } from '@/types/supabase'
import { router, useLocalSearchParams } from 'expo-router'
import { supabase } from '@/libs/supabase'
import { useEffect, useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import ContainerView from '@/components/ContainerView'

type Chapter = Tables<'chapters'> & { books_metadata: Tables<'books_metadata'> }

export default function BookScreen() {
  const { id } = useLocalSearchParams()
  const [chapters, setChapters] = useState<Chapter[]>([])

  useEffect(() => {
    const fetchChapters = async () => {
      const { data, error } = await supabase.from('chapters').select('*, books_metadata(*)').eq('book_id', id)

      if (error) {
        console.error(error)
      } else {
        setChapters(data)
      }
    }
    fetchChapters()
  }, [])

  return (
    <ContainerView>
      <ThemedView style={{ gap: 10 }}>
        <ThemedText>
          Book # {id} - {chapters[0]?.books_metadata.english_title}{' '}
        </ThemedText>
        <ThemedText>
          {chapters.length} Chapter{chapters.length > 1 ? 's' : ''}
        </ThemedText>

        {chapters.map((chapter) => (
          <TouchableOpacity key={chapter.id} style={styles.chapterContainer} onPress={() => router.push(`/home/book/${id}/chapter/${chapter.id.toString()}`)}>
            <ThemedText>{chapter.english}</ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ContainerView>
  )
}

const styles = StyleSheet.create({
  chapterContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#004643',
  },
})
