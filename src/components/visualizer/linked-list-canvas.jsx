"use client"

import { useEffect, useRef } from "react"

export function LinkedListCanvas({ values, highlightedIndex, isCircular, isDoubly, onDeleteNode, isAnimating }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    canvas.width = width
    canvas.height = height

    if (values.length === 0) {
      ctx.fillStyle = "rgb(100, 116, 139)"
      ctx.font = "14px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("No nodes to display", width / 2, height / 2)
      return
    }

    // Draw settings
    const nodeRadius = 30
    const nodePadding = 60
    const nodeHeight = height / 2
    const startX = 40

    // Colors (from theme)
    const defaultColor = "rgb(100, 150, 200)" // Primary blue
    const highlightColor = "rgb(255, 165, 0)" // Accent orange
    const arrowColor = "rgb(156, 163, 175)" // Gray
    const textColor = "rgb(255, 255, 255)"

    // Draw nodes
    values.forEach((value, index) => {
      const x = startX + index * (nodeRadius * 2 + nodePadding)
      const y = nodeHeight

      // Node circle
      ctx.beginPath()
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2)
      ctx.fillStyle = highlightedIndex === index ? highlightColor : defaultColor
      ctx.fill()
      ctx.strokeStyle = highlightColor
      ctx.lineWidth = highlightedIndex === index ? 3 : 1
      ctx.stroke()

      // Node value
      ctx.fillStyle = textColor
      ctx.font = "bold 16px monospace"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(value, x, y)

      // Index label
      ctx.fillStyle = arrowColor
      ctx.font = "12px sans-serif"
      ctx.fillText(`[${index}]`, x, y + nodeRadius + 20)

      // Draw arrows to next node
      if (index < values.length - 1) {
        const nextX = startX + (index + 1) * (nodeRadius * 2 + nodePadding)
        const nextY = nodeHeight

        // Forward arrow
        drawArrow(ctx, x + nodeRadius + 5, y, nextX - nodeRadius - 5, nextY, arrowColor)

        // Backward arrow (for doubly linked list)
        if (isDoubly) {
          drawArrow(ctx, nextX - nodeRadius - 5, nextY + 15, x + nodeRadius + 5, y + 15, arrowColor, true)
        }
      }

      // Circular arrow (if circular)
      if (isCircular && index === values.length - 1) {
        drawCircularArrow(ctx, x + nodeRadius + 10, y, startX - nodeRadius - 10, y, arrowColor)
      }
    })

    // Helper to draw arrows
    function drawArrow(ctx, fromX, fromY, toX, toY, color, isDashed = false) {
      const headlen = 10
      const angle = Math.atan2(toY - fromY, toX - fromX)

      if (isDashed) {
        ctx.setLineDash([5, 5])
      }

      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(fromX, fromY)
      ctx.lineTo(toX, toY)
      ctx.stroke()

      ctx.setLineDash([])
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(toX, toY)
      ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6))
      ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6))
      ctx.closePath()
      ctx.fill()
    }

    function drawCircularArrow(ctx, fromX, fromY, toX, toY, color) {
      const curveHeight = 40
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(fromX, fromY)
      ctx.quadraticCurveTo((fromX + toX) / 2, fromY + curveHeight, toX, toY)
      ctx.stroke()

      // Arrow head
      const angle = Math.atan2(toY - (fromY + curveHeight), toX - (fromX + toX) / 2)
      const headlen = 10
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(toX, toY)
      ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6))
      ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6))
      ctx.closePath()
      ctx.fill()
    }
  }, [values, highlightedIndex, isCircular, isDoubly])

  return <canvas ref={canvasRef} className="w-full h-full rounded" />
}
