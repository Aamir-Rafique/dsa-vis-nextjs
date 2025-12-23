"use client"

import { useState, useEffect } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { SortingCanvas } from "./sorting-canvas"
import { getSortingAlgorithm } from "@/lib/sorting-algorithms"

export function SortingVisualizer({ algorithm }) {
  const [arraySize, setArraySize] = useState(50)
  const [speed, setSpeed] = useState(50)
  const [isRunning, setIsRunning] = useState(false)
  const [array, setArray] = useState([])
  const [comparingIndices, setComparingIndices] = useState([])
  const [sortedIndices, setSortedIndices] = useState([])
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, time: 0 })

  // Initialize array
  useEffect(() => {
    generateNewArray(arraySize)
  }, [arraySize])

  const generateNewArray = (size) => {
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1)
    setArray(newArray)
    setComparingIndices([])
    setSortedIndices([])
    setStats({ comparisons: 0, swaps: 0, time: 0 })
    setIsRunning(false)
  }

  const handleSort = async () => {
    if (isRunning) {
      setIsRunning(false)
      return
    }

    setIsRunning(true)
    const startTime = performance.now()
    const sortFn = getSortingAlgorithm(algorithm.id)

    const newArray = [...array]
    let comparisons = 0
    let swaps = 0

    const updateState = (comparing, sorted, newSwaps = 0) => {
      setComparingIndices(comparing)
      setSortedIndices(sorted)
      comparisons++
      if (newSwaps > 0) swaps += newSwaps
      setStats({ comparisons, swaps, time: Math.round(performance.now() - startTime) })
    }

    try {
      await sortFn(newArray, updateState, speed)
      setArray(newArray)
      setSortedIndices(Array.from({ length: newArray.length }, (_, i) => i))
      setComparingIndices([])
      setIsRunning(false)
    } catch (error) {
      console.error("Sort error:", error)
      setIsRunning(false)
    }
  }

  const handleReset = () => {
    generateNewArray(arraySize)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="border-b border-border/40 p-4 bg-card/20 space-y-4">
        {/* Playback Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button size="icon" onClick={handleSort} className={isRunning ? "bg-accent hover:bg-accent/90" : ""}>
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button size="icon" variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>

          {/* Stats */}
          <div className="ml-auto flex items-center gap-6 text-sm">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Comparisons</div>
              <div className="font-mono font-bold text-primary">{stats.comparisons}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Swaps</div>
              <div className="font-mono font-bold text-secondary">{stats.swaps}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Time (ms)</div>
              <div className="font-mono font-bold text-accent">{stats.time}</div>
            </div>
          </div>
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
            className="flex-1"
          />
          <span className="text-sm font-medium w-8 text-right">{speed}%</span>
        </div>

        {/* Array Size Control */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-muted-foreground w-12">Size:</label>
          <Slider
            value={[arraySize]}
            onValueChange={(value) => setArraySize(value[0])}
            min={10}
            max={200}
            step={10}
            disabled={isRunning}
            className="flex-1"
          />
          <span className="text-sm font-medium w-8 text-right">{arraySize}</span>
        </div>
      </div>

      {/* Visualization Canvas */}
      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        <div className="flex-1 bg-card rounded-lg border border-border/50 p-4">
          <SortingCanvas
            array={array}
            comparingIndices={comparingIndices}
            sortedIndices={sortedIndices}
            maxValue={100}
          />
        </div>
      </div>
    </div>
  )
}
