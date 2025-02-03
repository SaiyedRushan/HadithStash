import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Tables } from '@/types/supabase'
import { useLocalSearchParams } from 'expo-router'
import { supabase } from '@/libs/supabase'
import { useEffect, useState } from 'react'
import ContainerView from '@/components/ContainerView'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

export default function HadithScreen() {
  const { id } = useLocalSearchParams()
  const [hadith, setHadith] = useState<Tables<'hadiths'> & { chapters: Tables<'chapters'>; books_metadata: Tables<'books_metadata'> }>()

  useEffect(() => {
    const fetchHadith = async () => {
      const { data, error } = await supabase.from('hadiths').select('*, chapters(*), books_metadata(*)').eq('id', id)
      if (error) {
        console.error(error)
      } else {
        const fullHadith = `${data[0].english_narrator} ${data[0].english_text}`
        const formattedHadith = fullHadith.replace(/<[^>]*>?/g, '').replace(/\s+/g, ' ')
        setHadith({ ...data[0], english_text: formattedHadith })
      }
    }
    fetchHadith()
  }, [])

  return (
    <ContainerView>
      <ThemedView style={{ gap: 30 }}>
        <ThemedText>
          Book # {hadith?.books_metadata.id} - {hadith?.books_metadata.english_title}
        </ThemedText>
        <ThemedText>
          Chapter # {hadith?.chapters.id} - {hadith?.chapters.english}
        </ThemedText>
        <ThemedText>{hadith?.arabic}</ThemedText>
        <ThemedText>{hadith?.english_text}</ThemedText>
        <ThemedText>Hadith Id in Book: {hadith?.id_in_book}</ThemedText>
      </ThemedView>
    </ContainerView>
  )
}

const styles = StyleSheet.create({})
