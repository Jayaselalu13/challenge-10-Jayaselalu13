"use client"

import type React from "react"
import type { FunctionComponent } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, PenLine } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const SearchHeaderDesktop: FunctionComponent = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || "Frontend Development"
  const router = useRouter()
  const { user } = useAuth()

  const handleWritePostClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) {
      router.push("/login")
      return
    }
    router.push("/write")
  }

  return (
    <div className="w-full relative bg-white border-[#D5D7DA] border-solid border-b-[1px] box-border h-20 flex items-center justify-center">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-0 h-full flex items-center justify-between gap-4 w-full">
        <Link href="/" className="flex items-center gap-[9.6px] font-outfit shrink-0 min-w-0 hover:opacity-80 transition-opacity cursor-pointer">
          <img className="w-[29.6px] h-[32.5px] object-cover shrink-0" alt="Logo Symbol" src="/logo-symbol.png" />
          <div className="text-xl lg:text-2xl font-semibold text-[#0A0D12] leading-9 whitespace-nowrap">Your Logo</div>
        </Link>
        
        <div className="w-full max-w-[373px] min-w-[150px] mx-2 lg:mx-4 rounded-xl border-[#D5D7DA] border-solid border-[1px] box-border h-12 flex items-center justify-start py-3 px-4 gap-2">
          <Search className="w-6 h-6 text-[#717680] shrink-0" />
          <div className="text-sm tracking-[-0.03em] leading-7 text-[#717680]">{query}</div>
        </div>
        
        <div className="flex items-center gap-3 lg:gap-6 text-[#0093DD] shrink-0">
          {user ? (
            <>
              <button onClick={handleWritePostClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <PenLine className="w-4 h-4 text-[#0093DD] shrink-0" />
                <div className="text-sm tracking-[-0.03em] leading-7 font-semibold whitespace-nowrap text-[#0093DD]">
                  Write Post
                </div>
              </button>
              <div className="w-px border-[#D5D7DA] border-solid border-r-[1px] box-border h-6" />
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar || "/placeholder-user.jpg"} alt={user.name} />
                  <AvatarFallback className="bg-[#0093DD] text-white text-sm">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm tracking-[-0.03em] leading-7 font-semibold text-[#181D27] whitespace-nowrap">
                  {user.name}
                </div>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="flex items-center">
                <div className="text-sm leading-7 tracking-[-0.03em] font-semibold underline whitespace-nowrap">
                  Login
                </div>
              </Link>
              <div className="w-px bg-[#9CA3AF] h-6 shrink-0" />
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
    </div>
  )
}

const SearchHeaderMobile: FunctionComponent = () => {
  const { user } = useAuth()
  
  return (
    <div className="w-full relative bg-white border-[#D5D7DA] border-solid border-b-[1px] box-border h-16 flex items-center justify-between py-0 px-4 gap-4 text-left text-base text-[#0A0D12] font-outfit">
      <Link href="/" className="flex items-center gap-[6.4px] shrink-0 min-w-0 hover:opacity-80 transition-opacity cursor-pointer">
        <img className="w-[19.7px] h-[21.6px] object-cover shrink-0" alt="Logo Symbol" src="/logo-symbol.png" />
        <div className="text-lg font-semibold leading-6 whitespace-nowrap">Your Logo</div>
      </Link>
      {user ? (
        <Avatar className="w-8 h-8">
          <AvatarImage src={user.avatar || "/placeholder-user.jpg"} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      ) : (
        <img className="w-10 h-10 object-cover rounded-full" alt="User Avatar" src="/image-6.png" />
      )}
    </div>
  )
}

export { SearchHeaderDesktop, SearchHeaderMobile }
