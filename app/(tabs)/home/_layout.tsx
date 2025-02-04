import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' options={{ title: 'Home' }} />
      <Stack.Screen name='book/[id]' options={{ title: 'Book Details' }} />
      <Stack.Screen name='book/[bookId]/chapter/[id]' options={{ title: 'Chapter Details' }} />
      <Stack.Screen name='book/[bookId]/chapter/[chapterId]/hadith/[id]' options={{ title: 'Hadith Details' }} />
    </Stack>
  )
}
