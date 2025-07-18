"use client"

import { useEffect, useState } from "react"

const messages = [
  "looking for similar authors",
  "looking for similar writings",
  "looking through author's insights",
]

export default function Loading() {
  const [index, setIndex] = useState(0)
  const [minTimePassed, setMinTimePassed] = useState(false)

  useEffect(() => {
    const switchInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 1200)
    return () => clearInterval(switchInterval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimePassed(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  // The actual page will only unmount after 5 seconds due to Next.js route loading behavior,
  // but this state can be used for further logic if needed.

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-8"></div>
      {/* Cycling message */}
      <div className="text-xl font-semibold text-gray-700 text-center">
        {messages[index]}
      </div>
    </div>
  )
}
