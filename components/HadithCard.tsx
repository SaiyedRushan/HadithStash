import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Hadith } from '@/types/Hadith'
import { ThemedText } from './ThemedText'
import { useRouter } from 'expo-router'
interface HadithCardProps {
  hadith: any
}

export default function HadithCard({ hadith }: HadithCardProps) {
  //route to hadith details page
  const router = useRouter()
  const handlePress = () => {
    router.push({
      pathname: '/hadith/[id]',
      params: { id: hadith.id },
    })
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Text>{hadith.english.narrator}</Text>
      <Text>{hadith.english.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    maxHeight: 600,
  },
})
