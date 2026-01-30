import React, { createContext, useContext, useMemo, useState } from 'react'

type AuthState = {
  isAuthed: boolean
  email: string | null
}

type AuthContextValue = AuthState & {
  signIn: (email: string) => void
  signOut: () => void
}

const KEY_AUTH = 'auth:v1'
const KEY_EMAIL = 'authEmail:v1'

const AuthContext = createContext<AuthContextValue | null>(null)

function loadAuth(): AuthState {
  const isAuthed = localStorage.getItem(KEY_AUTH) === '1'
  const email = localStorage.getItem(KEY_EMAIL)
  return { isAuthed, email: isAuthed ? email : null }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => loadAuth())

  const value = useMemo<AuthContextValue>(() => {
    function signIn(email: string) {
      localStorage.setItem(KEY_AUTH, '1')
      localStorage.setItem(KEY_EMAIL, email)
      setState({ isAuthed: true, email })
    }

    function signOut() {
      localStorage.removeItem(KEY_AUTH)
      localStorage.removeItem(KEY_EMAIL)
      setState({ isAuthed: false, email: null })
    }

    return { ...state, signIn, signOut }
  }, [state])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}