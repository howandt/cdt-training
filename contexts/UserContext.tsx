'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type UserProfile = {
  name: string
  role: string
  language: string
  informationDepth: string
  completed: boolean
  casesCompleted: number
}

type UserContextType = {
  user: UserProfile
  setUser: (user: UserProfile) => void
}

const defaultUser: UserProfile = {
  name: '',
  role: '',
  language: '',
  informationDepth: '',
  completed: false,
  casesCompleted: 0,
}

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {},
})

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}