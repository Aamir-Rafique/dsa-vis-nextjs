"use client"

import { useEffect, useRef } from "react"

export function SortingCanvas({ array, comparingIndices, sortedIndices, maxValue }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || array.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    canvas.width = width
    canvas.height = height

    // Colors
    const defaultColor = "rgb(100, 150, 200)" // Primary blue
    const comparingColor = "rgb(255, 165, 0)" // Orange
    const sortedColor = "rgb(76, 175, 80)" // Green

    // Draw bars
    const barWidth = width / array.length
    const padding = 2

    ctx.fillStyle = "transparent"
    ctx.fillRect(0, 0, width, height)

    array.forEach((value, index) => {
      const barHeight = (value / maxValue) * height
      const x = index * barWidth + padding
      const y = height - barHeight

      // Determine color
      if (sortedIndices.includes(index)) {
        ctx.fillStyle = sortedColor
      } else if (comparingIndices.includes(index)) {
        ctx.fillStyle = comparingColor
      } else {
        ctx.fillStyle = defaultColor
      }

      ctx.fillRect(x, y, barWidth - padding * 2, barHeight)
    })
  }, [array, comparingIndices, sortedIndices, maxValue])

  return <canvas ref={canvasRef} className="w-full h-full rounded" />
}
