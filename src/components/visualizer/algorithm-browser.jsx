"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Grid3x3, List, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlgorithmCard } from "./algorithm-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ALL_ALGORITHMS = [
  // Sorting
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    category: "Sorting",
    complexity: "O(n²)",
    description: "Simple comparison-based sorting that repeatedly swaps adjacent elements",
    difficulty: "Easy",
    tags: ["comparison", "simple"],
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    category: "Sorting",
    complexity: "O(n log n)",
    description: "Divide-and-conquer algorithm that divides array and merges sorted parts",
    difficulty: "Medium",
    tags: ["divide-and-conquer", "stable"],
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    category: "Sorting",
    complexity: "O(n log n)",
    description: "Fast divide-and-conquer algorithm using pivot partitioning",
    difficulty: "Medium",
    tags: ["divide-and-conquer", "fast"],
  },
  {
    id: "heap-sort",
    name: "Heap Sort",
    category: "Sorting",
    complexity: "O(n log n)",
    description: "Sorting using a heap data structure for selection",
    difficulty: "Hard",
    tags: ["heap", "in-place"],
  },

  // Searching
  {
    id: "linear-search",
    name: "Linear Search",
    category: "Searching",
    complexity: "O(n)",
    description: "Simple sequential search through an array",
    difficulty: "Easy",
    tags: ["basic", "sequential"],
  },
  {
    id: "binary-search",
    name: "Binary Search",
    category: "Searching",
    complexity: "O(log n)",
    description: "Efficient search in sorted arrays by eliminating half of remaining elements",
    difficulty: "Easy",
    tags: ["efficient", "divide-and-conquer"],
  },

  // Linked Lists
  {
    id: "singly-linked-list",
    name: "Singly Linked List",
    category: "Linked Lists",
    complexity: "O(n)",
    description: "Data structure with nodes pointing to the next node",
    difficulty: "Medium",
    tags: ["linear", "dynamic"],
  },
  {
    id: "doubly-linked-list",
    name: "Doubly Linked List",
    category: "Linked Lists",
    complexity: "O(n)",
    description: "Linked list with nodes pointing both forward and backward",
    difficulty: "Medium",
    tags: ["linear", "bidirectional"],
  },
  {
    id: "circular-linked-list",
    name: "Circular Linked List",
    category: "Linked Lists",
    complexity: "O(n)",
    description: "Linked list where the last node points back to the first",
    difficulty: "Medium",
    tags: ["circular", "dynamic"],
  },

  // Graph
  // {
  //   id: "bfs",
  //   name: "Breadth-First Search",
  //   category: "Graph",
  //   complexity: "O(V + E)",
  //   description: "Explores graph level-by-level using a queue",
  //   difficulty: "Medium",
  //   tags: ["traversal", "queue-based"],
  // },
  // {
  //   id: "dfs",
  //   name: "Depth-First Search",
  //   category: "Graph",
  //   complexity: "O(V + E)",
  //   description: "Explores graph depth-first using a stack or recursion",
  //   difficulty: "Medium",
  //   tags: ["traversal", "recursive"],
  // },
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    category: "Graph",
    complexity: "O(E + V log V)",
    description: "Finds shortest paths from a source in a weighted graph using a priority queue",
    difficulty: "Hard",
    tags: ["shortest-path", "weighted", "priority-queue"],
  },

  // Tree
  {
    id: "bst-traversal",
    name: "BST Traversal",
    category: "Tree",
    complexity: "O(n)",
    description: "Inorder, preorder, and postorder traversal of binary search trees",
    difficulty: "Medium",
    tags: ["tree", "traversal"],
  },
  {
    id: "binary-search-tree",
    name: "Binary Search Tree",
    category: "Tree",
    complexity: "O(log n)",
    description: "Sorted tree structure enabling efficient search and insertion",
    difficulty: "Medium",
    tags: ["tree", "search"],
  },

  // Recursion
  {
    id: "factorial",
    name: "Factorial",
    category: "Recursion",
    complexity: "O(n)",
    description: "Calculate n! using recursive function calls",
    difficulty: "Easy",
    tags: ["recursion", "mathematical"],
  },
  {
    id: "tower-of-hanoi",
    name: "Tower of Hanoi",
    category: "Recursion",
    complexity: "O(2ⁿ)",
    description: "Classic recursion problem of moving disks between pegs",
    difficulty: "Medium",
    tags: ["recursion", "puzzle"],
  },

  // Backtracking
  // {
  //   id: "n-queens",
  //   name: "N-Queens",
  //   category: "Backtracking",
  //   complexity: "O(N!)",
  //   description: "Place N queens on an NxN chessboard without attacks",
  //   difficulty: "Hard",
  //   tags: ["backtracking", "constraint"],
  // },
  {
    id: "maze-solver",
    name: "Maze Solver",
    category: "Backtracking",
    complexity: "O(n²)",
    description: "Find path through a maze using backtracking",
    difficulty: "Medium",
    tags: ["backtracking", "pathfinding"],
  },
  {
    id: "sudoku",
    name: "Sudoku Solver",
    category: "Backtracking",
    complexity: "O(9^(n²))",
    description: "Solve sudoku puzzles using constraint satisfaction",
    difficulty: "Hard",
    tags: ["backtracking", "constraint"],
  },
]

const CATEGORIES = ["All", ...new Set(ALL_ALGORITHMS.map((a) => a.category))]
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"]

export function AlgorithmBrowser({ onSelectAlgorithm }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")

  // Filter algorithms based on search and filters
  const filteredAlgorithms = useMemo(() => {
    return ALL_ALGORITHMS.filter((algo) => {
      const matchesSearch =
        algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algo.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || algo.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === "All" || algo.difficulty === selectedDifficulty

      return matchesSearch && matchesCategory && matchesDifficulty
    })
  }, [searchQuery, selectedCategory, selectedDifficulty])

  // Group by category for display
  const groupedAlgorithms = useMemo(() => {
    const groups = {}
    filteredAlgorithms.forEach((algo) => {
      if (!groups[algo.category]) groups[algo.category] = []
      groups[algo.category].push(algo)
    })
    return groups
  }, [filteredAlgorithms])

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background to-muted/5">
      {/* Header Section */}
      {/* <div className="border-b border-border/40 bg-card/50 backdrop-blur-md px-8 pt-8 space-y-6 shadow-sm"> */}
        {/* <div className="flex items-start justify-between ">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-4xl font-bold">Algorithm Browser</h1>
              <Badge variant="outline" className="text-xs">
                <Sparkles className="w-3 h-3 mr-1 inline" />
                {ALL_ALGORITHMS.length}+ Algorithms
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg">
              Explore, learn, and visualize algorithms interactively
            </p>
          </div>
        </div> */}

        {/* Search Bar */}
        {/* <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search algorithms, tags, or descriptions..."
            className="pl-12 py-3 h-12 bg-background border-border/50 focus:border-primary/50 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div> */}

        {/* Filters */}
        <div className="space-y-3">
          {/* Category Filter */}
          {/* <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span>Category:</span>
            </div>
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={
                  selectedCategory === cat
                    ? "bg-primary hover:bg-primary/90 shadow-md"
                    : "hover:border-primary/50"
                }
              >
                {cat}
              </Button>
            ))}
          </div> */}

          {/* Difficulty Filter */}
          {/* <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Difficulty:</span>
            {DIFFICULTIES.map((diff) => (
              <Button
                key={diff}
                variant={selectedDifficulty === diff ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty(diff)}
                className={
                  selectedDifficulty === diff
                    ? "bg-secondary hover:bg-secondary/90 shadow-md"
                    : "hover:border-secondary/50 hover:text-black"
                }
              >
                {diff}
              </Button>
            ))}
          </div> */}
        </div>

        {/* Results Counter */}
        {/* <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-muted-foreground font-medium">
            Showing <span className="text-foreground font-bold">{filteredAlgorithms.length}</span> of{" "}
            <span className="text-foreground font-bold">{ALL_ALGORITHMS.length}</span> algorithms
          </p>
        </div> */}
      {/* </div> */}

      {/* Algorithms Grid */}
      <div className="flex-1 overflow-auto p-8">
        {Object.entries(groupedAlgorithms).length === 0 ? (
          <div className="h-full flex items-center justify-center flex-col gap-4 text-muted-foreground">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
              <Search className="w-10 h-10 opacity-30" />
            </div>
            <p className="text-xl font-semibold">No algorithms found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setSelectedDifficulty("All")
              }}
              className="mt-4"
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(groupedAlgorithms).map(([category, algos]) => (
              <div key={category} className="space-y-4">
                <div className="flex items-center bg-gradient-to-r from-background via-background to-transparent py-3 z-10">
                  <h2 className="text-2xl font-bold text-primary">{category}</h2>
                  <Badge variant="secondary" className="h-6 ml-4">
                    {algos.length}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {algos.map((algo) => (
                    <AlgorithmCard key={algo.id} algorithm={algo} onSelect={onSelectAlgorithm} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
