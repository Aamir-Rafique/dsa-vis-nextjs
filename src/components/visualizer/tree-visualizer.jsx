"use client"

import { useState } from "react"
import { Play, Pause, RotateCcw, Plus, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { TreeCanvas } from "./tree-canvas"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// BST Node class
class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

// BST Operations
// Immutable BST Operations (return new nodes so React state updates reliably)
function insertNode(root, value) {
  if (!root) return new TreeNode(value)
  if (value === root.value) return root

  if (value < root.value) {
    const newLeft = insertNode(root.left, value)
    if (newLeft === root.left) return root
    const newRoot = new TreeNode(root.value)
    newRoot.left = newLeft
    newRoot.right = root.right
    return newRoot
  } else {
    const newRight = insertNode(root.right, value)
    if (newRight === root.right) return root
    const newRoot = new TreeNode(root.value)
    newRoot.left = root.left
    newRoot.right = newRight
    return newRoot
  }
}

function findMin(node) {
  while (node && node.left) node = node.left
  return node
}

function deleteNode(root, value) {
  if (!root) return null

  if (value < root.value) {
    const newLeft = deleteNode(root.left, value)
    if (newLeft === root.left) return root
    const newRoot = new TreeNode(root.value)
    newRoot.left = newLeft
    newRoot.right = root.right
    return newRoot
  } else if (value > root.value) {
    const newRight = deleteNode(root.right, value)
    if (newRight === root.right) return root
    const newRoot = new TreeNode(root.value)
    newRoot.left = root.left
    newRoot.right = newRight
    return newRoot
  } else {
    // Node found
    if (!root.left && !root.right) return null
    if (!root.left) return root.right
    if (!root.right) return root.left

    // Two children: find inorder successor and rebuild
    const successor = findMin(root.right)
    const rightWithoutSuccessor = deleteNode(root.right, successor.value)
    const newRoot = new TreeNode(successor.value)
    newRoot.left = root.left
    newRoot.right = rightWithoutSuccessor
    return newRoot
  }
}

function searchNode(root, value, path = []) {
  if (!root) return path
  path.push(root.value)
  if (value === root.value) return path
  if (value < root.value) return searchNode(root.left, value, path)
  return searchNode(root.right, value, path)
}

// Tree traversals (synchronous generators)
function* inorderTraversal(node) {
  if (!node) return
  if (node.left) yield* inorderTraversal(node.left)
  yield node.value
  if (node.right) yield* inorderTraversal(node.right)
}

function* preorderTraversal(node) {
  if (!node) return
  yield node.value
  if (node.left) yield* preorderTraversal(node.left)
  if (node.right) yield* preorderTraversal(node.right)
}

function* postorderTraversal(node) {
  if (!node) return
  if (node.left) yield* postorderTraversal(node.left)
  if (node.right) yield* postorderTraversal(node.right)
  yield node.value
}

const INITIAL_VALUES = [50, 30, 70, 20, 40, 60, 80]

export function TreeVisualizer({ algorithm }) {
  const [tree, setTree] = useState(() => {
    let root = null
    INITIAL_VALUES.forEach(val => {
      root = insertNode(root, val)
    })
    return root
  })
  const [speed, setSpeed] = useState(50)
  const [isRunning, setIsRunning] = useState(false)
  const [highlightedNodes, setHighlightedNodes] = useState([])
  const [traversalPath, setTraversalPath] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [message, setMessage] = useState("")
  const [traversalType, setTraversalType] = useState("inorder")

  const isBSTTraversal = algorithm.id === "bst-traversal"

  const handleInsert = () => {
    const value = parseInt(inputValue)
    if (isNaN(value)) {
      setMessage("Please enter a valid number")
      return
    }
    
    setTree(prev => insertNode(prev, value))
    setInputValue("")
    setMessage(`Inserted ${value}`)
    setTimeout(() => setMessage(""), 2000)
  }

  const handleDelete = () => {
    const value = parseInt(inputValue)
    if (isNaN(value)) {
      setMessage("Please enter a valid number")
      return
    }
    
    setTree(prev => deleteNode(prev, value))
    setInputValue("")
    setMessage(`Deleted ${value}`)
    setTimeout(() => setMessage(""), 2000)
  }

  const handleSearch = async () => {
    const value = parseInt(inputValue)
    if (isNaN(value)) {
      setMessage("Please enter a valid number")
      return
    }
    
    setIsRunning(true)
    setHighlightedNodes([])
    const path = searchNode(tree, value)
    const delayTime = Math.max(200, 1500 - speed * 13)
    
    for (const nodeValue of path) {
      setHighlightedNodes([nodeValue])
      await new Promise(resolve => setTimeout(resolve, delayTime))
    }
    
    if (path[path.length - 1] === value) {
      setMessage(`Found ${value}!`)
    } else {
      setMessage(`${value} not found`)
    }
    
    setIsRunning(false)
    setTimeout(() => {
      setHighlightedNodes([])
      setMessage("")
    }, 2000)
  }

  const handleTraversal = async () => {
    if (isRunning) {
      setIsRunning(false)
      return
    }
    
    setIsRunning(true)
    setTraversalPath([])
    setHighlightedNodes([])
    setMessage("")
    
    const delayTime = Math.max(300, 1500 - speed * 12)
    const path = []
    
    let generator
    if (traversalType === "inorder") {
      generator = inorderTraversal(tree)
    } else if (traversalType === "preorder") {
      generator = preorderTraversal(tree)
    } else {
      generator = postorderTraversal(tree)
    }
    
    for (const value of generator) {
      path.push(value)
      setHighlightedNodes([value])
      setTraversalPath([...path])
      await new Promise(resolve => setTimeout(resolve, delayTime))
    }
    
    setHighlightedNodes([])
    setMessage(`${traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} traversal complete`)
    setIsRunning(false)
  }

  const handleReset = () => {
    let root = null
    INITIAL_VALUES.forEach(val => {
      root = insertNode(root, val)
    })
    setTree(root)
    setHighlightedNodes([])
    setTraversalPath([])
    setMessage("")
    setIsRunning(false)
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
        {message && (
          <div className="text-sm font-medium text-green-600 dark:text-green-400">
            {message}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="space-y-4 p-4 rounded-xl border border-border/50 bg-card/50">
        <label className="text-sm font-semibold">Controls</label>
        
        {/* BST Operations */}
        {!isBSTTraversal && (
          <div className="space-y-3">
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Enter value..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isRunning}
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
              />
              <Button onClick={handleInsert} disabled={isRunning} variant="default">
                <Plus className="w-4 h-4 mr-2" />
                Insert
              </Button>
              <Button onClick={handleDelete} disabled={isRunning} variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
              <Button onClick={handleSearch} disabled={isRunning} variant="secondary">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        )}

        {/* BST Traversal */}
        {isBSTTraversal && (
          <div className="space-y-3">
            <div className="flex gap-2 items-center">
              <Select value={traversalType} onValueChange={setTraversalType} disabled={isRunning}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Traversal Type" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="inorder" >Inorder (L-N-R)</SelectItem>
                  <SelectItem value="preorder">Preorder (N-L-R)</SelectItem>
                  <SelectItem value="postorder">Postorder (L-R-N)</SelectItem>
                </SelectContent>
              </Select>
              
              <Button onClick={handleTraversal} className={isRunning ? "bg-accent" : "bg-primary"}>
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Traversal
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleReset} disabled={isRunning}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Tree
              </Button>
            </div>
          </div>
        )}

        {/* Speed Control */}
        <div className="p-4 rounded-xl border border-border/50 bg-card/50 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Animation Speed</label>
            <Badge variant="secondary">{speed}%</Badge>
          </div>
          <Slider
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            min={10}
            max={100}
            step={5}
            disabled={isRunning}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Slower</span>
            <span>Faster</span>
          </div>
        </div>

        {/* Tree Canvas */}
        <div className="p-6 rounded-xl border border-border/50 bg-gradient-to-br from-card/50 to-muted/20 backdrop-blur-sm min-h-[400px]">
          <TreeCanvas
            tree={tree}
            highlightedNodes={highlightedNodes}
            traversalPath={traversalPath}
          />
        </div>

        {/* Traversal Path */}
        {traversalPath.length > 0 && (
          <div className="p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="text-sm font-semibold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Traversal Path ({traversalType})
            </div>
            <div className="flex gap-2 flex-wrap">
              {traversalPath.map((value, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <Badge
                    variant="outline"
                    className="px-3 py-1.5 font-mono text-sm bg-primary/20 hover:bg-primary/30 transition"
                  >
                    {value}
                  </Badge>
                  {idx < traversalPath.length - 1 && (
                    <span className="text-muted-foreground">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/30 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-600" />
            <span className="text-muted-foreground text-xs">Node</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500 border-2 border-orange-600" />
            <span className="text-muted-foreground text-xs">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-600" />
            <span className="text-muted-foreground text-xs">Visited</span>
          </div>
          <div className="ml-auto text-xs text-muted-foreground italic">
            {isBSTTraversal ? "Visualizing tree traversal patterns" : "Insert, delete, and search operations"}
          </div>
        </div>
      </div>
    </div>
  )
}
