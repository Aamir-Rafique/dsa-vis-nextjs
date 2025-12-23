"use client"

import { useState } from "react"
import { Play, Pause, RotateCcw, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { LinkedListCanvas } from "./linked-list-canvas"

export function LinkedListVisualizer({ algorithm }) {
  const [values, setValues] = useState([5, 12, 8, 3, 15])
  const [inputValue, setInputValue] = useState("")
  const [speed, setSpeed] = useState(30)
  const [isAnimating, setIsAnimating] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [animationType, setAnimationType] = useState(null)

  const isCircular = algorithm.id === "circular-linked-list" || algorithm.id === "circular-doubly-list"
  const isDoubly = algorithm.id === "doubly-linked-list" || algorithm.id === "circular-doubly-list"

  const handleInsert = async (position = "end") => {
    if (!inputValue.trim()) {
      alert("Please enter a value")
      return
    }

    const newValue = Number.parseInt(inputValue, 10)
    if (isNaN(newValue)) {
      alert("Please enter a valid number")
      return
    }

    setIsAnimating(true)
    setAnimationType("insert")

    let newValues
    if (position === "end") {
      newValues = [...values, newValue]
      setHighlightedIndex(values.length)
    } else if (position === "start") {
      newValues = [newValue, ...values]
      setHighlightedIndex(0)
    }

    // Animate insertion
    await new Promise((resolve) => setTimeout(resolve, 101 - speed))
    setValues(newValues)
    setInputValue("")
    setHighlightedIndex(-1)
    setAnimationType(null)
    setIsAnimating(false)
  }

  const handleDelete = async (index) => {
    if (values.length === 0) return

    setIsAnimating(true)
    setAnimationType("delete")
    setHighlightedIndex(index)

    await new Promise((resolve) => setTimeout(resolve, 101 - speed))
    const newValues = values.filter((_, i) => i !== index)
    setValues(newValues)
    setHighlightedIndex(-1)
    setAnimationType(null)
    setIsAnimating(false)
  }

  const handleTraverse = async () => {
    setIsAnimating(true)
    setAnimationType("traverse")

    for (let i = 0; i < values.length; i++) {
      setHighlightedIndex(i)
      await new Promise((resolve) => setTimeout(resolve, 200 - speed))
    }

    setHighlightedIndex(-1)
    setAnimationType(null)
    setIsAnimating(false)
  }

  const handleReset = () => {
    setValues([5, 12, 8, 3, 15])
    setHighlightedIndex(-1)
    setAnimationType(null)
    setIsAnimating(false)
  }

  return (
    <div className="h-full flex flex-col gap-4 p-4">
      {/* Controls */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Enter a value..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleInsert("end")}
            disabled={isAnimating}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={() => handleInsert("end")}
            disabled={isAnimating}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Operation Buttons */}
        <div className="flex gap-2 flex-wrap">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleInsert("start")}
            disabled={isAnimating || !inputValue}
            className="text-xs"
          >
            Insert at Start
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleTraverse}
            disabled={isAnimating || values.length === 0}
            className="text-xs bg-transparent"
          >
            {isAnimating && animationType === "traverse" ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            Traverse
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            disabled={isAnimating}
            className="text-xs bg-transparent"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
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
            disabled={isAnimating}
            className="flex-1"
          />
          <span className="text-sm font-medium w-8 text-right">{speed}%</span>
        </div>

        {/* Info */}
        <div className="p-2 rounded-lg bg-muted/30 border border-border/50 text-xs">
          <div className="text-muted-foreground">
            Length: <span className="font-bold text-primary">{values.length}</span>
          </div>
          <div className="text-muted-foreground mt-1">
            Type: <span className="font-bold">{algorithm.name}</span>
          </div>
        </div>
      </div>

      {/* Canvas Visualization */}
      <div className="flex-1 bg-muted/30 rounded-lg p-4 flex items-center justify-center overflow-auto ">
        <LinkedListCanvas
          values={values}
          highlightedIndex={highlightedIndex}
          isCircular={isCircular}
          isDoubly={isDoubly}
          onDeleteNode={handleDelete}
          isAnimating={isAnimating}
        />
      </div>

      {/* Node List */}
      <div className="flex gap-2 flex-wrap p-3 bg-muted/20 rounded-lg max-h-20 overflow-y-auto">
        {values.length === 0 ? (
          <span className="text-xs text-muted-foreground w-full">No nodes yet. Add a value to create nodes.</span>
        ) : (
          values.map((value, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-mono transition ${
                highlightedIndex === idx
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary/20 text-foreground hover:bg-primary/30"
              }`}
            >
              <span>{value}</span>
              {!isAnimating && (
                <button
                  onClick={() => handleDelete(idx)}
                  className="ml-1 opacity-60 hover:opacity-100 transition"
                  title="Delete node"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
