import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='+not-found' />
            {/*  will show chapters in the books */}
            <Stack.Screen name='book/[id]' options={{ headerShown: false }} />
            {/* will show hadiths in the chapters */}
            <Stack.Screen name='book/[id]/chapter/[chapterId]' options={{ headerShown: false }} />
            {/* will show hadith details */}
            <Stack.Screen name='hadith/[id]' options={{ headerShown: false }} />
          </Stack>
          <StatusBar style='auto' />
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
