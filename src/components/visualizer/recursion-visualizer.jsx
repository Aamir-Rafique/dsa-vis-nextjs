"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

export function RecursionVisualizer({ algorithm }) {
  const [inputValue, setInputValue] = useState("5")
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState(20)
  const [result, setResult] = useState(null)
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [towers, setTowers] = useState({ A: [], B: [], C: [] })
  const [callStack, setCallStack] = useState([])
  const canvasRef = useRef(null)
  const pauseRef = useRef(false)

  const factorialSteps = (n) => {
    const steps = []
    const stackStates = []
    const calculate = (num, depth = 0) => {
      const indent = "  ".repeat(depth)
      steps.push(`${indent}factorial(${num})`)
      stackStates.push([...Array(depth + 1)].map((_, i) => n - i))
      if (num <= 1) {
        steps.push(`${indent}  → returns 1`)
        stackStates.push([...Array(depth + 1)].map((_, i) => n - i))
        return 1
      }
      const result = num * calculate(num - 1, depth + 1)
      steps.push(`${indent}  → returns ${result}`)
      stackStates.push([...Array(depth + 1)].map((_, i) => n - i))
      return result
    }
    const result = calculate(n)
    return { steps, result, stackStates }
  }

  const hanoi = (n, source = "A", target = "C", auxiliary = "B") => {
    const steps = []
    const towerStates = []
    const towers = { A: Array.from({ length: n }, (_, i) => n - i), B: [], C: [] }
    towerStates.push(JSON.parse(JSON.stringify(towers)))
    
    const solve = (n, source, target, auxiliary, depth = 0) => {
      if (n === 1) {
        const disk = towers[source].pop()
        towers[target].push(disk)
        steps.push(`Move disk ${disk} from ${source} to ${target}`)
        towerStates.push(JSON.parse(JSON.stringify(towers)))
        return
      }
      solve(n - 1, source, auxiliary, target, depth + 1)
      const disk = towers[source].pop()
      towers[target].push(disk)
      steps.push(`Move disk ${disk} from ${source} to ${target}`)
      towerStates.push(JSON.parse(JSON.stringify(towers)))
      solve(n - 1, auxiliary, target, source, depth + 1)
    }
    solve(n, source, target, auxiliary)
    return { steps, result: `${Math.pow(2, n) - 1} moves required`, towerStates }
  }

  const handleExecute = async () => {
    const n = Number.parseInt(inputValue, 10)
    if (isNaN(n) || n < 0) {
      alert("Please enter a valid non-negative number")
      return
    }

    if (n > 10) {
      alert("Value too large. Please use a number ≤ 10")
      return
    }

    setIsRunning(true)
    setIsPaused(false)
    pauseRef.current = false
    setCurrentStep(0)
    setCallStack([])
    setTowers({ A: [], B: [], C: [] })

    if (algorithm.id === "factorial") {
      const { steps: newSteps, result, stackStates } = factorialSteps(n)
      setSteps(newSteps)
      setResult(result)
      
      // Animate through steps
      for (let i = 0; i < newSteps.length; i++) {
        // Check for pause
        while (pauseRef.current) {
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
        
        setCurrentStep(i + 1)
        setCallStack(stackStates[i] || [])
        await new Promise((resolve) => setTimeout(resolve, 1000 - speed * 8))
      }
    } else {
      const { steps: newSteps, result, towerStates } = hanoi(n)
      setSteps(newSteps)
      setResult(result)
      
      // Animate through steps (including final state)
      for (let i = 0; i <= newSteps.length; i++) {
        // Check for pause
        while (pauseRef.current) {
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
        
        if (i < newSteps.length) {
          setCurrentStep(i + 1)
        }
        setTowers(towerStates[i] || { A: [], B: [], C: [] })
        if (i < newSteps.length) {
          await new Promise((resolve) => setTimeout(resolve, 1000 - speed * 8))
        }
      }
    }

    setIsRunning(false)
    setIsPaused(false)
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
    pauseRef.current = !pauseRef.current
  }

  const handleReset = () => {
    setSteps([])
    setCurrentStep(0)
    setResult(null)
    setIsRunning(false)
    setIsPaused(false)
    pauseRef.current = false
    setCallStack([])
    setTowers({ A: [], B: [], C: [] })
  }

  // Draw Tower of Hanoi canvas
  useEffect(() => {
    if (algorithm.id !== "tower-of-hanoi" || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background
    ctx.fillStyle = "hsl(var(--muted) / 0.3)"
    ctx.fillRect(0, 0, width, height)

    const towerWidth = width / 3
    const baseY = height - 40
    const poleHeight = height - 100
    const diskHeight = 35
    const maxDiskWidth = towerWidth * 1.5

    const towerPositions = {
      A: width / 6,
      B: width / 2,
      C: (5 * width) / 6,
    }

    // Draw poles and bases
    Object.entries(towerPositions).forEach(([name, x]) => {
      // Base
      ctx.fillStyle = "#888888"
      ctx.fillRect(x - towerWidth / 3, baseY, towerWidth / 1.5, 8)

      // Pole
      ctx.fillStyle = "#666666"
      ctx.fillRect(x - 5, baseY - poleHeight, 10, poleHeight)

      // Tower label
      ctx.fillStyle = "#333333"
      ctx.font = "bold 20px monospace"
      ctx.textAlign = "center"
      ctx.fillText(name, x, baseY + 30)
    })

    // Draw disks
    Object.entries(towers).forEach(([tower, disks]) => {
      const x = towerPositions[tower]
      disks.forEach((diskSize, idx) => {
        const diskWidth = (diskSize / 10) * maxDiskWidth
        const y = baseY - (idx + 1) * diskHeight - 5

        // Disk gradient
        const gradient = ctx.createLinearGradient(x - diskWidth / 2, y, x + diskWidth / 2, y)
        const hue = (diskSize * 30) % 360
        gradient.addColorStop(0, `hsl(${hue}, 70%, 60%)`)
        gradient.addColorStop(1, `hsl(${hue}, 70%, 45%)`)

        // Draw disk with shadow
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
        ctx.shadowBlur = 8
        ctx.shadowOffsetY = 4

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.roundRect(x - diskWidth / 2, y, diskWidth, diskHeight - 5, 8)
        ctx.fill()

        // Reset shadow
        ctx.shadowColor = "transparent"
        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0

        // Disk border
        ctx.strokeStyle = `hsl(${hue}, 70%, 30%)`
        ctx.lineWidth = 2
        ctx.stroke()

        // Disk number
        ctx.fillStyle = "white"
        ctx.font = "bold 14px monospace"
        ctx.textAlign = "center"
        ctx.fillText(diskSize.toString(), x, y + diskHeight / 2 + 2)
      })
    })
  }, [towers, algorithm.id])

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
            onClick={isRunning ? handlePause : handleExecute}
            className={isPaused ? " hover:bg-warning/90" : isRunning ? "bg-accent hover:bg-accent/90" : ""}
          >
            {isRunning ? (isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />) : <Play className="w-4 h-4" />}
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

      {/* Main Visualization Area */}
      <div className="flex-1 flex gap-4 min-h-0 ">
        {/* Visual Representation */}
        <div className="flex-1 bg-muted/30 rounded-lg p-4 overflow-hidden ">
          {algorithm.id === "tower-of-hanoi" ? (
            // Tower of Hanoi Canvas
            <div className={`  flex flex-col ${isRunning? 'h-1/2 fixed top-60 left-5 z-10 w-[40%]':'h-1/3'}`}>
              <div className="text-sm font-medium text-muted-foreground mb-2 bg-white text-center w-fit  p-2 rounded-2xl">Tower of Hanoi Visualization</div>
              <canvas
                ref={canvasRef}
                width={800}
                height={400}
                className="w-full h-full rounded-lg"
                style={{ maxHeight: "100%" }}
              />
            </div>
          ) : (
            // Factorial Call Stack
            <div className="h-full flex flex-col">
              <div className="text-sm font-medium text-muted-foreground mb-2">Call Stack</div>
              <div className="flex-1 flex flex-col-reverse gap-2 overflow-auto p-2">
                {callStack.length === 0 ? (
                  <div className="text-muted-foreground text-center py-8">Execute to see the call stack</div>
                ) : (
                  callStack.map((value, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg border-2 border-primary/50 bg-primary/10 transition-all animate-in slide-in-from-bottom"
                      style={{
                        marginLeft: `${idx * 20}px`,
                        transform: `scale(${1 - idx * 0.05})`,
                      }}
                    >
                      <div className="font-mono font-bold text-lg">factorial({value})</div>
                      <div className="text-xs text-muted-foreground mt-1">Depth: {idx}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Steps Display */}
        <div className="w-80 bg-muted/30 rounded-lg p-4 overflow-auto">
          <div className="text-sm font-medium text-muted-foreground mb-2">Execution Steps</div>
          {steps.length === 0 ? (
            <div className="text-muted-foreground text-center py-8 text-sm">
              Enter a value and click Execute to see the steps
            </div>
          ) : (
            <div className="space-y-1">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`py-1.5 px-2 rounded text-xs transition-all ${
                    idx === currentStep - 1
                      ? "text-foreground bg-primary/30 font-semibold scale-105 border border-primary/50"
                      : idx < currentStep
                      ? "text-foreground/70 bg-primary/10"
                      : "text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          )}
          {steps.length > 0 && (
            <div className="text-xs text-center text-muted-foreground mt-4 pt-3 border-t border-border/50">
              Step {currentStep} of {steps.length}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
