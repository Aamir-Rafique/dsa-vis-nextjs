"use client"

import { useEffect, useRef } from "react"

export function TreeCanvas({ tree, highlightedNodes = [], traversalPath = [] }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || !tree) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    canvas.width = width
    canvas.height = height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Calculate tree layout
    const nodeRadius = 25
    const levelHeight = 80
    const horizontalPadding = 50

    // Calculate positions for each node
    const positions = new Map()
    
    function calculatePositions(node, depth, left, right) {
      if (!node) return

      const x = (left + right) / 2
      const y = 40 + depth * levelHeight
      positions.set(node.value, { x, y, depth })

      if (node.left) {
        calculatePositions(node.left, depth + 1, left, x)
      }
      if (node.right) {
        calculatePositions(node.right, depth + 1, x, right)
      }
    }

    calculatePositions(tree, 0, horizontalPadding, width - horizontalPadding)

    // Draw edges first
    function drawEdges(node) {
      if (!node) return

      const pos = positions.get(node.value)
      ctx.strokeStyle = "rgb(156, 163, 175)"
      ctx.lineWidth = 2

      if (node.left) {
        const leftPos = positions.get(node.left.value)
        ctx.beginPath()
        ctx.moveTo(pos.x, pos.y)
        ctx.lineTo(leftPos.x, leftPos.y)
        ctx.stroke()
        drawEdges(node.left)
      }

      if (node.right) {
        const rightPos = positions.get(node.right.value)
        ctx.beginPath()
        ctx.moveTo(pos.x, pos.y)
        ctx.lineTo(rightPos.x, rightPos.y)
        ctx.stroke()
        drawEdges(node.right)
      }
    }

    drawEdges(tree)

    // Draw nodes
    function drawNodes(node) {
      if (!node) return

      const pos = positions.get(node.value)
      const isHighlighted = highlightedNodes.includes(node.value)
      const pathIndex = traversalPath.indexOf(node.value)
      const isInPath = pathIndex !== -1

      // Node circle
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, nodeRadius, 0, Math.PI * 2)

      if (isHighlighted) {
        ctx.fillStyle = "rgb(255, 165, 0)" // Orange for current
        ctx.lineWidth = 3
        ctx.strokeStyle = "rgb(255, 140, 0)"
      } else if (isInPath) {
        ctx.fillStyle = "rgb(76, 175, 80)" // Green for visited
        ctx.lineWidth = 2
        ctx.strokeStyle = "rgb(56, 142, 60)"
      } else {
        ctx.fillStyle = "rgb(59, 130, 246)" // Blue default
        ctx.lineWidth = 2
        ctx.strokeStyle = "rgb(37, 99, 235)"
      }

      ctx.fill()
      ctx.stroke()

      // Node value
      ctx.fillStyle = "white"
      ctx.font = "bold 16px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(node.value.toString(), pos.x, pos.y)

      // Traversal order number
      if (isInPath && pathIndex >= 0) {
        ctx.fillStyle = "rgb(76, 175, 80)"
        ctx.font = "bold 12px sans-serif"
        ctx.fillText((pathIndex + 1).toString(), pos.x, pos.y - nodeRadius - 10)
      }

      drawNodes(node.left)
      drawNodes(node.right)
    }

    drawNodes(tree)
  }, [tree, highlightedNodes, traversalPath])

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full min-h-[400px]"
      style={{ background: "transparent" }}
    />
  )
}
