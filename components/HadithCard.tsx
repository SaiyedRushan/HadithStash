import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native'
import { Tables } from '@/types/supabase'
import { useRouter } from 'expo-router'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import { FadeIn } from 'react-native-reanimated'
import { FadeOut } from 'react-native-reanimated'
import Ionicons from '@expo/vector-icons/Ionicons'

interface HadithCardProps {
  hadith: Tables<'hadiths'>
}

export default function HadithCard({ hadith }: HadithCardProps) {
  const router = useRouter()
  const handlePress = () => {
    router.push(`/home/book/${hadith.book_id}/chapter/${hadith.chapter_id}/hadith/${hadith.id}`)
  }
  const hadithText = `${hadith.english_narrator} ${hadith.english_text}`.trim()
  const formattedHadith = hadithText.replace(/<[^>]*>?/g, '').replace(/\s+/g, ' ')

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={{ gap: 10 }}>
        <ThemedText numberOfLines={9} ellipsizeMode='tail' style={{ fontSize: 16, lineHeight: 30, letterSpacing: 1 }}>
          {formattedHadith}
        </ThemedText>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <ThemedText style={{ fontSize: 12 }}>Hadith Id: {hadith.id_in_book}</ThemedText>
          <ThemedText style={{ fontSize: 12 }}>Chapter Id: {hadith.chapter_id}</ThemedText>
          <ThemedText style={{ fontSize: 12 }}>Book Id: {hadith.book_id}</ThemedText>
          {/* a green checkmark icon on finish reading animation */}
          <Ionicons name='checkmark-circle' size={22} color='lightgreen' />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: '#000000',
    padding: 10,
    maxHeight: 600,
    borderWidth: 2,
    borderColor: '#333333',
    elevation: 10,
    boxShadow: '0px 0px 10px 0px rgba(41, 244, 0, 0.15)',
  },
})
