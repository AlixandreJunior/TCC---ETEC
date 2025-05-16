"use client"

import { useState, useRef, useEffect } from "react"

interface DragSliderProps {
  value: number
  max: number
  onChange: (value: number) => void
}

export function DragSlider({ value, max, onChange }: DragSliderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  // Calculate percentage for positioning
  const percentage = (value / max) * 100

  // Handle mouse/touch events
  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    document.body.style.userSelect = "none"
    updatePosition(clientX)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    document.body.style.userSelect = ""
  }

  const updatePosition = (clientX: number) => {
    if (!sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const sliderWidth = rect.width
    const offsetX = clientX - rect.left

    // Calculate new position as percentage
    const newPercentage = Math.max(0, Math.min(100, (offsetX / sliderWidth) * 100))

    // Convert percentage to value
    const newValue = Number.parseFloat(((newPercentage / 100) * max).toFixed(1))
    onChange(newValue)
  }

  // Set up event listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updatePosition(e.clientX)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        updatePosition(e.touches[0].clientX)
      }
    }

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("mouseup", handleDragEnd)
      window.addEventListener("touchend", handleDragEnd)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("mouseup", handleDragEnd)
      window.removeEventListener("touchend", handleDragEnd)
    }
  }, [isDragging])

  return (
    <div ref={sliderRef} className="relative h-4 rounded-full bg-blue-100">
      <div className="absolute top-0 left-0 h-full rounded-full bg-blue-500" style={{ width: `${percentage}%` }} />
      <div
        ref={thumbRef}
        className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-500 shadow-md cursor-pointer"
        style={{ left: `calc(${percentage}% - 12px)` }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onTouchStart={(e) => e.touches[0] && handleDragStart(e.touches[0].clientX)}
      />
    </div>
  )
}
