"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Clear any existing mock data on startup
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
    setUser(null)
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      const mockUser: User = {
        id: "user-123",
        name: "John Doe",
        email: email,
        avatar: "/image-6.png",
      }

      const mockToken = "mock-jwt-token-" + Date.now()

      // Store in localStorage
      localStorage.setItem("auth_token", mockToken)
      localStorage.setItem("user_data", JSON.stringify(mockUser))

      setUser(mockUser)
    } catch (error) {
      throw new Error("Login failed")
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful registration
      const mockUser: User = {
        id: "user-" + Date.now(),
        name: name,
        email: email,
        avatar: "/image-6.png",
      }

      const mockToken = "mock-jwt-token-" + Date.now()

      // Store in localStorage
      localStorage.setItem("auth_token", mockToken)
      localStorage.setItem("user_data", JSON.stringify(mockUser))

      setUser(mockUser)
    } catch (error) {
      throw new Error("Registration failed")
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
