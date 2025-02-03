import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' options={{ title: 'Home' }} />
      <Stack.Screen name='book/[bookId]' options={{ title: 'Book Details' }} />
      <Stack.Screen name='book/[bookId]/chapter/[chapterId]' options={{ title: 'Chapter Details' }} />
      <Stack.Screen name='book/[bookId]/chapter/[chapterId]/hadith/[hadithId]' options={{ title: 'Hadith Details' }} />
    </Stack>
  )
}
