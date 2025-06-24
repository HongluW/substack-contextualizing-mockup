"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Home,
  Grid3X3,
  MessageCircle,
  Bell,
  Plus,
  Heart,
  MessageSquare,
  Repeat2,
  MoreHorizontal,
  X,
} from "lucide-react"
import { useSearchParams } from "next/navigation"
import { AuthorsInsight } from "@/components/authors-insight"

export default function ContextualizePage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [showContextualizeTextInHeader, setShowContextualizeTextInHeader] = useState(false)

  useEffect(() => {
    const query = searchParams.get("q") || "anything"
    setSearchQuery(query)
  }, [searchParams])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowContextualizeTextInHeader(true)
      } else {
        setShowContextualizeTextInHeader(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const HEADER_HEIGHT = "56px" // Equivalent to h-14 or py-3 with content
  const SIDEBAR_WIDTH = "64px" // Equivalent to w-16

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header - Fixed at the top */}
      <header
        className={`fixed top-0 left-0 right-0 z-10 border-b border-gray-700 px-4 py-3 bg-[#1a1a1a] h-[${HEADER_HEIGHT}]`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between relative h-full">
          {/* Left - Flag Icon and dynamic Contextualize text */}
          <div className="flex items-center min-w-[120px]">
            <div className="w-8 h-8">
              <img src="/images/flag-icon.svg" alt="Substack Icon" className="w-full h-full object-contain" />
            </div>
            {showContextualizeTextInHeader && <span className="ml-2 text-white text-lg font-bold">Contextualize</span>}
          </div>

          {/* Center - Search Bar (Absolute positioned) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#2a2a2a] border border-blue-500 rounded-lg pl-10 pr-10 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                placeholder="Search..."
              />
              <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* Right - Dashboard and Avatar */}
          <div className="flex items-center gap-4 min-w-[120px] justify-end">
            <span className="text-gray-300">Dashboard</span>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main content area, pushed down by fixed header */}
      <div className={`flex pt-[${HEADER_HEIGHT}]`}>
        {/* Left Sidebar - Fixed */}
        <div
          className={`fixed top-[${HEADER_HEIGHT}] left-0 bottom-0 w-[${SIDEBAR_WIDTH}] border-r border-gray-700 bg-[#1a1a1a] z-10`}
        >
          <div className="flex flex-col items-center py-4 space-y-6">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-700">
              <Home className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-700">
              <Grid3X3 className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-700">
              <MessageCircle className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-700">
              <Bell className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-700">
              <Search className="w-6 h-6" />
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 rounded-lg w-10 h-10">
              <Plus className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Main Content - Scrolls, pushed by fixed sidebar */}
        <div className={`flex-1 ml-[${SIDEBAR_WIDTH}]`}>
          <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Authors Insight Section */}
            <AuthorsInsight />

            {/* Contextual Results Section */}
            <div className="mt-8 mb-4">
              <h2 className="text-xl font-bold mb-4 text-white">Contextual Results</h2>
            </div>

            {/* Filter Tabs */}
            <div className="border-b border-gray-700 pb-4 mb-6">
              <div className="flex space-x-6">
                <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium">Top</button>
                <button className="text-gray-400 hover:text-white px-4 py-2 text-sm">Posts</button>
                <button className="text-gray-400 hover:text-white px-4 py-2 text-sm">Publications</button>
                <button className="text-gray-400 hover:text-white px-4 py-2 text-sm">People</button>
                <button className="text-gray-400 hover:text-white px-4 py-2 text-sm">Notes</button>
              </div>
            </div>
            {/* Search Results */}
            <div className="space-y-6">
              {/* aNYthing Publication */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="aNYthing" />
                    <AvatarFallback className="bg-blue-600 text-white">aN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-white">aNYthing</h3>
                    <b className="text-gray-400 text-sm font-medium">@anythinggisimpossible • impossible Substack</b>
                    <b className="text-gray-400 text-sm font-medium">When there is a will, there is a way.</b>
                  </div>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">Follow</Button>
              </div>

              {/* Learn Anything Publication */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Learn Anything" />
                    <AvatarFallback className="bg-purple-600 text-white">LA</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-white">Learn Nothing</h3>
                    <b className="text-gray-400 text-sm font-medium">@learnnothinghaha</b>
                    <b className="text-gray-400 text-sm font-medium">
                      So you want to learn nothing?
                    </b>
                  </div>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">Follow</Button>
              </div>

              {/* Kelly Thompson Post */}
              <div className="border-b border-gray-700 pb-6">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Kelly Thompson" />
                    <AvatarFallback>KT</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-white">Kelly Thompson TNWWY</span>
                      <span className="text-gray-400 text-sm">2h</span>
                      <MoreHorizontal className="w-4 h-4 text-gray-400 ml-auto cursor-pointer" />
                    </div>
                    <div className="text-gray-300 space-y-2">
                      <p>
                        Hey <span className="text-blue-400">Jason</span>
                      </p>
                      <p>
                        <span className="font-semibold">Memoirlosophy</span> A new category: memoir as philosophy.
                      </p>
                      <p>Not the love of wisdom in theory—but in practice.</p>
                      <p>
                        That's the basis of{" "}
                        <span className="italic">There's Nothing Wrong With You (And There Never Was)</span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-6 mt-4 text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">2</span>
                      </div>
                      <MessageSquare className="w-4 h-4 cursor-pointer hover:text-white" />
                      <Repeat2 className="w-4 h-4 cursor-pointer hover:text-white" />
                      <div className="w-4 h-4 cursor-pointer hover:text-white">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TJ Post */}
              <div>
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="TJ" />
                    <AvatarFallback>TJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-white">TJ</span>
                      <span className="text-gray-400 text-sm">2h</span>
                      <MoreHorizontal className="w-4 h-4 text-gray-400 ml-auto cursor-pointer" />
                    </div>
                    <div className="mt-3">
                      <img
                        src="/placeholder.svg?height=300&width=500"
                        alt="Post image"
                        className="rounded-lg w-full max-w-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom User Avatar - Fixed */}
      <div className="fixed bottom-4 left-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/images/flag-icon.svg" alt="User" className="w-full h-full object-contain" />
        </Avatar>
      </div>
    </div>
  )
}
