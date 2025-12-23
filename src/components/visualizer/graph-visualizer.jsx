"use client"

import { useState } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { GraphCanvas } from "./graph-canvas"
import { bfsTraversal, dfsTraversal } from "@/lib/graph-algorithms"

// Sample graph for visualization
const SAMPLE_GRAPH = {
  nodes: [
    { id: 0, label: "0" },
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" },
  ],
  edges: [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 5 },
  ],
}

export function GraphVisualizer({ algorithm }) {
  const [speed, setSpeed] = useState(50)
  const [isRunning, setIsRunning] = useState(false)
  const [visitedNodes, setVisitedNodes] = useState([])
  const [currentNode, setCurrentNode] = useState(-1)
  const [visitOrder, setVisitOrder] = useState([])
  const [startNode, setStartNode] = useState(0)

  const handleTraverse = async () => {
    if (isRunning) {
      setIsRunning(false)
      return
    }

    setIsRunning(true)
    setVisitedNodes([])
    setVisitOrder([])
    setCurrentNode(-1)

    const delayTime = Math.max(50, 150 - speed)
    const traverseFn = algorithm.id === "bfs" ? bfsTraversal : dfsTraversal

    const order = []
    const visited = new Set()

    const updateState = (nodeId) => {
      setCurrentNode(nodeId)
      if (!visited.has(nodeId)) {
        visited.add(nodeId)
        setVisitedNodes(Array.from(visited))
        order.push(nodeId)
        setVisitOrder([...order])
      }
    }

    await traverseFn(SAMPLE_GRAPH, startNode, updateState, delayTime)

    setCurrentNode(-1)
    setIsRunning(false)
  }

  const handleReset = () => {
    setVisitedNodes([])
    setCurrentNode(-1)
    setVisitOrder([])
    setIsRunning(false)
  }

  return (
    <div className="h-full flex flex-col gap-4 p-4">
      {/* Controls */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Button size="icon" onClick={handleTraverse} className={isRunning ? "bg-accent hover:bg-accent/90" : ""}>
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button size="icon" variant="outline" onClick={handleReset} disabled={isRunning}>
            <RotateCcw className="w-4 h-4" />
          </Button>

          <select
            value={startNode}
            onChange={(e) => setStartNode(Number(e.target.value))}
            disabled={isRunning}
            className="px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground"
          >
            <option value={0}>Start: Node 0</option>
            {SAMPLE_GRAPH.nodes.map((node) => (
              <option key={node.id} value={node.id}>
                Start: Node {node.id}
              </option>
            ))}
          </select>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-muted-foreground w-12">Speed:</label>
          <Slider
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            min={10}
            max={100}
            step={5}
            disabled={isRunning}
            className="flex-1"
          />
          <span className="text-sm font-medium w-8 text-right">{speed}%</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 rounded-lg bg-muted/30 border border-border/50 text-xs">
            <div className="text-muted-foreground">Visited</div>
            <div className="font-bold text-primary mt-1">{visitedNodes.length}</div>
          </div>
          <div className="p-2 rounded-lg bg-muted/30 border border-border/50 text-xs">
            <div className="text-muted-foreground">Type</div>
            <div className="font-bold text-secondary mt-1">{algorithm.id === "bfs" ? "BFS" : "DFS"}</div>
          </div>
          <div className="p-2 rounded-lg bg-muted/30 border border-border/50 text-xs">
            <div className="text-muted-foreground">Current</div>
            <div className="font-bold text-accent mt-1">{currentNode >= 0 ? currentNode : "—"}</div>
          </div>
        </div>
      </div>

      {/* Graph Canvas */}
      <div className="flex-1 bg-muted/30 rounded-lg border border-border/50 overflow-hidden">
        <GraphCanvas
          graph={SAMPLE_GRAPH}
          visitedNodes={visitedNodes}
          currentNode={currentNode}
          highlightEdges={algorithm.id === "bfs"}
        />
      </div>

      {/* Visit Order */}
      {visitOrder.length > 0 && (
        <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
          <div className="text-xs text-muted-foreground mb-2">Visit Order</div>
          <div className="flex gap-1 flex-wrap">
            {visitOrder.map((nodeId, idx) => (
              <div
                key={idx}
                className="px-2 py-1 rounded bg-primary/30 text-xs font-mono text-foreground border border-primary/50"
              >
                {nodeId}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
