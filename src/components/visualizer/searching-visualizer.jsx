"use client"

import { useState, useEffect } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { linearSearch, binarySearch } from "@/lib/searching-algorithms"

export function SearchingVisualizer({ algorithm }) {
  const [array, setArray] = useState(Array.from({ length: 20 }, () => Math.floor(Math.random() * 100)))
  const [searchValue, setSearchValue] = useState("")
  const [speed, setSpeed] = useState(20)
  const [isRunning, setIsRunning] = useState(false)
  const [searchingIndices, setSearchingIndices] = useState([])
  const [foundIndex, setFoundIndex] = useState(-1)
  const [stats, setStats] = useState({ comparisons: 0, steps: 0, found: false })
  const [arraySize, setArraySize] = useState(20)

  // Generate sorted array for binary search
  useEffect(() => {
    if (algorithm.id === "binary-search") {
      const sorted = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b)
      setArray(sorted)
    } else {
      setArray(Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100)))
    }
    resetSearch()
  }, [arraySize, algorithm.id])

  const resetSearch = () => {
    setSearchingIndices([])
    setFoundIndex(-1)
    setStats({ comparisons: 0, steps: 0, found: false })
    setIsRunning(false)
  }

  const handleSearch = async () => {
    if (isRunning) {
      setIsRunning(false)
      return
    }

    if (!searchValue) {
      alert("Please enter a value to search")
      return
    }

    const target = Number.parseInt(searchValue, 10)
    setIsRunning(true)
    setSearchingIndices([])
    setFoundIndex(-1)
    setStats({ comparisons: 0, steps: 0, found: false })

    const updateState = (searching, found, steps) => {
      setSearchingIndices(searching)
      setFoundIndex(found)
      setStats((prev) => ({ 
        comparisons: prev.comparisons + 1, 
        steps: steps, 
        found: found !== -1 
      }))
    }

    const searchFn = algorithm.id === "binary-search" ? binarySearch : linearSearch
    const result = await searchFn(array, target, updateState, speed)

    setFoundIndex(result)
    setStats((prev) => ({ ...prev, found: result !== -1 }))
    setIsRunning(false)
  }

  return (
    <div className="h-full flex flex-col gap-4 p-4">
      {/* Controls Section */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder={`Search value (0-100)...`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
            disabled={isRunning}
          />
          <Button size="icon" onClick={handleSearch} className={isRunning ? "bg-accent hover:bg-accent/90" : ""}>
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button size="icon" variant="outline" onClick={resetSearch} disabled={isRunning}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-muted-foreground w-12">Speed:</label>
          <Slider
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            min={5}
            max={100}
            step={5}
            disabled={isRunning}
            className="flex-1"
          />
          <span className="text-sm font-medium w-8 text-right">{speed}%</span>
        </div>

        {/* Array Size Control */}
        {algorithm.id === "linear-search" && (
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-muted-foreground w-12">Size:</label>
            <Slider
              value={[arraySize]}
              onValueChange={(value) => setArraySize(value[0])}
              min={10}
              max={50}
              step={5}
              disabled={isRunning}
              className="flex-1"
            />
            <span className="text-sm font-medium w-8 text-right">{arraySize}</span>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="text-xs text-muted-foreground">Comparisons</div>
            <div className="font-mono font-bold text-primary mt-1">{stats.comparisons}</div>
          </div>
          <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="text-xs text-muted-foreground">Steps</div>
            <div className="font-mono font-bold text-secondary mt-1">{stats.steps}</div>
          </div>
          <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="text-xs text-muted-foreground">Status</div>
            <div
              className={`font-mono font-bold mt-1 ${stats.found ? "text-green-500" : foundIndex === -1 && stats.comparisons > 0 ? "text-red-500" : "text-muted-foreground"}`}
            >
              {foundIndex !== -1 ? `Found at ${foundIndex}` : stats.comparisons > 0 ? "Not found" : "Ready"}
            </div>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="flex-1 flex items-end gap-1 p-4 bg-muted/30 rounded-lg ">
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`flex-1 rounded-t transition flex justify-center relative ${
              foundIndex === idx
                ? "bg-green-500 shadow-lg shadow-green-500/50"
                : searchingIndices.includes(idx)
                  ? "bg-orange-500"
                  : "bg-primary/40"
            }`}
            style={{ height: `${(value / 100) * 100}%`, minHeight: "4px" }}
            title={`${value}`}
          > 
          <span className="absolute -bottom-5 text-sm ">{value}</span>
          </div>
        ))}
      </div>

      {/* Info Message */}
      <div className="text-xs text-muted-foreground text-center">
        {algorithm.id === "binary-search" && "Array is sorted for binary search"}
        {algorithm.id === "linear-search" && "Array is unsorted - tests every element"}
      </div>
    </div>
  )
}
