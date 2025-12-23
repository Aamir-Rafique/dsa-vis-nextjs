"use client"

import { useEffect, useRef } from "react"

export function GraphCanvas({ graph, visitedNodes, currentNode, highlightEdges, showWeights = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    canvas.width = width
    canvas.height = height

    // Calculate node positions in a circle
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 3
    const nodeRadius = 25

    const positions = {}
    graph.nodes.forEach((node, idx) => {
      const angle = (idx / graph.nodes.length) * Math.PI * 2 - Math.PI / 2
      positions[node.id] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      }
    })

    // Colors
    const defaultColor = "rgb(100, 150, 200)" // Primary
    const visitedColor = "rgb(76, 175, 80)" // Green
    const currentColor = "rgb(255, 165, 0)" // Orange
    const edgeColor = "rgb(156, 163, 175)" // Gray
    const textColor = "rgb(255, 255, 255)"

    // Draw edges
    ctx.strokeStyle = edgeColor
    ctx.lineWidth = 2
    graph.edges.forEach((edge) => {
      const from = positions[edge.from]
      const to = positions[edge.to]

      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.stroke()

      // Draw arrowhead
      const angle = Math.atan2(to.y - from.y, to.x - from.x)
      const headlen = 10
      ctx.fillStyle = edgeColor
      ctx.beginPath()
      ctx.moveTo(to.x, to.y)
      ctx.lineTo(to.x - headlen * Math.cos(angle - Math.PI / 6), to.y - headlen * Math.sin(angle - Math.PI / 6))
      ctx.lineTo(to.x - headlen * Math.cos(angle + Math.PI / 6), to.y - headlen * Math.sin(angle + Math.PI / 6))
      ctx.closePath()
      ctx.fill()

      // Draw edge weight if showWeights is true
      if (showWeights && edge.weight !== undefined) {
        const midX = (from.x + to.x) / 2
        const midY = (from.y + to.y) / 2
        
        // Draw background circle for weight
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
        ctx.beginPath()
        ctx.arc(midX, midY, 14, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw weight border
        ctx.strokeStyle = "rgb(59, 130, 246)" // Blue
        ctx.lineWidth = 2
        ctx.stroke()
        
        // Draw weight text
        ctx.fillStyle = "rgb(30, 58, 138)" // Dark blue
        ctx.font = "bold 12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(edge.weight.toString(), midX, midY)
      }
    })

    // Draw nodes
    graph.nodes.forEach((node) => {
      const pos = positions[node.id]

      // Node circle
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, nodeRadius, 0, Math.PI * 2)

      if (currentNode === node.id) {
        ctx.fillStyle = currentColor
        ctx.lineWidth = 3
      } else if (visitedNodes.includes(node.id)) {
        ctx.fillStyle = visitedColor
        ctx.lineWidth = 2
      } else {
        ctx.fillStyle = defaultColor
        ctx.lineWidth = 1
      }

      ctx.fill()
      ctx.strokeStyle = currentColor
      ctx.stroke()

      // Node label
      ctx.fillStyle = textColor
      ctx.font = "bold 16px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(node.label, pos.x, pos.y)
    })
  }, [graph, visitedNodes, currentNode, showWeights])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
