"use client"

import { useState } from "react"
import { Play, Pause, RotateCcw, Shuffle, MapPin, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { GraphCanvas } from "./graph-canvas"
import { bfsTraversal, dfsTraversal, dijkstraAlgorithm } from "@/lib/graph-algorithms"

// Sample graph for visualization with weights
const SAMPLE_GRAPH = {
  nodes: [
    { id: 0, label: "A" },
    { id: 1, label: "B" },
    { id: 2, label: "C" },
    { id: 3, label: "D" },
    { id: 4, label: "E" },
    { id: 5, label: "F" },
  ],
  edges: [
    { from: 0, to: 1, weight: 4 },
    { from: 0, to: 2, weight: 2 },
    { from: 1, to: 3, weight: 5 },
    { from: 2, to: 4, weight: 10 },
    { from: 3, to: 5, weight: 3 },
    { from: 4, to: 5, weight: 7 },
    { from: 1, to: 2, weight: 1 },
  ],
}

export function GraphVisualizer({ algorithm }) {
  const [speed, setSpeed] = useState(50)
  const [isRunning, setIsRunning] = useState(false)
  const [visitedNodes, setVisitedNodes] = useState([])
  const [currentNode, setCurrentNode] = useState(-1)
  const [visitOrder, setVisitOrder] = useState([])
  const [startNode, setStartNode] = useState(0)
  const [distances, setDistances] = useState({})
  const [message, setMessage] = useState("")

  const handleTraverse = async () => {
    if (isRunning) {
      setIsRunning(false)
      return
    }

    setIsRunning(true)
    setVisitedNodes([])
    setVisitOrder([])
    setCurrentNode(-1)
    setDistances({})
    setMessage("")

    const delayTime = Math.max(100, 2000 - speed * 19)
    const order = []
    const visited = new Set()

    if (algorithm.id === "dijkstra") {
      // Dijkstra's algorithm
      const updateState = (nodeId, dists, previous) => {
        setCurrentNode(nodeId)
        if (!visited.has(nodeId)) {
          visited.add(nodeId)
          setVisitedNodes(Array.from(visited))
          order.push(nodeId)
          setVisitOrder([...order])
        }
        setDistances(() => ({ ...dists }))
      }

      await dijkstraAlgorithm(SAMPLE_GRAPH, startNode, updateState, delayTime)
      setMessage(`Shortest paths from ${SAMPLE_GRAPH.nodes[startNode].label} calculated`)
    } else {
      // BFS or DFS
      const updateState = (nodeId) => {
        setCurrentNode(nodeId)
        if (!visited.has(nodeId)) {
          visited.add(nodeId)
          setVisitedNodes(Array.from(visited))
          order.push(nodeId)
          setVisitOrder([...order])
        }
      }

      const traverseFn = algorithm.id === "bfs" ? bfsTraversal : dfsTraversal
      await traverseFn(SAMPLE_GRAPH, startNode, updateState, delayTime)
      setMessage(`${algorithm.name} traversal complete`)
    }

    setCurrentNode(-1)
    setIsRunning(false)
  }

  const handleReset = () => {
    setVisitedNodes([])
    setCurrentNode(-1)
    setVisitOrder([])
    setDistances({})
    setMessage("")
    setIsRunning(false)
  }

  return (
    <div className="h-full flex flex-col gap-6 p-6 ">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold">{algorithm.name}</h2>
          <Badge variant="outline" className="ml-auto">
            {algorithm.complexity}
          </Badge>
        </div>
        {message && (
          <div className="text-sm font-medium text-green-600 dark:text-green-400">
            {message}
          </div>
        )}
      </div>

      {/* Controls */}
      {/* <div className=""> */}
      {/* Playback Controls */}
      <div className=" space-y-3 p-4 rounded-xl border border-border/50 bg-card/50">
        <label className="text-sm font-semibold">Controls</label>
        <div className="flex gap-2 items-center ">
          <Button
            onClick={handleTraverse}
            className={` ${isRunning ? "bg-accent hover:bg-accent/90" : "bg-primary hover:bg-primary/90"}`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Traversal
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleReset} disabled={isRunning}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>


          {/* Speed Control */}
          <div className="p-4 w-full rounded-xl border border-border/50 bg-card/50 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold">Animation Speed</label>
              <Badge variant="secondary">{speed}%</Badge>
            </div>
            <Slider
              value={[speed]}
              onValueChange={(value) => setSpeed(value[0])}
              min={10}
              max={100}
              step={5}
              disabled={isRunning}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Slower</span>
              <span>Faster</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Start Node</label>
          <select
            value={startNode}
            onChange={(e) => setStartNode(Number(e.target.value))}
            disabled={isRunning}
            className="ml-3 px-4 py-2 rounded-lg border border-border/50 bg-background text-sm text-foreground focus:ring-2 focus:ring-primary/50 transition"
          >
            {SAMPLE_GRAPH.nodes.map((node) => (
              <option key={node.id} value={node.id}>
                Node {node.label}
              </option>
            ))}
          </select>
        </div>

        <div className="p-6 rounded-xl border border-border/50 bg-gradient-to-br from-card/50 to-muted/20 backdrop-blur-sm overflow-auto">

          <GraphCanvas
            graph={SAMPLE_GRAPH}
            visitedNodes={visitedNodes}
            currentNode={currentNode}
            highlightEdges={algorithm.id === "bfs"}
            showWeights={algorithm.id === "dijkstra"}
          />
        </div>

        {/* Visit Order & Distances */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Visit Order */}
          {visitOrder.length > 0 && (
            <div className="p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
              <div className="text-sm font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Visit Order
              </div>
              <div className="flex gap-2 flex-wrap">
                {visitOrder.map((nodeId, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <Badge
                      variant="outline"
                      className="px-3 py-1.5 font-mono text-sm bg-primary/20 hover:bg-primary/30 transition"
                    >
                      {SAMPLE_GRAPH.nodes[nodeId].label}
                    </Badge>
                    {idx < visitOrder.length - 1 && (
                      <span className="text-muted-foreground">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dijkstra Distances */}
          {algorithm.id === "dijkstra" && Object.keys(distances).length > 0 && (
            <div className="p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm space-y-4">
              <div>
                <div className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  Shortest Path Distances
                </div>
                <p className="text-xs text-muted-foreground">
                  From Node <span className="font-bold text-primary">{SAMPLE_GRAPH.nodes[startNode].label}</span> to each destination
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SAMPLE_GRAPH.nodes.map((node) => {
                  const dist = distances[node.id]
                  const isSource = node.id === startNode
                  const isReachable = dist !== Infinity

                  return (  
                    <div
                      key={node.id}
                      className={`p-3 rounded-lg border transition-all ${isSource
                        ? "bg-gradient-to-br from-primary/20 to-primary/10 border-primary/50 ring-2 ring-primary/30"
                        : isReachable
                          ? "bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30"
                          : "bg-gradient-to-br from-muted/50 to-muted/30 border-border/50 opacity-60"
                        }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-muted-foreground">
                          {isSource ? "Source" : "To"}
                        </span>
                        <span className={`text-lg font-bold ${isSource ? "text-primary" : isReachable ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                          }`}>
                          {node.label}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-muted-foreground">Distance:</span>
                        <span className={`font-mono font-bold text-lg ${isSource ? "text-primary" : isReachable ? "text-accent" : "text-muted-foreground"
                          }`}>
                          {dist === Infinity ? "∞" : dist}
                        </span>
                      </div>

                      {!isReachable && !isSource && (
                        <div className="text-[10px] text-muted-foreground mt-1 italic">
                          Not reachable
                        </div>
                      )}
                      {isSource && (
                        <div className="text-[10px] text-primary mt-1 font-medium">
                          Starting point
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                <div className="text-blue-500 mt-0.5"><Info /> </div>
                <div className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">How to read:</span> The distance value shows the shortest path length from <span className="font-bold text-primary">{SAMPLE_GRAPH.nodes[startNode].label}</span> to each node.
                  <span className="font-bold text-accent"> Lower numbers = closer nodes.</span> ∞ means the node cannot be reached.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        {/* <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/30 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-muted/50 border-2 border-border" />
            <span className="text-muted-foreground text-xs">Unvisited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-accent border-2 border-accent/50" />
            <span className="text-muted-foreground text-xs">Visiting</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary border-2 border-primary/50" />
            <span className="text-muted-foreground text-xs">Visited</span>
          </div>
          <div className="ml-auto text-xs text-muted-foreground italic">
            {algorithm.id === "bfs" && "Explores nodes level by level"}
            {algorithm.id === "dfs" && "Explores as far as possible before backtracking"}
            {algorithm.id === "dijkstra" && "Finds shortest paths to all nodes"}
          </div>
        </div> */}


        {/* Graph Canvas */}
        {/* <div className="flex-1 bg-muted/30 rounded-lg border border-border/50 overflow-hidden">
          <GraphCanvas
            graph={SAMPLE_GRAPH}
            visitedNodes={visitedNodes}
            currentNode={currentNode}
            highlightEdges={algorithm.id === "bfs"}
          />
        </div> */}

        {/* Visit Order */}
        {/* {visitOrder.length > 0 && (
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
        )} */}
      </div>
    </div>
  )
}
