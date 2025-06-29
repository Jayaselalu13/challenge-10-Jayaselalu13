"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface SearchBarProps {
  className?: string
  mobile?: boolean
}

export default function SearchBar({ className = "", mobile = false }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { user } = useAuth()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if user is authenticated
    if (!user) {
      // Redirect to login page if not authenticated
      router.push("/login")
      return
    }
    
    // Proceed with search if authenticated and query is not empty
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className={`rounded-xl border border-[#D5D7DA] h-12 flex items-center px-4 py-3 gap-2 bg-white ${className}`}
    >
      <button type="submit" className="shrink-0 hover:opacity-70 transition-opacity">
        <Search className="w-6 h-6 text-[#717680]" />
      </button>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 font-inter text-sm leading-7 tracking-[-0.03em] text-[#717680] bg-transparent border-none outline-none placeholder:text-[#717680]"
      />
    </form>
  )
}
