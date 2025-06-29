"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import { ThumbsUp, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useQuery } from "@tanstack/react-query"
import { blogApi, BlogPost } from "@/services/api"

export default function HomePage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [mostLikedPosts, setMostLikedPosts] = useState<BlogPost[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(3)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
    fetchMostLikedPosts()
  }, [currentPage])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const fetchedPosts = await blogApi.getPosts(currentPage, 10)
      setPosts(fetchedPosts)
      setTotalPages(3) // This would come from API pagination info
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMostLikedPosts = async () => {
    try {
      const fetchedMostLiked = await blogApi.getMostLikedPosts(1, 3)
      setMostLikedPosts(fetchedMostLiked)
    } catch (error) {
      console.error("Error fetching most liked posts:", error)
    }
  }

  const handleLike = async (postId: string | number) => {
    try {
      await blogApi.likePost(postId)
      
      // Update posts state
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
            : post,
        ),
      )

      // Update most liked posts state
      setMostLikedPosts(
        mostLikedPosts.map((post) =>
          post.id === postId
            ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
            : post,
        ),
      )
    } catch (error) {
      console.error("Error liking post:", error)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Helper to get image URL with fallback
  const getImageUrl = (imageUrl?: string) => {
    return imageUrl || "/image-5.png"
  }

  // Helper to get avatar URL with fallback
  const getAvatarUrl = (avatarUrl?: string) => {
    return avatarUrl || "/image-6.png"
  }

  if (loading) {
    return (
      <div className="w-full relative bg-white min-h-screen">
        <Header />
        <div className="animate-pulse max-w-[1200px] mx-auto px-4 py-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:block w-full relative bg-white min-h-screen text-left text-sm text-[#9CA3AF] font-inter">
        <Header />



        {/* Main Content */}
        <div className="absolute top-[128px] left-1/2 transform -translate-x-1/2 w-full max-w-[1200px] px-4 lg:px-0 flex flex-col items-start justify-start text-[#374151] pb-24">
          <div className="self-stretch flex flex-col lg:flex-row items-start justify-start gap-6 lg:gap-12">
            {/* Main Content Area */}
            <div className="w-full lg:w-[807px] flex flex-col items-start justify-start gap-6">
              <h1 className="w-full relative text-[28px] tracking-[-0.03em] leading-[38px] font-bold">
                Recommend For You
              </h1>

              {/* Blog Posts */}
              {posts.map((post, index) => (
                <div key={`main-${post.id}`} className="w-full">
                  <div className="w-full bg-white flex flex-row items-start justify-start gap-6">
                    <Link href={`/post/${post.id}`}>
                      <img 
                        className="w-[340px] relative rounded-md h-[258px] object-cover hover:opacity-90 transition-opacity cursor-pointer" 
                        alt="" 
                        src={getImageUrl(post.imageUrl)} 
                      />
                    </Link>
                    <div className="flex-1 flex flex-col items-start justify-start gap-4">
                      <div className="self-stretch flex flex-col items-start justify-start gap-3">
                        <Link href={`/post/${post.id}`}>
                          <h2 className="self-stretch relative text-xl tracking-[-0.03em] leading-[34px] font-bold text-[#181D27] cursor-pointer hover:text-[#0093DD] transition-colors">
                            {post.title}
                          </h2>
                        </Link>
                        <div className="flex flex-row items-start justify-start gap-2 flex-wrap">
                          {post.tags.map((tag, tagIndex) => (
                            <div
                              key={`main-${post.id}-tag-${tagIndex}`}
                              className="rounded-lg bg-white border-[#D5D7DA] border-solid border-[1px] box-border h-7 flex flex-row items-center justify-center p-2"
                            >
                              <div className="relative text-xs tracking-[-0.03em] leading-6 text-[#181D27]">{tag}</div>
                            </div>
                          ))}
                        </div>
                        <div className="self-stretch relative text-sm tracking-[-0.03em] leading-7 text-[#181D27] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                          {post.content}
                        </div>
                      </div>
                      <div className="self-stretch flex flex-row items-center justify-start gap-3">
                        <div className="flex flex-row items-center justify-start gap-2">
                          <img
                            className="w-10 relative rounded-[50%] max-h-full object-cover"
                            alt=""
                            src={getAvatarUrl(post.author.avatarUrl)}
                          />
                          <div className="relative tracking-[-0.03em] leading-7 font-medium text-sm text-[#181D27]">
                            {post.author.name}
                          </div>
                        </div>
                        <div className="w-1 relative rounded-[50%] bg-[#535862] h-1" />
                        <div className="relative tracking-[-0.03em] leading-7 text-[#535862] text-sm">
                          {new Date(post.createdAt).toLocaleDateString('en-US', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-start gap-5 text-[#535862]">
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex flex-row items-center justify-start gap-1.5 hover:text-red-500 transition-colors"
                        >
                          <ThumbsUp className={`w-5 relative h-5 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                          <div className="relative tracking-[-0.03em] leading-7 text-sm">{post.likes}</div>
                        </button>
                        <div className="flex flex-row items-center justify-start gap-1.5">
                          <MessageSquare className="w-5 relative h-5 overflow-hidden shrink-0" />
                          <div className="relative tracking-[-0.03em] leading-7 text-sm">{post.comments}</div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-1.5 opacity-0">
                          <MessageSquare className="w-5 relative h-5 overflow-hidden shrink-0" />
                          <div className="relative tracking-[-0.03em] leading-7 text-sm">20</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < posts.length - 1 && (
                    <div className="w-full relative border-[#E5E7EB] border-solid border-t-[1px] box-border h-px my-6" />
                  )}
                </div>
              ))}

              {/* Pagination */}
              <div className="self-stretch flex flex-row items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 flex flex-row items-center justify-center gap-1 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-[#374151]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Previous</span>
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 rounded-full box-border flex flex-row items-center justify-center text-sm font-medium transition-colors ${
                      currentPage === i + 1
                        ? "bg-[#0093DD] text-white"
                        : "border-[#E5E7EB] border-solid border-[1px] text-[#374151] hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <span className="px-2 text-[#9CA3AF] text-sm">...</span>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 flex flex-row items-center justify-center gap-1 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-[#374151]"
                >
                  <span className="text-sm font-medium">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Footer */}
              <div className="self-stretch flex flex-row items-center justify-center mt-16 pt-8 border-t border-[#E5E7EB]">
                <div className="relative tracking-[-0.03em] leading-7 text-[#9CA3AF] text-sm">
                  © 2025 Web Programming Hack Blog All rights reserved.
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[357px] flex flex-col items-start justify-start gap-8">
              <div className="self-stretch flex flex-col items-start justify-start gap-6">
                <h2 className="self-stretch relative text-xl tracking-[-0.03em] leading-7 font-bold text-[#374151]">
                  Most Liked
                </h2>
                <div className="self-stretch flex flex-col items-start justify-start gap-6">
                  {mostLikedPosts.map((post, index) => (
                    <div key={`liked-${post.id}`}>
                      <div className="self-stretch flex flex-col items-start justify-start gap-3">
                        <Link href={`/post/${post.id}`}>
                          <h3 className="self-stretch relative text-base tracking-[-0.03em] leading-6 font-bold text-[#374151] hover:text-[#0093DD] transition-colors cursor-pointer">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="self-stretch relative text-sm tracking-[-0.03em] leading-6 text-[#9CA3AF] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                          {post.content}
                        </p>
                        <div className="self-stretch flex flex-row items-center justify-start gap-3">
                          <div className="flex flex-row items-center justify-start gap-2">
                            <img
                              className="w-6 relative rounded-[50%] h-6 object-cover"
                              alt=""
                              src={getAvatarUrl(post.author.avatarUrl)}
                            />
                            <div className="relative text-xs tracking-[-0.03em] leading-5 font-medium text-[#374151]">
                              {post.author.name}
                            </div>
                          </div>
                          <div className="w-1 relative rounded-[50%] bg-[#6B7280] h-1" />
                          <div className="relative text-xs tracking-[-0.03em] leading-5 text-[#9CA3AF]">
                            {new Date(post.createdAt).toLocaleDateString('en-US', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-4 text-xs text-[#9CA3AF]">
                          <button
                            onClick={() => handleLike(post.id)}
                            className="flex flex-row items-center justify-start gap-1 hover:text-red-500 transition-colors"
                          >
                            <ThumbsUp className={`w-4 h-4 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                            <div className="relative tracking-[-0.03em] leading-5">{post.likes}</div>
                          </button>
                          <div className="flex flex-row items-center justify-start gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <div className="relative tracking-[-0.03em] leading-5">{post.comments}</div>
                          </div>
                        </div>
                      </div>
                      {index < mostLikedPosts.length - 1 && (
                        <div className="self-stretch relative border-[#E5E7EB] border-solid border-t-[1px] box-border h-px my-6" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block lg:hidden w-full relative bg-white min-h-screen text-left text-sm text-[#9CA3AF] font-inter">
        <Header />

        <div className="w-full px-4 py-6 flex flex-col items-start justify-start gap-6 text-[#374151] mt-4 mb-20">
          <h1 className="self-stretch relative text-[22px] tracking-[-0.03em] leading-[30px] font-bold text-[#181D27]">
            Recommend For You
          </h1>

          {/* Mobile Blog Posts - Text Only (No Images) */}
          <div className="self-stretch flex flex-col items-start justify-start gap-6">
            {posts.map((post, index) => (
              <div key={`mobile-${post.id}`} className="w-full max-w-full bg-white flex flex-col items-start justify-start gap-3 overflow-hidden">
                <div className="w-full flex flex-col items-start justify-start gap-2 overflow-hidden">
                  <Link href={`/post/${post.id}`} className="w-full">
                    <h2 className="w-full relative text-base tracking-[-0.03em] leading-6 font-bold text-[#181D27] hover:text-[#0093DD] transition-colors cursor-pointer break-words overflow-wrap-anywhere">
                      {post.title}
                    </h2>
                  </Link>
                  <div className="w-full flex flex-row items-start justify-start gap-2 flex-wrap">
                    {post.tags.map((tag) => (
                      <div
                        key={tag}
                        className="rounded-lg bg-white border-[#D5D7DA] border-solid border-[1px] box-border h-6 flex flex-row items-center justify-center px-2 flex-shrink-0"
                      >
                        <span className="relative text-xs tracking-[-0.03em] leading-5 text-[#181D27] whitespace-nowrap">{tag}</span>
                      </div>
                    ))}
                  </div>
                  <p className="w-full relative text-sm tracking-[-0.03em] leading-6 text-[#181D27] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] break-words">
                    {post.content}
                  </p>
                </div>
                <div className="w-full flex flex-row items-center justify-start gap-3 overflow-hidden">
                  <div className="flex flex-row items-center justify-start gap-2 min-w-0 flex-shrink">
                    <img className="w-[30px] relative rounded-[50%] h-[30px] object-cover flex-shrink-0" alt="" src={getAvatarUrl(post.author.avatarUrl)} />
                    <span className="relative text-xs tracking-[-0.03em] leading-5 font-medium text-[#181D27] truncate">
                      {post.author.name}
                    </span>
                  </div>
                  <div className="w-1 relative rounded-[50%] bg-[#535862] h-1 flex-shrink-0" />
                  <span className="relative text-xs tracking-[-0.03em] leading-5 text-[#535862] flex-shrink-0">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-start gap-4 text-xs text-[#535862]">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex flex-row items-center justify-start gap-1 hover:text-red-500 transition-colors"
                  >
                    <ThumbsUp className={`w-5 h-5 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                    <span className="relative tracking-[-0.03em] leading-5">{post.likes}</span>
                  </button>
                  <div className="flex flex-row items-center justify-start gap-1">
                    <MessageSquare className="w-5 h-5" />
                    <span className="relative tracking-[-0.03em] leading-5">{post.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Pagination */}
          <div className="self-stretch flex flex-row items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-full flex flex-row items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-[#374151]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`w-8 h-8 rounded-full box-border flex flex-row items-center justify-center text-xs font-medium transition-colors ${
                  currentPage === i + 1
                    ? "bg-[#0093DD] text-white"
                    : "border-[#E5E7EB] border-solid border-[1px] text-[#374151] hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-full flex flex-row items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-[#374151]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Most Liked Section */}
          <div className="self-stretch relative border-[#E5E7EB] border-solid border-t-[1px] box-border h-px my-6" />
          
          <div className="self-stretch flex flex-col items-start justify-start gap-6">
            <h2 className="self-stretch relative text-xl tracking-[-0.03em] leading-7 font-bold text-[#181D27]">
              Most Liked
            </h2>
            <div className="self-stretch flex flex-col items-start justify-start gap-6">
              {mostLikedPosts.map((post, index) => (
                <div key={`mobile-liked-${post.id}`}>
                  <div className="self-stretch flex flex-col items-start justify-start gap-3">
                    <Link href={`/post/${post.id}`}>
                      <h3 className="self-stretch relative text-base tracking-[-0.03em] leading-6 font-bold text-[#181D27] hover:text-[#0093DD] transition-colors cursor-pointer">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="self-stretch relative text-sm tracking-[-0.03em] leading-6 text-[#535862] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                      {post.content}
                    </p>
                    <div className="self-stretch flex flex-row items-center justify-start gap-3">
                      <div className="flex flex-row items-center justify-start gap-2">
                        <img
                          className="w-[30px] relative rounded-[50%] h-[30px] object-cover"
                          alt=""
                          src={getAvatarUrl(post.author.avatarUrl)}
                        />
                        <div className="relative text-xs tracking-[-0.03em] leading-5 font-medium text-[#181D27]">
                          {post.author.name}
                        </div>
                      </div>
                      <div className="w-1 relative rounded-[50%] bg-[#535862] h-1" />
                      <div className="relative text-xs tracking-[-0.03em] leading-5 text-[#535862]">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-4 text-xs text-[#535862]">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex flex-row items-center justify-start gap-1 hover:text-red-500 transition-colors"
                      >
                        <ThumbsUp className={`w-5 h-5 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                        <div className="relative tracking-[-0.03em] leading-5">{post.likes}</div>
                      </button>
                      <div className="flex flex-row items-center justify-start gap-1">
                        <MessageSquare className="w-5 h-5" />
                        <div className="relative tracking-[-0.03em] leading-5">{post.comments}</div>
                      </div>
                    </div>
                  </div>
                  {index < mostLikedPosts.length - 1 && (
                    <div className="self-stretch relative border-[#E5E7EB] border-solid border-t-[1px] box-border h-px my-6" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="fixed bottom-0 left-0 bg-white border-[#E5E7EB] border-solid border-t-[1px] box-border w-full h-16 flex flex-col items-center justify-center p-2">
          <div className="relative text-xs tracking-[-0.03em] leading-5 text-center">
            © 2025 Web Programming Hack Blog All rights reserved.
          </div>
        </div>
      </div>
    </>
  )
}
