import { View, StyleSheet, Text, TouchableOpacity, Animated, Easing, LayoutChangeEvent } from 'react-native'
import { Tables } from '@/types/supabase'
import { useRouter } from 'expo-router'
import { ThemedText } from './ThemedText'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface HadithCardProps {
  hadith: Tables<'hadiths'>
  isActive: boolean
}

export default function HadithCard({ hadith, isActive }: HadithCardProps) {
  const router = useRouter()
  const overlayAnim = useRef(new Animated.Value(0)).current
  const checkmarkOpacity = useRef(new Animated.Value(0)).current
  const [cardHeight, setCardHeight] = useState(0)
  const [isRead, setIsRead] = useState(false)

  const handleLayout = (event: LayoutChangeEvent) => {
    setCardHeight(event.nativeEvent.layout.height)
  }

  const handlePress = () => {
    router.push(`/home/book/${hadith.book_id}/chapter/${hadith.chapter_id}/hadith/${hadith.id}`)
  }

  const hadithText = `${hadith.english_narrator} ${hadith.english_text}`.trim()
  const formattedHadith = hadithText.replace(/<[^>]*>?/g, '').replace(/\s+/g, ' ')

  useEffect(() => {
    // TODO UPDATE LOGIC TO STORE AND RETRIEVE HADITH READ STATUS
    const checkReadStatus = async () => {
      try {
        const value = await AsyncStorage.getItem(`@hadith_read_${hadith.id}`)
        if (value !== null) {
          setIsRead(true)
          checkmarkOpacity.setValue(1)
        }
      } catch (error) {
        console.error('Error reading hadith status:', error)
      }
    }
    checkReadStatus()
  }, [])

  const updateLastReadBookmark = async () => {
    let res = await AsyncStorage.getItem(`@last_read_bookmark`)
    let lastReadBookmark: LastReadBookmark[] = res ? JSON.parse(res) : []
    if (lastReadBookmark.length >= 7) lastReadBookmark.shift()
    lastReadBookmark.push({
      bookId: hadith.book_id,
      chapterId: hadith.chapter_id,
      hadithId: hadith.id,
    })
    await AsyncStorage.setItem(`@last_read_bookmark`, JSON.stringify(lastReadBookmark))
  }

  const animationRef = useRef<Animated.CompositeAnimation | null>(null)

  useEffect(() => {
    if (isActive && !isRead) {
      // if the card is active and the hadith has not been read, start the sequence
      const duration = Math.min(5000, Math.max(2000, formattedHadith.length * 20))
      overlayAnim.setValue(0)
      checkmarkOpacity.setValue(0)
      animationRef.current = Animated.sequence([
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(checkmarkOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])

      animationRef.current.start(async (result) => {
        if (result.finished) {
          setIsRead(true)
          try {
            await AsyncStorage.setItem(`@hadith_read_${hadith.id}`, 'true')
            await updateLastReadBookmark()
          } catch (error) {
            console.error('Error saving hadith status:', error)
          }
        }
      })
    }
    return () => {
      // Cleanup: Stop animation if user swipes away
      if (animationRef.current) animationRef.current.stop()
    }
  }, [isActive, isRead, formattedHadith, hadith.id, overlayAnim, checkmarkOpacity])

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
      {isActive && !isRead && (
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
