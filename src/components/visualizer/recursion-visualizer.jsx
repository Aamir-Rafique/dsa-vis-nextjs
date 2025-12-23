"use client"

import { useState } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

export function RecursionVisualizer({ algorithm }) {
  const [inputValue, setInputValue] = useState("5")
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState(50)
  const [result, setResult] = useState(null)
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)

  const factorialSteps = (n) => {
    const steps = []
    const calculate = (num, depth = 0) => {
      const indent = "  ".repeat(depth)
      steps.push(`${indent}factorial(${num})`)
      if (num <= 1) {
        steps.push(`${indent}  → returns 1`)
        return 1
      }
      const result = num * calculate(num - 1, depth + 1)
      steps.push(`${indent}  → returns ${result}`)
      return result
    }
    const result = calculate(n)
    return { steps, result }
  }

  const hanoi = (n, source = "A", target = "C", auxiliary = "B") => {
    const steps = []
    const solve = (n, source, target, auxiliary, depth = 0) => {
      if (n === 1) {
        steps.push(`Move disk 1 from ${source} to ${target}`)
        return
      }
      solve(n - 1, source, auxiliary, target, depth + 1)
      steps.push(`Move disk ${n} from ${source} to ${target}`)
      solve(n - 1, auxiliary, target, source, depth + 1)
    }
    solve(n, source, target, auxiliary)
    return { steps, result: `${Math.pow(2, n) - 1} moves required` }
  }

  const handleExecute = async () => {
    const n = Number.parseInt(inputValue, 10)
    if (isNaN(n) || n < 0) {
      alert("Please enter a valid non-negative number")
      return
    }

    if (n > 15) {
      alert("Value too large. Please use a number ≤ 15")
      return
    }

    setIsRunning(true)
    setCurrentStep(0)

    const { steps: newSteps, result } = algorithm.id === "factorial" ? factorialSteps(n) : hanoi(n)

    setSteps(newSteps)
    setResult(result)

    // Animate through steps
    for (let i = 0; i < newSteps.length; i++) {
      setCurrentStep(i + 1)
      await new Promise((resolve) => setTimeout(resolve, 101 - speed))
    }

    setIsRunning(false)
  }

  const handleReset = () => {
    setSteps([])
    setCurrentStep(0)
    setResult(null)
    setIsRunning(false)
  }

  return (
    <div className="h-full flex flex-col gap-4 p-4">
      {/* Controls */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Enter a number..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isRunning}
            className="flex-1"
          />
          <Button
            onClick={handleExecute}
            disabled={isRunning}
            className={isRunning ? "bg-accent hover:bg-accent/90" : ""}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button size="icon" variant="outline" onClick={handleReset} disabled={isRunning}>
            <RotateCcw className="w-4 h-4" />
          </Button>
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
        {result && (
          <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="text-xs text-muted-foreground mb-1">Result</div>
            <div className="font-mono font-bold text-primary">{result}</div>
            <div className="text-xs text-muted-foreground mt-2">Steps: {steps.length}</div>
          </div>
        )}
      </div>

      {/* Steps Display */}
      <div className="flex-1 overflow-auto bg-muted/30 rounded-lg p-4 font-mono text-sm">
        {steps.length === 0 ? (
          <div className="text-muted-foreground text-center py-8">Enter a value and click Execute to see the steps</div>
        ) : (
          <div className="space-y-1">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`py-1 px-2 rounded transition ${
                  idx < currentStep ? "text-foreground bg-primary/20" : "text-muted-foreground"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progress */}
      {steps.length > 0 && (
        <div className="text-xs text-center text-muted-foreground">
          Step {currentStep} of {steps.length}
        </div>
      )}
    </div>
  )
}
