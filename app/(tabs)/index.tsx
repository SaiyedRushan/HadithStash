import { Platform, StyleSheet } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import ContainerView from '@/components/ContainerView'
import HadithCard from '@/components/HadithCard'
import LastReadBar from '@/components/LastReadBar'

export default function HomeScreen() {
  const hadiths = [
    {
      id: 1,
      english: {
        narrator: 'Abu Hurairah',
        text: 'The Messenger of Allah (ﷺ) said: “The believer is like a precious jewel, which is immersed in a sea of mud, but its luster is not impaired.The Messenger of Allah (ﷺ) said: “The believer is like a precious jewel, which is immersed in a sea of mud, but its luster is not impaired.The Messenger of Allah (ﷺ) said: “The believer is like a precious jewel, which is immersed in a sea of mud, but its luster is not impaired.The Messenger of Allah (ﷺ) said: “The believer is like a precious jewel, which is immersed in a sea of mud, but its luster is not impaired.”',
      },
    },
    {
      id: 1,
      english: {
        narrator: 'Abu Hurairah',
        text: 'The Messenger of Allah (ﷺ) said: “The believer is like a precious jewel, which is immersed in a sea of mud, but its luster is not impaired.”',
      },
    },
    {
      id: 1,
      english: {
        narrator: 'Abu Hurairah',
        text: 'The Messenger of Allah (ﷺ) said: “The believer is like a precious jewel, which is immersed in a sea of mud, but its luster is not impaired.”',
      },
    },
    {
      id: 1,
      english: {
        narrator: 'Abu Hurairah',
        text: 'The Messenger of Allah (ﷺ) said: “The believer is like a precious jewel, which is immersed in a sea of mud, but its luster is not impaired.”',
      },
    },
    {
      id: 1,
      english: {
        narrator: 'Abu Hurairah',
        text: 'The Messenger of Allah (ﷺ) said: “The believer is like a precious jewel, which is immersed in a sea of mud, but its luster is not impaired.”',
      },
    },
    {
      id: 1,
      english: {
        narrator: 'Abu Hurairah',
        text: 'The Messenger of Allah (ﷺ) said: “The believer is like a precious jewel, which is immersed in a sea of mud, but its luster is not impaired.”',
      },
    },

    {
      id: 1,
      english: {
        narrator: 'Abu Hurairah',
        text: 'The Messenger of Allah (ﷺ) said: “The believer is like a precious jewel, which is immersed in a sea of mud, but its luster is not impaired.”',
      },
    },

    {
      id: 1,
      english: {
        narrator: 'Abu Hurairah',
        text: 'The Messenger of Allah (ﷺ) said: “The believer is like a precious jewel, which is immersed in a sea of mud, but its luster is not impaired.”',
      },
    },

    {
      id: 1,
      english: {
        narrator: 'Abu Hurairah',
        text: 'The Messenger of Allah (ﷺ) said: “The believer is like a precious jewel, which is immersed in a sea of mud, but its luster is not impaired.”',
      },
    },
  ]

  return (
    <ContainerView>
      <ThemedText type='title'>Salam Rushan!</ThemedText>
      <LastReadBar />
      <ThemedView style={styles.hadithsContainer}>
        {hadiths.map((hadith) => (
          <HadithCard key={Math.random()} hadith={hadith} />
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
})
