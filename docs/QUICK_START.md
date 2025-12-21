# Quick Start Guide ⚡

Get up and running in 5 minutes!

## 1. Install (1 minute)

```bash
cd dsa-vis-nextjs
npm install
```

## 2. Run (30 seconds)

```bash
npm run dev
```

## 3. Open Browser

Go to: **http://localhost:3000**

## 4. Start Visualizing!

1. Click **"Start Visualizing"**
2. Choose **"Bubble Sort"**
3. Click **"🎲 Randomize Array"**
4. Press **"▶ Play"**
5. Watch it sort! 🎉

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play/Pause |
| `→` | Next step |
| `←` | Previous step |
| `R` | Reset |

---

## Available Algorithms

### Sorting (5)
- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort

### Searching (2)
- Linear Search
- Binary Search

### Graph (2)
- BFS (Breadth-First Search)
- DFS (Depth-First Search)

### String (1)
- Huffman Coding

---

## File Structure (Simplified)

```
src/
├── app/
│   ├── page.js              ← Landing page
│   └── visualize/
│       └── page.jsx         ← Main visualizer
├── components/              ← UI components
├── lib/
│   ├── algorithms/          ← All algorithms here!
│   ├── helpers/             ← Utilities
│   └── hooks/               ← React hooks
```

---

## Add Your Own Algorithm

1. Create file: `src/lib/algorithms/sorting/mySort.js`
2. Copy template from [HOW_TO_ADD_ALGORITHM.md](HOW_TO_ADD_ALGORITHM.md)
3. Register in `allAlgorithms.js`
4. Done! ✅

---

## Need Help?

- 📖 [Full README](../README.md)
- 📚 [Algorithms Explained](ALGORITHMS_EXPLAINED.md)
- 🔧 [How to Add Algorithms](HOW_TO_ADD_ALGORITHM.md)
- ⚙️ [Setup Guide](SETUP.md)

---

**That's it! Happy visualizing! 🚀**
