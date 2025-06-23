"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MessageCircle, Bell, Heart, MessageSquare, Repeat2, MoreHorizontal } from "lucide-react"

export default function SubstackHomepage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showSelectionMenu, setShowSelectionMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const [selectedText, setSelectedText] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide selection menu on scroll
      if (showSelectionMenu) {
        setShowSelectionMenu(false)
        setSelectedText("")
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsHeaderVisible(false)
      } else {
        // Scrolling up
        setIsHeaderVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, showSelectionMenu])

  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection()
      if (selection && selection.toString().length >= 5) {
        // Check if the selection is within the article element
        const range = selection.getRangeAt(0)
        const articleElement = document.querySelector("article")

        if (articleElement && articleElement.contains(range.commonAncestorContainer)) {
          const rect = range.getBoundingClientRect()

          setSelectedText(selection.toString())
          setMenuPosition({
            x: rect.left + rect.width / 2, // Center horizontally relative to selection width
            y: rect.top - 15, // Position 15px above the highest point of selection
          })
          setShowSelectionMenu(true)
        } else {
          setShowSelectionMenu(false)
          setSelectedText("")
        }
      } else {
        setShowSelectionMenu(false)
        setSelectedText("")
      }
    }

    const handleClickOutside = () => {
      if (window.getSelection()?.toString().trim().length === 0) {
        setShowSelectionMenu(false)
        setSelectedText("")
      }
    }

    // Add real-time updates during selection
    const handleSelectionChange = () => {
      handleTextSelection()
    }

    document.addEventListener("mouseup", handleTextSelection)
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("selectionchange", handleSelectionChange)

    return () => {
      document.removeEventListener("mouseup", handleTextSelection)
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("selectionchange", handleSelectionChange)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 transition-transform duration-200 ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="w-full flex items-center">
            {/* Left - Profile Avatar */}
            <div className="flex items-center">
              <Avatar className="w-7 h-7 rounded-none">
                <AvatarImage src="/images/flag-avatar.png" alt="Profile" className="object-cover" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
            </div>

            {/* Center - Publication Name (absolutely centered) */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="font-medium text-gray-900 text-2xl" style={{ fontFamily: "Georgia, serif" }}>
                So That's That
              </h1>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-3 ml-auto">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                <MessageCircle className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Subscribe
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Text Selection Menu */}
      {showSelectionMenu && (
        <div
          className="fixed z-50 text-white rounded-lg shadow-lg py-2 px-1 transition-all duration-150 bg-[rgba(106,106,106,1)]"
          style={{
            left: `${menuPosition.x}px`,
            top: `${menuPosition.y}px`,
            transform: "translateX(-50%) translateY(-100%)",
          }}
        >
          <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-600 text-sm whitespace-nowrap w-full rounded-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
            Share
          </button>
          <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-600 rounded-lg text-sm whitespace-nowrap w-full">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Restack
          </button>
          <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-600 rounded-lg text-sm whitespace-nowrap w-full">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Contextualize
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12 pt-24">
        {/* Article Header */}
        <div className="mb-8">
          <h1
            className="text-4xl md:text-5xl text-gray-900 mb-6 leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Substack is Amazing.
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sachin Monga" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium text-gray-900">Honglu Wang </div>
              <div className="text-sm text-gray-500">May 28, 2025</div>
            </div>
          </div>

          {/* Engagement Bar */}
          <div className="flex items-center justify-between border-t border-b border-gray-200 py-3">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors border-[0.5px] border-gray-300 hover:border-gray-400 px-3 py-1.5 rounded-full">
                <Heart className="w-4 h-4" />
                <span className="text-sm">7</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors border-[0.5px] border-gray-300 hover:border-gray-400 px-3 py-1.5 rounded-full">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">2</span>
              </button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors border-[0.5px] border-gray-300 hover:border-gray-400 p-2 rounded-full">
                <Repeat2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-gray-600 hover:text-gray-900 transition-colors border-[0.5px] border-gray-300 hover:border-gray-400 px-3 py-1.5 rounded-full text-sm">
                Share
              </button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors border-[0.5px] border-gray-300 hover:border-gray-400 p-2 rounded-full">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none select-text" style={{ fontFamily: "Georgia, serif" }}>
          <p className="text-gray-800 leading-relaxed mb-6 text-lg">
            We're only a few years into the era where the majority of humans have a supercomputer in their pocket, which
            is connected to every other supercomputer in every other pocket. There are two important factors that
            intersect to make this moment different.
          </p>

          <p className="text-gray-800 leading-relaxed mb-6 text-lg">
            First - "looking at a screen" isn't really the activity we're taking part in anymore. A mobile screen, at
            least in theory, is a window into a much wider range of potential experiences than a TV screen. With your
            phone, you can talk to friends, find someone to date, read a book, play a game, make money, or watch a
            video. Compare this with the TV in your living room: you can watch the news, or a movie, or a show.
          </p>

          <p className="text-gray-800 leading-relaxed mb-6 text-lg">
            Substack is the home for great culture. It is a new media app that connects you with the creators, ideas,
            and communities you care about most. On Substack, you can discover world-class video, podcasts, and writing
            from a diverse set of creators who cover politics, pop culture, food, philosophy, tech, travel, and much
            more.
          </p>

          <p className="text-gray-800 leading-relaxed mb-6 text-lg">
            Substack makes it easy to explore the wide range of work across the platform. The Notes feed is a space
            where you can see what people are sharing and thinking about in real time—designed for discovery,
            conversation, and connection. There is also a dedicated space for video, where you can browse clips, dive
            into full posts, and subscribe to publishers directly from content that resonates with you.
          </p>

          <p className="text-gray-800 leading-relaxed mb-6 text-lg">
            For deeper engagement, Substack offers live video that lets you interact with your favorite writers and
            creators in real time—whether it's for a collaborative conversation, breaking news reaction, or
            behind-the-scenes update. Chat provides a private space for more meaningful conversations between creators
            and their communities, fostering authentic connection.
          </p>

          <p className="text-gray-800 leading-relaxed mb-6 text-lg">
            As writer Hunter Harris describes it: "The Hung Up chat feels like the roped-off VIP section of a nightclub,
            or the group chat of all the kids who got cellphones early. It's a rapid-fire conversation of memes, hot
            takes, unpopular opinions, ruthless inside jokes, and earned (and sometimes unearned) shade. It's my
            favorite part of running my newsletter. There's no better low-effort, high-reward way to engage with all my
            readers."
          </p>

          <p className="text-gray-800 leading-relaxed mb-6 text-lg">
            Substack supports a model that makes quality creative work possible. When subscribers pay writers and
            creators directly, it allows them to focus on the work they care about most. Just a few hundred paid
            subscribers can support a livelihood, while a few thousand can make it lucrative.
          </p>

          <p className="text-gray-800 leading-relaxed mb-6 text-lg">
            Substack empowers creators through control, aligned incentives, growth, and ownership. With a
            subscription-based model, creators can focus on serving their audience rather than chasing clicks or
            appeasing advertisers. You decide what to publish, when to publish, and how to engage. Substack takes a
            hands-off approach to moderation and supports community-led standards, allowing you to shape the
            conversation on your own terms.
          </p>

          <p className="text-gray-800 leading-relaxed mb-8 text-lg">
            Finally, Substack gives creators full ownership. Publishers retain the rights to their content and control
            their relationships with subscribers. If you ever want to leave the platform, you can easily export your
            posts and subscriber email list and take them with you.
          </p>
        </article>
      </main>
    </div>
  )
}
