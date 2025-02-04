import { supabase } from '@/libs/supabase'
import { useState, useEffect } from 'react'
import { Redirect } from 'expo-router'
import { Session } from '@supabase/supabase-js'
import Auth from '@/components/Auth'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (session && session.user) || skipped ? <Redirect href='/home' /> : <Auth onSkip={() => setSkipped(true)} />
}
