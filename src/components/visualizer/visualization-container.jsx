"use client"
import { SortingVisualizer } from "./sorting-visualizer"
import { SearchingVisualizer } from "./searching-visualizer"
import { RecursionVisualizer } from "./recursion-visualizer"
import { LinkedListVisualizer } from "./linked-list-visualizer"
import { GraphVisualizer } from "./graph-visualizer"
import { NQueensVisualizer } from "./nqueens-visualizer"
import { CodeDisplay } from "./code-display"

const SORTING_ALGORITHMS = ["bubble-sort", "selection-sort", "insertion-sort", "quick-sort", "merge-sort", "heap-sort"]
const SEARCHING_ALGORITHMS = ["linear-search", "binary-search"]
const RECURSION_ALGORITHMS = ["factorial", "tower-of-hanoi"]
const LINKED_LIST_ALGORITHMS = [
  "singly-linked-list",
  "doubly-linked-list",
  "circular-linked-list",
  "circular-doubly-list",
]
const GRAPH_ALGORITHMS = ["bfs", "dfs"]
const BACKTRACKING_ALGORITHMS = ["n-queens"]

export function VisualizationContainer({ algorithm }) {
  const isSortingAlgorithm = SORTING_ALGORITHMS.includes(algorithm.id)
  const isSearchingAlgorithm = SEARCHING_ALGORITHMS.includes(algorithm.id)
  const isRecursionAlgorithm = RECURSION_ALGORITHMS.includes(algorithm.id)
  const isLinkedListAlgorithm = LINKED_LIST_ALGORITHMS.includes(algorithm.id)
  const isGraphAlgorithm = GRAPH_ALGORITHMS.includes(algorithm.id)
  const isBacktrackingAlgorithm = BACKTRACKING_ALGORITHMS.includes(algorithm.id)

  return (
    <div className="h-full flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        {/* Visualizer */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex-1 bg-card rounded-lg border border-border/50 overflow-hidden">
            {isSortingAlgorithm && <SortingVisualizer algorithm={algorithm} />}
            {isSearchingAlgorithm && <SearchingVisualizer algorithm={algorithm} />}
            {isRecursionAlgorithm && <RecursionVisualizer algorithm={algorithm} />}
            {isLinkedListAlgorithm && <LinkedListVisualizer algorithm={algorithm} />}
            {isGraphAlgorithm && <GraphVisualizer algorithm={algorithm} />}
            {isBacktrackingAlgorithm && <NQueensVisualizer />}
            {!isSortingAlgorithm &&
              !isSearchingAlgorithm &&
              !isRecursionAlgorithm &&
              !isLinkedListAlgorithm &&
              !isGraphAlgorithm &&
              !isBacktrackingAlgorithm && (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <p>Visualizer coming soon for {algorithm.name}</p>
                </div>
              )}
          </div>
        </div>

        {/* Code Display */}
        <div className="w-96 bg-card rounded-lg border border-border/50 overflow-hidden flex flex-col">
          <CodeDisplay algorithm={algorithm} />
        </div>
      </div>
    </div>
  )
}
