# 🎨 DSAVis - Data Structures & Algorithms Visualizer

An interactive web-based platform for visualizing data structures and algorithms with real-time animations, step-by-step execution, and comprehensive educational content.

![Next.js](https://img.shields.io/badge/Next.js-16.x-black)
![React](https://img.shields.io/badge/React-19.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)


## 🌟 Features

### 🔢 Sorting Algorithms
- **Bubble Sort** - Visual bubble effects with comparison highlighting
- **Merge Sort** - Gradient sections showing merge operations
- **Quick Sort** - Purple pivot highlighting with arrows
- **Heap Sort** - Heap structure visualization with color coding

### 🌳 Tree Algorithms
- **Binary Search Tree (BST)** - Insert, Delete, Search operations
- **Tree Traversals** - Inorder, Preorder, Postorder with step-by-step animation
- **Visual Node Highlighting** - Color-coded states during operations
- **Automatic Layout** - Hierarchical tree positioning

### 📊 Graph Algorithms
- **Dijkstra's Algorithm** - Shortest path visualization
- **Interactive Canvas** - Drag nodes, modify connections
- **Distance Tracking** - Real-time distance updates
- **Path Highlighting** - Visual shortest path display

### 🔄 Recursion Visualization
- **Factorial** - Call stack visualization with depth tracking
- **Tower of Hanoi** - Canvas-based disk movement with animated transfers
- **Step-by-Step Execution** - Detailed recursion flow

### 🔍 Searching Algorithms
- **Linear Search** - Sequential element checking
- **Binary Search** - Divide and conquer visualization

### 🔗 Linked List Operations
- **Node Insertion & Deletion**
- **Traversal Visualization**
- **Pointer Connection Display**

### ♟️ Backtracking
- **N-Queens Problem** - Board state and solution visualization

## 🎯 Educational Features

- **Algorithm Insights** - Educational tip boxes explaining key concepts
- **Live Step Commentary** - Real-time narration of operations
- **Complexity Analysis** - Time and space complexity information
- **Code Display** - Pseudocode and implementation details
- **Statistics Dashboard** - Comparisons, swaps, and operation counts
- **Color Psychology** - Semantic color coding (blue=neutral, orange=active, red=action, green=success)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/[username]/dsa-vis-nextjs.git
   cd dsa-vis-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Usage

1. **Select an Algorithm**
   - Use the sidebar navigation to browse categories
   - Click on any algorithm card in the browser

2. **Configure Settings**
   - Adjust visualization speed (10-100%)
   - Set array size or input custom values
   - Choose algorithm-specific options

3. **Control Playback**
   - **Play** - Start visualization
   - **Pause** - Pause mid-execution
   - **Reset** - Clear and restart
   - **Step-by-Step** - View detailed execution log

4. **Learn**
   - Read algorithm insights
   - Follow step commentary
   - View complexity analysis
   - Study code examples

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 16.x** - React framework with server-side rendering
- **React 19.x** - Component-based UI library

### Styling & UI
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Visualization
- **HTML5 Canvas API** - 2D rendering for animations
- **Custom Canvas Components** - Algorithm-specific visualizations

### State Management
- **React Hooks** - useState, useEffect, useRef
- **Immutable Patterns** - Ensuring proper state updates

## 📁 Project Structure

```
dsa-vis-nextjs/
├── src/
│   ├── app/                          # Next.js app directory
│   │   ├── layout.js                 # Root layout
│   │   ├── page.js                   # Home page
│   │   ├── globals.css               # Global styles
│   │   └── visualizer/
│   │       └── page.jsx              # Main visualizer page
│   ├── components/
│   │   ├── ui/                       # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   └── visualizer/               # Algorithm visualizers
│   │       ├── sorting-visualizer.jsx
│   │       ├── sorting-canvas.jsx
│   │       ├── tree-visualizer.jsx
│   │       ├── tree-canvas.jsx
│   │       ├── graph-visualizer.jsx
│   │       ├── graph-canvas.jsx
│   │       ├── recursion-visualizer.jsx
│   │       ├── searching-visualizer.jsx
│   │       ├── linked-list-visualizer.jsx
│   │       ├── nqueens-visualizer.jsx
│   │       ├── sidebar.jsx
│   │       ├── algorithm-browser.jsx
│   │       ├── visualization-container.jsx
│   │       └── code-display.jsx
│   ├── lib/                          # Algorithm implementations
│   │   ├── sorting-algorithms.js
│   │   ├── searching-algorithms.js
│   │   ├── graph-algorithms.js
│   │   ├── algorithm-details.js
│   │   └── utils.ts
│   └── hooks/                        # Custom React hooks
│       ├── use-toast.ts
│       └── use-mobile.ts
├── public/                           # Static assets
├── eslint.config.mjs                 # ESLint configuration
├── next.config.mjs                   # Next.js configuration
├── postcss.config.mjs                # PostCSS configuration
├── tailwind.config.js                # Tailwind configuration
└── package.json                      # Dependencies
```

## 📚 Available Algorithms

### Sorting (4)
| Algorithm | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Bubble Sort | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n) |
| Quick Sort | O(n log n) avg | O(log n) |
| Heap Sort | O(n log n) | O(1) |

### Trees (2)
| Algorithm | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| BST Operations | O(log n) avg | O(1) |
| Tree Traversals | O(n) | O(h) |

### Graphs (1)
| Algorithm | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Dijkstra | O(E + V log V) | O(V) |

### Recursion (2)
| Algorithm | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Factorial | O(n) | O(n) |
| Tower of Hanoi | O(2ⁿ) | O(n) |

### Searching (2)
| Algorithm | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Linear Search | O(n) | O(1) |
| Binary Search | O(log n) | O(1) |

## 🎨 Key Implementation Details

### Immutable State Updates
All tree operations return new node instances to ensure React detects changes:
```javascript
const insertNode = (root, value) => {
  if (!root) return new TreeNode(value);
  const newRoot = new TreeNode(root.value);
  newRoot.left = insertNode(root.left, value);
  newRoot.right = root.right;
  return newRoot;
};
```

### Pause/Resume Functionality
```javascript
// Pause control using refs
const pauseRef = useRef(false);

while (pauseRef.current) {
  await new Promise(resolve => setTimeout(resolve, 100));
}
```

### Algorithm-Specific Canvas Rendering
Each algorithm has unique visual metaphors:
- **Bubble Sort:** Rounded bars with glow effects
- **Quick Sort:** Purple pivot with arrow indicators
- **Merge Sort:** Gradient fills with dashed dividers
- **Tower of Hanoi:** Colorful gradient disks with shadows

## 🎯 Future Enhancements

- [ ] Dynamic Programming visualizations
- [ ] Advanced graph algorithms (Kruskal, Prim, Floyd-Warshall)
- [ ] String algorithms (KMP, Rabin-Karp)
- [ ] Code editor integration
- [ ] User accounts and progress tracking
- [ ] Performance comparison tools
- [ ] Mobile app version
- [ ] Quiz and assessment features
- [ ] Collaborative learning features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by [VisuAlgo](https://visualgo.net/)
- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Made with ❤️ for computer science education**
