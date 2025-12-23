"use client"

import { useEffect, useRef } from "react"

export function SortingCanvas({ array, comparingIndices, sortedIndices, maxValue, algorithmType }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || array.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    canvas.width = width
    canvas.height = height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Colors with educational significance
    const colors = {
      default: "rgb(100, 150, 200)", // Unsorted - calm blue
      comparing: "rgb(255, 165, 0)", // Active comparison - attention orange
      sorted: "rgb(76, 175, 80)", // Sorted - success green
      pivot: "rgb(156, 39, 176)", // Pivot element - distinct purple (Quick Sort)
      merging: "rgb(33, 150, 243)", // Merging sections - process blue (Merge Sort)
      heap: "rgb(255, 87, 34)", // Heap operations - structural red (Heap Sort)
      swapping: "rgb(244, 67, 54)", // Swap animation - action red
    }

    const barWidth = width / array.length
    const padding = Math.max(1, Math.min(3, barWidth * 0.1))
    const showLabels = array.length <= 50

    // Algorithm-specific visualizations
    if (algorithmType === "bubble-sort") {
      // Bubble Sort: Show "bubbling up" metaphor
      array.forEach((value, index) => {
        const barHeight = (value / maxValue) * (height - 30)
        const x = index * barWidth + padding
        const y = height - barHeight - 20

        // Determine color
        let fillColor = colors.default
        if (sortedIndices.includes(index)) {
          fillColor = colors.sorted
        } else if (comparingIndices.includes(index)) {
          fillColor = comparingIndices.indexOf(index) === 0 ? colors.comparing : colors.swapping
          // Add "bubble" effect
          ctx.save()
          ctx.shadowBlur = 15
          ctx.shadowColor = fillColor
          ctx.shadowOffsetY = -5
        }

        // Draw bar with rounded top (bubble metaphor)
        ctx.fillStyle = fillColor
        ctx.beginPath()
        ctx.roundRect(x, y, barWidth - padding * 2, barHeight, [4, 4, 0, 0])
        ctx.fill()
        
        if (comparingIndices.includes(index)) {
          ctx.restore()
        }

        // Show value labels for small arrays
        if (showLabels) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
          ctx.font = "bold 10px monospace"
          ctx.textAlign = "center"
          ctx.fillText(value, x + (barWidth - padding * 2) / 2, y - 5)
        }
      })
    } else if (algorithmType === "quick-sort") {
      // Quick Sort: Show partitioning with pivot emphasis
      array.forEach((value, index) => {
        const barHeight = (value / maxValue) * (height - 30)
        const x = index * barWidth + padding
        const y = height - barHeight - 20

        let fillColor = colors.default
        let strokeColor = null
        let strokeWidth = 0

        if (sortedIndices.includes(index)) {
          fillColor = colors.sorted
        } else if (comparingIndices.includes(index)) {
          // Last in comparing array is often the pivot
          const isPivot = comparingIndices.indexOf(index) === comparingIndices.length - 1
          fillColor = isPivot ? colors.pivot : colors.comparing
          if (isPivot) {
            strokeColor = "rgba(255, 255, 255, 0.8)"
            strokeWidth = 3
          }
        }

        ctx.fillStyle = fillColor
        ctx.fillRect(x, y, barWidth - padding * 2, barHeight)

        // Pivot indicator
        if (strokeColor) {
          ctx.strokeStyle = strokeColor
          ctx.lineWidth = strokeWidth
          ctx.strokeRect(x, y, barWidth - padding * 2, barHeight)
          
          // Pivot arrow
          ctx.fillStyle = colors.pivot
          ctx.beginPath()
          ctx.moveTo(x + (barWidth - padding * 2) / 2, y - 15)
          ctx.lineTo(x + (barWidth - padding * 2) / 2 - 5, y - 8)
          ctx.lineTo(x + (barWidth - padding * 2) / 2 + 5, y - 8)
          ctx.fill()
        }

        if (showLabels) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
          ctx.font = "bold 10px monospace"
          ctx.textAlign = "center"
          ctx.fillText(value, x + (barWidth - padding * 2) / 2, y - 5)
        }
      })
    } else if (algorithmType === "merge-sort") {
      // Merge Sort: Show divide-and-conquer with section grouping
      array.forEach((value, index) => {
        const barHeight = (value / maxValue) * (height - 30)
        const x = index * barWidth + padding
        const y = height - barHeight - 20

        let fillColor = colors.default
        if (sortedIndices.includes(index)) {
          fillColor = colors.sorted
        } else if (comparingIndices.includes(index)) {
          fillColor = colors.merging
        }

        // Create gradient for merge visualization
        if (comparingIndices.includes(index)) {
          const gradient = ctx.createLinearGradient(x, y, x, y + barHeight)
          gradient.addColorStop(0, colors.merging)
          gradient.addColorStop(1, colors.comparing)
          ctx.fillStyle = gradient
        } else {
          ctx.fillStyle = fillColor
        }

        ctx.fillRect(x, y, barWidth - padding * 2, barHeight)

        // Section dividers for merge boundaries
        if (comparingIndices.length > 0 && 
            comparingIndices.includes(index) && 
            !comparingIndices.includes(index + 1) && 
            index < array.length - 1) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
          ctx.lineWidth = 2
          ctx.setLineDash([5, 5])
          ctx.beginPath()
          ctx.moveTo(x + barWidth - padding, 0)
          ctx.lineTo(x + barWidth - padding, height - 20)
          ctx.stroke()
          ctx.setLineDash([])
        }

        if (showLabels) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
          ctx.font = "bold 10px monospace"
          ctx.textAlign = "center"
          ctx.fillText(value, x + (barWidth - padding * 2) / 2, y - 5)
        }
      })
    } else if (algorithmType === "heap-sort") {
      // Heap Sort: Show heap structure with parent-child relationships
      array.forEach((value, index) => {
        const barHeight = (value / maxValue) * (height - 30)
        const x = index * barWidth + padding
        const y = height - barHeight - 20

        let fillColor = colors.default
        if (sortedIndices.includes(index)) {
          fillColor = colors.sorted
        } else if (comparingIndices.includes(index)) {
          fillColor = colors.heap
        }

        ctx.fillStyle = fillColor
        ctx.fillRect(x, y, barWidth - padding * 2, barHeight)

        // Draw heap level indicators
        if (!sortedIndices.includes(index) && comparingIndices.includes(index)) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.6)"
          ctx.lineWidth = 2
          ctx.strokeRect(x, y, barWidth - padding * 2, barHeight)
        }

        if (showLabels) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
          ctx.font = "bold 10px monospace"
          ctx.textAlign = "center"
          ctx.fillText(value, x + (barWidth - padding * 2) / 2, y - 5)
        }
      })
    } else {
      // Default visualization
      array.forEach((value, index) => {
        const barHeight = (value / maxValue) * (height - 30)
        const x = index * barWidth + padding
        const y = height - barHeight - 20

        let fillColor = colors.default
        if (sortedIndices.includes(index)) {
          fillColor = colors.sorted
        } else if (comparingIndices.includes(index)) {
          fillColor = colors.comparing
        }

        ctx.fillStyle = fillColor
        ctx.fillRect(x, y, barWidth - padding * 2, barHeight)

        if (showLabels) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
          ctx.font = "bold 10px monospace"
          ctx.textAlign = "center"
          ctx.fillText(value, x + (barWidth - padding * 2) / 2, y - 5)
        }
      })
    }

    // Draw baseline
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, height - 20)
    ctx.lineTo(width, height - 20)
    ctx.stroke()

  }, [array, comparingIndices, sortedIndices, maxValue, algorithmType])

  return <canvas ref={canvasRef} className="w-full h-full rounded" />
}
