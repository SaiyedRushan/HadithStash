import { View, StyleSheet, Text, TouchableOpacity, Animated, Easing, LayoutChangeEvent } from 'react-native'
import { Tables } from '@/types/supabase'
import { useRouter } from 'expo-router'
import { ThemedText } from './ThemedText'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useEffect, useRef, useState } from 'react'

interface HadithCardProps {
  hadith: Tables<'hadiths'>
  isActive: boolean
}

export default function HadithCard({ hadith, isActive }: HadithCardProps) {
  const router = useRouter()
  const overlayAnim = useRef(new Animated.Value(0)).current
  const checkmarkOpacity = useRef(new Animated.Value(0)).current
  const [cardHeight, setCardHeight] = useState(0)

  const handleLayout = (event: LayoutChangeEvent) => {
    setCardHeight(event.nativeEvent.layout.height)
  }
  const handlePress = () => {
    router.push(`/home/book/${hadith.book_id}/chapter/${hadith.chapter_id}/hadith/${hadith.id}`)
  }
  const hadithText = `${hadith.english_narrator} ${hadith.english_text}`.trim()
  const formattedHadith = hadithText.replace(/<[^>]*>?/g, '').replace(/\s+/g, ' ')

  useEffect(() => {
    if (isActive) {
      // Calculate animation duration based on text length
      const duration = Math.min(5000, Math.max(2000, formattedHadith.length * 20))
      Animated.sequence([
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(checkmarkOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      // Reset animations when card becomes inactive
      overlayAnim.setValue(0)
      checkmarkOpacity.setValue(0)
    }
  }, [isActive, formattedHadith, overlayAnim, checkmarkOpacity])
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} onLayout={handleLayout}>
      <View style={{ gap: 10 }}>
        <ThemedText numberOfLines={9} ellipsizeMode='tail' style={{ fontSize: 16, lineHeight: 30, letterSpacing: 1 }}>
          {formattedHadith}
        </ThemedText>

        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <ThemedText style={{ fontSize: 12 }}>Hadith Id: {hadith.id_in_book}</ThemedText>
          <ThemedText style={{ fontSize: 12 }}>Chapter Id: {hadith.chapter_id}</ThemedText>
          <ThemedText style={{ fontSize: 12 }}>Book Id: {hadith.book_id}</ThemedText>
          <Animated.View style={{ opacity: checkmarkOpacity }}>
            <Ionicons name='checkmark-circle' size={22} color='lightgreen' />
          </Animated.View>
        </View>
      </View>
      {isActive && (
        <Animated.View
          style={[
            styles.overlay,
            {
              transform: [
                {
                  translateY: overlayAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, cardHeight], // Adjust this value based on your card's max height
                  }),
                },
              ],
            },
          ]}
        />
      )}
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
    overflow: 'hidden', // This is important for the overlay
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(41, 244, 0, 0.15)',
  },
})
