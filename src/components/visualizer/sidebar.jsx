"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const ALGORITHMS = {
  Searching: [
    { id: "linear-search", name: "Linear Search", complexity: "O(n)" },
    { id: "binary-search", name: "Binary Search", complexity: "O(log n)" },
  ],
  "Linked Lists": [
    { id: "singly-linked-list", name: "Singly Linked List", complexity: "O(n)" },
    { id: "doubly-linked-list", name: "Doubly Linked List", complexity: "O(n)" },
    { id: "circular-linked-list", name: "Circular Linked List", complexity: "O(n)" },
  ],
  // Graph: [
  //   { id: "bfs", name: "Breadth-First Search", complexity: "O(V + E)" },
  //   { id: "dfs", name: "Depth-First Search", complexity: "O(V + E)" },
  // ],
  Graph: [
    // { id: "bfs", name: "Breadth-First Search", complexity: "O(V + E)" },
    // { id: "dfs", name: "Depth-First Search", complexity: "O(V + E)" },
    { id: "dijkstra", name: "Dijkstra's Algorithm", complexity: "O((V + E) log V)" },
  ],
  Tree: [
    { id: "bst-traversal", name: "BST Traversal", complexity: "O(n)" },
    { id: "binary-search-tree", name: "Binary Search Tree", complexity: "O(log n)" },
  ],
  Recursion: [
    { id: "factorial", name: "Factorial", complexity: "O(n)" },
    { id: "tower-of-hanoi", name: "Tower of Hanoi", complexity: "O(2ⁿ)" },
  ],
  Sorting: [
    { id: "bubble-sort", name: "Bubble Sort", complexity: "O(n²)" },
    { id: "merge-sort", name: "Merge Sort", complexity: "O(n log n)" },
    { id: "quick-sort", name: "Quick Sort", complexity: "O(n log n)" },
    { id: "heap-sort", name: "Heap Sort", complexity: "O(n log n)" },
  ],
  Backtracking: [
    // { id: "n-queens", name: "N-Queens", complexity: "O(N!)" },
    { id: "maze-solver", name: "Maze Solver", complexity: "O(n²)" },
    { id: "sudoku", name: "Sudoku Solver", complexity: "O(9^(n²))" },
  ],
}

export function Sidebar({ onSelectAlgorithm }) {
  const [expandedCategories, setExpandedCategories] = useState(new Set([""]))

  const toggleCategory = (category) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  return (
    <div className="p-4 space-y-2">
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-muted-foreground px-2 mb-4 uppercase tracking-wider">Algorithms</h2>
      </div>

      {Object.entries(ALGORITHMS).map(([category, algorithms]) => (
        <div key={category} className="space-y-2">
          <Button
            variant="secondary"
            className="w-full justify-between h-auto py-2 px-2 hover:bg-primary/60"
            onClick={() => toggleCategory(category)}
          >
            <span className="font-medium text-sm">{category}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${expandedCategories.has(category) ? "rotate-180" : ""}`}
            />
          </Button>

          {expandedCategories.has(category) && (
            <div className="space-y-1 pl-2">
              {algorithms.map((algo) => (
                <Button
                  key={algo.id}
                  variant="ghost"
                  className="w-full justify-start h-auto py-2 px-2 text-xs border border-accent/20 hover:bg-secondary/20 text-foreground bg-white/50 hover:text-secondary flex flex-col items-start"
                  onClick={() => onSelectAlgorithm(algo)}
                >
                  <span className="font-medium">{algo.name}</span>
                  <span className="text-xs text-muted-foreground">{algo.complexity}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
