"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MessageCircle, Bell, Heart, MessageSquare, Repeat2, MoreHorizontal, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function UnderstandingMediaPage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showSelectionMenu, setShowSelectionMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const [selectedText, setSelectedText] = useState("")
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (showSelectionMenu) {
        setShowSelectionMenu(false)
        setSelectedText("")
      }
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false)
      } else {
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
        const range = selection.getRangeAt(0)
        const articleElement = document.querySelector("article")
        if (articleElement && articleElement.contains(range.commonAncestorContainer)) {
          const rect = range.getBoundingClientRect()
          setSelectedText(selection.toString())
          setMenuPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 15,
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

  const handleContextualize = () => {
    router.push(`/contextualize?q=${encodeURIComponent(selectedText)}`)
  }

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
            {/* Back Button - now at the far left */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900 mr-2"
              onClick={() => router.push('/contextualize')}
              aria-label="Back"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            {/* Left - Profile Avatar */}
            <div className="flex items-center">
              <div className="w-7 h-7">
                <img src="/images/flag-icon.svg" alt="Substack Icon" className="w-full h-full object-contain" />
              </div>
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
          <button
            onClick={handleContextualize}
            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-600 rounded-lg text-sm whitespace-nowrap w-full"
          >
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
            Understanding Media: The Extensions of Man
          </h1>
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Marsh McWuhan" />
              <AvatarFallback>MM</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium text-gray-900">Marsh McWuhan</div>
              <div className="text-sm text-gray-500">2 days ago</div>
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
            In a culture like ours, long accustomed to splitting and dividing all things as a means of control, it is sometimes a bit of a shock to be reminded that, in operational and practical fact, the medium is the message. This is merely to say that the personal and social consequences of any medium-- that is, of any extension of ourselves -- result from the new scale that is introduced into our affairs by each extension of ourselves, or by any new technology.
          </p>
          <p className="text-gray-800 leading-relaxed mb-6 text-lg">
            Thus, with automation, for example, the new patterns of human association tend to eliminate jobs, it is true. That is the negative result. Positively, automation creates roles for people, which is to say depth of involvement in their work and human association that our preceding mechanical technology had destroyed. Many people would be disposed to say that it was not the machine, but what one did with the machine, that was its meaning or message. In terms of the ways in which the machine altered our relations to one another and to ourselves, it mattered not in the least whether it turned out cornflakes or Cadillacs. The restructuring of human work and association was shaped by the technique of fragmentation that is the essence of machine technology. The essence of automation technology is the opposite. It is integral and decentralist in depth, just as the machine was fragmentary, centralist, and superficial in its patterning of human relationships.
          </p>
          <p className="text-gray-800 leading-relaxed mb-6 text-lg">
            The instance of the electric light may prove illuminating in this connection. The electric light is pure information. It is a medium without a message, as it were, unless it is used to spell out some verbal ad or name. This fact, characteristic of all media, means that the "content" of any medium is always another medium. The content of writing is speech, just as the written word is the content of print, and print is the content of the telegraph. If it is asked, "What is the content of speech?", it is necessary to say, "It is an actual process of thought, which is in itself nonverbal." An abstract painting represents direct manifestation of creative thought processes as they might appear in computer designs. What we are considering here, however, are the psychic and social consequences of the designs or patterns as they amplify or accelerate existing processes. For the "message" of any medium or technology is the change of scale or pace or pattern that it introduces into human affairs.
          </p>
          <p className="text-gray-800 leading-relaxed mb-6 text-lg">
            The railway did not introduce movement or transportation or wheel or road into human society, but it accelerated and enlarged the scale of previous human functions, creating totally new kinds of cities and new kinds of work and leisure. This happened whether the railway functioned in a tropical or a northern environment and is quite independent of the freight or content of the railway medium. The airplane, on the other hand, by accelerating the rate of transportation, tends to dissolve the railway form of city, politics, and association, quite independently of what the airplane is used for.
          </p>
          <p className="text-gray-800 leading-relaxed mb-6 text-lg">
            Let us return to the electric light. When the light is being used for brain surgery or night baseball is a matter of indifference. It could be argued that these activities are in some way the "content" of the electric light, since they could not exist without the electric light. This fact merely underlines the point that "the medium is the message" because it is the medium that shapes and controls the scale and form of human association and action. The content or uses of such media are as diverse as they are ineffectual in shaping the form of human association. Indeed, it is only too typical that the "content" of any medium blinds us to the character of the medium.
          </p>
          <p className="text-gray-800 leading-relaxed mb-6 text-lg">
            It is only today that industries have become aware of the various kinds of business in which they are engaged. When IBM discovered that it was not in the business of making office equipment or business machines, but that it was in the business of processing information, then it began to navigate with clear vision. The General Electric Company makes a considerable portion of its profits from electric light bulbs and lighting systems. It has not yet discovered that, quite as much as A.T.& T., it is in the business of moving information.
          </p>
          <p className="text-gray-800 leading-relaxed mb-6 text-lg">
            The electric light escapes attention as a communication medium just because it has no "content." And this makes it an invaluable instance of how people fail to study media at all. For it is not till the electric light is used to spell out some brand name that it is noticed as a medium. Then it is not the light but the "content" (or what is really another medium) that is noticed. The message of the electric light is like the message of electric power in industry, totally radical, pervasive, and decentralized. For electric light and power are separate from their uses, yet they eliminate time and space factors in human association exactly as do radio, telegraph, telephone, and TV, creating involvement in depth.
          </p>
        </article>
      </main>
    </div>
  )
} 