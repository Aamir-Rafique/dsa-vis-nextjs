"use client"

import { useState } from "react"
import { Play, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export function NQueensVisualizer() {
  const [boardSize, setBoardSize] = useState(4)
  const [board, setBoard] = useState(Array(16).fill(-1))
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState(50)
  const [solutions, setSolutions] = useState(0)
  const [currentQueen, setCurrentQueen] = useState(-1)

  const handleSolve = async () => {
    setIsRunning(true)
    setBoard(Array(boardSize * boardSize).fill(-1))
    setSolutions(0)
    setCurrentQueen(-1)

    const delayTime = Math.max(10, 151 - speed)
    let solutionCount = 0
    const newBoard = Array(boardSize * boardSize).fill(-1)

    const isSafe = (row, col) => {
      // Check column
      for (let i = 0; i < row; i++) {
        if (newBoard[i * boardSize + col] === 1) return false
      }
      // Check diagonal
      for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (newBoard[i * boardSize + j] === 1) return false
      }
      for (let i = row - 1, j = col + 1; i >= 0 && j < boardSize; i--, j++) {
        if (newBoard[i * boardSize + j] === 1) return false
      }
      return true
    }

    const solve = async (row) => {
      if (row === boardSize) {
        solutionCount++
        setSolutions(solutionCount)
        await new Promise((resolve) => setTimeout(resolve, delayTime * 5))
        return
      }

      for (let col = 0; col < boardSize; col++) {
        setCurrentQueen(row * boardSize + col)
        await new Promise((resolve) => setTimeout(resolve, delayTime))

        if (isSafe(row, col)) {
          newBoard[row * boardSize + col] = 1
          setBoard([...newBoard])
          await solve(row + 1)
          newBoard[row * boardSize + col] = -1
          setBoard([...newBoard])
        }
      }
    }

    await solve(0)
    setIsRunning(false)
    setCurrentQueen(-1)
  }

  const handleReset = () => {
    setBoard(Array(boardSize * boardSize).fill(-1))
    setSolutions(0)
    setCurrentQueen(-1)
    setIsRunning(false)
  }

  return (
    <div className="h-full flex flex-col gap-4 p-4">
      {/* Controls */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Button onClick={handleSolve} disabled={isRunning} className="bg-primary hover:bg-primary/90">
            <Play className="w-4 h-4 mr-2" />
            Solve
          </Button>
          <Button size="icon" variant="outline" onClick={handleReset} disabled={isRunning}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Board Size */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-muted-foreground w-20">Board Size:</label>
          <Slider
            value={[boardSize]}
            onValueChange={(value) => setBoardSize(value[0])}
            min={4}
            max={8}
            step={1}
            disabled={isRunning}
            className="flex-1"
          />
          <span className="text-sm font-medium w-8 text-right">
            {boardSize}x{boardSize}
          </span>
        </div>

        {/* Speed */}
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
        <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
          <div className="text-sm text-muted-foreground">Solutions Found</div>
          <div className="font-mono font-bold text-primary text-2xl mt-1">{solutions}</div>
        </div>
      </div>

      {/* Board Visualization */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div
          className="gap-0 bg-muted/50 rounded-lg overflow-hidden shadow-lg"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
            width: `min(400px, 100%)`,
            aspectRatio: "1",
          }}
        >
          {board.slice(0, boardSize * boardSize).map((cell, idx) => {
            const row = Math.floor(idx / boardSize)
            const col = idx % boardSize
            const isLight = (row + col) % 2 === 0

            return (
              <div
                key={idx}
                className={`flex items-center justify-center text-2xl transition ${
                  isLight ? "bg-muted" : "bg-muted/70"
                } ${currentQueen === idx ? "ring-4 ring-accent" : ""}`}
              >
                {cell === 1 && <span>👑</span>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
