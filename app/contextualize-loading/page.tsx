"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const messages = [
  "looking for similar authors",
  "looking for similar writings",
  "looking through author's insights",
]

export default function ContextualizeLoadingPage() {
  const [index, setIndex] = useState(0)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const switchInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 1200)
    const timer = setTimeout(() => {
      const q = searchParams.get("q") || ""
      router.replace(`/contextualize?q=${encodeURIComponent(q)}`)
    }, 5000)
    return () => {
      clearInterval(switchInterval)
      clearTimeout(timer)
    }
  }, [router, searchParams])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-gray-300 border-t-[#FF7731] rounded-full animate-spin mb-8"></div>
      {/* Cycling message */}
      <div className="text-xl font-semibold text-gray-700 text-center">
        {messages[index]}
      </div>
    </div>
  )
} 