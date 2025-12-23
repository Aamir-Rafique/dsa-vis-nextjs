"use client"

import { useState, useEffect } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { SortingCanvas } from "./sorting-canvas"
import { getSortingAlgorithm } from "@/lib/sorting-algorithms"

export function SortingVisualizer({ algorithm }) {
  const [arraySize, setArraySize] = useState(50)
  const [speed, setSpeed] = useState(30)
  const [isRunning, setIsRunning] = useState(false)
  const [array, setArray] = useState([])
  const [comparingIndices, setComparingIndices] = useState([])
  const [sortedIndices, setSortedIndices] = useState([])
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, time: 0 })
  const [currentStep, setCurrentStep] = useState("")
  const [algorithmInsight, setAlgorithmInsight] = useState("")

  // Algorithm-specific educational insights
  const getAlgorithmInsights = (algoId) => {
    const insights = {
      "bubble-sort": "Watch elements 'bubble up' to their correct positions. Larger elements move right one position at a time.",
      "merge-sort": "Divide-and-conquer: splits array in half recursively, then merges sorted subarrays.",
      "quick-sort": "Purple bar is the pivot. Elements are partitioned: smaller left, larger right of pivot.",
      "heap-sort": "Builds a max-heap structure, then repeatedly extracts the maximum element.",
    }
    return insights[algoId] || "Observe how elements are compared and repositioned."
  }

  // Initialize array
  useEffect(() => {
    generateNewArray(arraySize)
    setAlgorithmInsight(getAlgorithmInsights(algorithm.id))
  }, [arraySize, algorithm.id])

  const generateNewArray = (size) => {
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1)
    setArray(newArray)
    setComparingIndices([])
    setSortedIndices([])
    setCurrentStep("")
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
      if (newSwaps > 0) {
        swaps += newSwaps
        setCurrentStep(`Swapping elements at positions ${comparing[0]} and ${comparing[1]}`)
      } else {
        setCurrentStep(`Comparing elements at positions ${comparing.join(", ")}`)
      }
      setStats({ comparisons, swaps, time: Math.round(performance.now() - startTime) })
    }

    try {
      await sortFn(newArray, updateState, speed)
      setArray(newArray)
      setSortedIndices(Array.from({ length: newArray.length }, (_, i) => i))
      setComparingIndices([])
      setCurrentStep("✓ Sorting complete!")
      setIsRunning(false)
    } catch (error) {
      console.error("Sort error:", error)
      setCurrentStep("Error occurred during sorting")
      setIsRunning(false)
    }
  }

  const handleReset = () => {
    generateNewArray(arraySize)
  }

  return (
    <div className="h-full flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{algorithm.name}</h2>
          <Badge variant="outline" className="ml-auto">
            {algorithm.complexity}
          </Badge>
        </div>
        {/* Educational Insight */}
        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-blue-600 dark:text-blue-400">💡 Key Concept:</span>{" "}
            {algorithmInsight}
          </p>
        </div>
        {/* Current Step Display */}
        {currentStep && (
          <div className="text-sm font-medium text-accent animate-pulse">
            {currentStep}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="space-y-4 p-4 rounded-xl border border-border/50 bg-card/50">
        <label className="text-sm font-semibold">Controls</label>
        
        {/* Playback Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button onClick={handleSort} className={isRunning ? "bg-accent hover:bg-accent/90" : "bg-primary"}>
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Sorting
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleReset} disabled={isRunning}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Generate New Array
          </Button>

          {/* Stats */}
          <div className="ml-auto flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">Comparisons</div>
              <div className="font-mono font-bold text-lg text-primary">{stats.comparisons}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">Swaps</div>
              <div className="font-mono font-bold text-lg text-green-600 dark:text-green-400">{stats.swaps}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">Time (ms)</div>
              <div className="font-mono font-bold text-lg text-accent">{stats.time}</div>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Speed Control */}
          <div className="p-4 rounded-xl border border-border/50 bg-card/50 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold">Animation Speed</label>
              <Badge variant="secondary">{speed}%</Badge>
            </div>
            <Slider
              value={[speed]}
              onValueChange={(value) => setSpeed(value[0])}
              min={5}
              max={100}
              step={5}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Slower</span>
              <span>Faster</span>
            </div>
          </div>

          {/* Array Size Control */}
          <div className="p-4 rounded-xl border border-border/50 bg-card/50 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold">Array Size</label>
              <Badge variant="secondary">{arraySize}</Badge>
            </div>
            <Slider
              value={[arraySize]}
              onValueChange={(value) => setArraySize(value[0])}
              min={10}
              max={200}
              step={10}
              disabled={isRunning}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10</span>
              <span>200</span>
            </div>
          </div>
        </div>

        {/* Visualization Canvas */}
        <div className="p-6 rounded-xl border border-border/50 bg-gradient-to-br from-card/50 to-muted/20 backdrop-blur-sm min-h-[400px]">
          <SortingCanvas
            array={array}
            comparingIndices={comparingIndices}
            sortedIndices={sortedIndices}
            maxValue={100}
            algorithmType={algorithm.id}
          />
        </div>

        {/* Legend - Algorithm Specific */}
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/30 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500" />
            <span className="text-muted-foreground text-xs">Unsorted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500" />
            <span className="text-muted-foreground text-xs">Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500" />
            <span className="text-muted-foreground text-xs">Sorted</span>
          </div>
          {algorithm.id === "quick-sort" && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500" />
              <span className="text-muted-foreground text-xs">Pivot</span>
            </div>
          )}
          {algorithm.id === "bubble-sort" && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500" />
              <span className="text-muted-foreground text-xs">Swapping</span>
            </div>
          )}
          <div className="ml-auto text-xs text-muted-foreground italic">
            Visualizing {algorithm.name}
          </div>
        </div>

        {/* Second Legend - kept for layout consistency */}
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/30 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500" />
            <span className="text-muted-foreground text-xs">Unsorted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500" />
            <span className="text-muted-foreground text-xs">Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500" />
            <span className="text-muted-foreground text-xs">Sorted</span>
          </div>
          <div className="ml-auto text-xs text-muted-foreground italic">
            Visualizing {algorithm.name}
          </div>
        </div>
      </div>
    </div>
  )
}
