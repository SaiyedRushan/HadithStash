import { Animated, Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Tables } from '@/types/supabase'
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { supabase } from '@/libs/supabase'
import { useEffect, useRef, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import HadithCard from '@/components/HadithCard'
import ContainerView from '@/components/ContainerView'
import { ThemedText } from '@/components/ThemedText'

type Hadith = Tables<'hadiths'> & { books_metadata: Tables<'books_metadata'>; chapters: Tables<'chapters'> }
const { height } = Dimensions.get('window')
const CARD_HEIGHT = height * 0.4 // Adjust this value as needed essentially 70% of the screen height

export default function ChapterScreen() {
  const { bookId, id } = useLocalSearchParams()
  const [hadiths, setHadiths] = useState<Hadith[]>([])
  const scrollY = useRef(new Animated.Value(0)).current
  const [activeIndex, setActiveIndex] = useState(0)

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
  }, [id, bookId])

  const renderHadithCard = ({ item, index }: { item: Hadith; index: number }) => {
    const inputRange = [(index - 1) * CARD_HEIGHT, index * CARD_HEIGHT, (index + 1) * CARD_HEIGHT]

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    })

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.5],
      extrapolate: 'clamp',
    })

    return (
      <Animated.View style={[styles.cardContainer, { transform: [{ scale }], opacity }]}>
        <HadithCard hadith={item} isActive={index === activeIndex} />
      </Animated.View>
    )
  }

  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: true,
    listener: (event) => {
      const newIndex = Math.round((event as any).nativeEvent.contentOffset.y / CARD_HEIGHT)
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    },
  })

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <ThemedText>
          Book # {hadiths[0]?.books_metadata.id} - {hadiths[0]?.books_metadata.english_title}
        </ThemedText>
        <ThemedText>
          Chapter # {hadiths[0]?.chapters.id} - {hadiths[0]?.chapters.english}
        </ThemedText>
        <ThemedText>
          {hadiths.length} Hadith{hadiths.length > 1 ? 's' : ''}
        </ThemedText>
      </ThemedView>

      {/* TODO: Scroll to the last read hadith. get the max hadith id for user */}
      <Animated.FlatList
        data={hadiths}
        renderItem={renderHadithCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={CARD_HEIGHT}
        snapToAlignment='start'
        decelerationRate='fast'
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  headerContainer: {
    gap: 14,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: CARD_HEIGHT / 2,
  },
  cardContainer: {
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
