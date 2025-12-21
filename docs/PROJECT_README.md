# Algorithm Visualizer 🎨

An interactive Data Structures & Algorithms visualizer built for beginners! Watch sorting, searching, and graph algorithms come to life with step-by-step animations.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

1. **Click "Start Visualizing"** on the homepage
2. **Choose an algorithm** from the dropdown menu
3. **Configure input data** (or use randomize button)
4. **Press Play** to watch the algorithm in action!
5. **Use controls** to pause, step through, or adjust speed

### Keyboard Shortcuts ⌨️

- `Space` - Play / Pause
- `→` (Right Arrow) - Next step
- `←` (Left Arrow) - Previous step
- `R` - Reset
- `+` - Speed up
- `-` - Slow down

## 📚 Available Algorithms

### Sorting (5 algorithms)
- ✅ **Bubble Sort** - Compare neighbors and swap
- ✅ **Selection Sort** - Find minimum and move to front
- ✅ **Insertion Sort** - Build sorted list one by one
- ✅ **Merge Sort** - Divide and conquer
- ✅ **Quick Sort** - Partition around pivot

### Searching (2 algorithms)
- ✅ **Linear Search** - Check each element
- ✅ **Binary Search** - Smart search in sorted data

### Graph (2 algorithms)
- ✅ **BFS** - Breadth-First Search (level by level)
- ✅ **DFS** - Depth-First Search (go deep first)

### String (1 algorithm)
- ✅ **Huffman Coding** - Text compression

## 🛠️ Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** JavaScript (no TypeScript)
- **Styling:** Tailwind CSS
- **State:** React Hooks (useState, useEffect)
- **No backend** - Everything runs in the browser!

## 📁 Project Structure

```
/src
  /app                         # Next.js pages
  /components                  # React components
  /lib
    /algorithms                # All algorithm implementations
    /helpers                   # Utility functions
    /hooks                     # Custom React hooks
```

## 🔧 Adding a New Algorithm

See [docs/HOW_TO_ADD_ALGORITHM.md](./docs/HOW_TO_ADD_ALGORITHM.md) for a detailed guide!

## 🎓 For Students

This tool helps you:
- **Visualize** abstract algorithms
- **Understand** step-by-step execution
- **Learn** time and space complexity
- **Practice** with different inputs

**Happy Learning! 📚✨**
