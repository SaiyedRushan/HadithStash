import { useState } from 'react'
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { supabase } from '../libs/supabase'
import ContainerView from './ContainerView'
import { router } from 'expo-router'
import { Input, Button, Text } from '@rneui/themed'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'

export default function Auth({ onSkip }: { onSkip: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert(error.message)
      return
    }
    setLoading(false)
    router.push('/home')
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    else Alert.alert('Check your email for the login link!')
    setLoading(false)
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) Alert.alert(error.message)
  }

  return (
    <ContainerView>
      <ThemedView style={styles.verticallySpaced}>
        <ThemedText type='subtitle'>Welcome, Log in or Sign up below!</ThemedText>
      </ThemedView>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label='Email'
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder='email@address.com'
          autoCapitalize='none'
          keyboardType='email-address'
          style={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label='Password'
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder='Password'
          autoCapitalize='none'
          style={styles.input}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title='Sign in' disabled={loading} onPress={() => signInWithEmail()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title='Sign up' disabled={loading} onPress={() => signUpWithEmail()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title='Sign in with Google' onPress={() => signInWithGoogle()} />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </ContainerView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    marginLeft: 5,
    color: 'white',
  },
  skipButton: {
    alignItems: 'center',
    padding: 10,
  },
  skipButtonText: {
    color: '#3498db',
    fontSize: 16,
  },
})
