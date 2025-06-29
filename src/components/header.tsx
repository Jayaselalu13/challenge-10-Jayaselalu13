"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, PenLine, ChevronDown, LogOut, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import SearchBar from "@/components/search-bar"

export default function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    logout()
    toast({
      title: "Success",
      description: "Logged out successfully!",
    })
    router.push("/")
  }

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block fixed top-0 left-0 right-0 bg-white border-b border-[#D5D7DA] h-20 z-50">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-0 h-full flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-[9.6px] font-outfit shrink-0 min-w-0 hover:opacity-80 transition-opacity cursor-pointer">
            <img 
              src="/logo-symbol.png" 
              alt="Logo Symbol" 
              className="w-[29.6px] h-[32.5px] object-cover shrink-0" 
            />
            <div className="text-xl lg:text-2xl font-semibold text-[#0A0D12] leading-9 whitespace-nowrap">
              Your Logo
            </div>
          </Link>

          {/* Search Bar */}
          <SearchBar className="w-full max-w-[373px] min-w-[150px] mx-2 lg:mx-4" />

          {/* User Actions */}
          <div className="flex items-center gap-3 lg:gap-6 text-[#0093DD] shrink-0">
            {user ? (
              <>
                {/* Write Post Link */}
                <Link href="/write" className="flex items-center gap-2">
                  <PenLine className="w-4 h-4 text-[#0093DD]" />
                  <div className="text-sm leading-7 tracking-[-0.03em] font-semibold text-[#0093DD] whitespace-nowrap">
                    Write Post
                  </div>
                </Link>

                {/* User Profile */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar || "/placeholder-user.jpg"} alt={user.name} />
                        <AvatarFallback className="bg-[#0093DD] text-white text-sm">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm leading-7 tracking-[-0.03em] font-semibold text-[#0A0D12] whitespace-nowrap">
                        {user.name}
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-red-600 focus:text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                {/* Login Link */}
                <Link href="/login" className="flex items-center">
                  <div className="text-sm leading-7 tracking-[-0.03em] font-semibold underline whitespace-nowrap">
                    Login
                  </div>
                </Link>

                {/* Divider */}
                <div className="w-px bg-[#9CA3AF] h-6 shrink-0" />

                {/* Register Button */}
                <Link href="/register">
                  <button className="w-[140px] lg:w-[182px] rounded-full bg-[#0093DD] h-11 flex justify-center items-center px-2">
                    <div className="text-sm leading-7 tracking-[-0.03em] font-semibold text-white whitespace-nowrap">
                      Register
                    </div>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-[#D5D7DA] sticky top-0 z-50">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
            <img src="/logo-symbol.png" alt="Logo" className="w-6 h-6" />
            <span className="text-lg font-semibold text-[#0A0D12] font-outfit">Your Logo</span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link href="/write">
                  <Button variant="ghost" size="sm" className="text-[#0093DD] flex items-center gap-1">
                    <PenLine className="w-4 h-4" />
                    Write Post
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-red-600 focus:text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-[#0093DD]">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-[#0093DD] hover:bg-blue-600 text-white">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
