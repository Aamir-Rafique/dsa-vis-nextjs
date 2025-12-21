# Algorithms Explained 📚

Simple explanations of all algorithms in the visualizer.

## Sorting Algorithms

### Bubble Sort 🫧

**What it does:** Repeatedly compares adjacent elements and swaps them if they're in the wrong order.

**How it works:**
1. Start at the beginning of the array
2. Compare each pair of adjacent elements
3. If they're in the wrong order, swap them
4. Repeat until no more swaps are needed

**When to use:** Good for teaching, bad for real-world use (too slow)

**Real-world analogy:** Like sorting a deck of cards by repeatedly comparing neighbors

---

### Selection Sort 🎯

**What it does:** Finds the smallest element and moves it to the front, then repeats.

**How it works:**
1. Find the smallest element in the unsorted part
2. Swap it with the first unsorted element
3. Move the boundary between sorted/unsorted
4. Repeat for all elements

**When to use:** When you want to minimize the number of swaps

**Real-world analogy:** Picking the shortest person in a line and moving them to the front

---

### Insertion Sort 🃏

**What it does:** Builds a sorted array one element at a time, like sorting playing cards.

**How it works:**
1. Take an element from the unsorted part
2. Find its correct position in the sorted part
3. Shift elements to make room
4. Insert the element

**When to use:** Great for small arrays or nearly-sorted data

**Real-world analogy:** Sorting cards in your hand - pick up one card at a time and put it in the right spot

---

### Merge Sort ✂️

**What it does:** Divides the array in half, sorts each half, then merges them.

**How it works:**
1. Split the array into two halves
2. Recursively sort each half
3. Merge the two sorted halves back together

**When to use:** When you need O(n log n) performance and stability

**Real-world analogy:** Divide a messy pile of papers in half, sort each half, then combine them

---

### Quick Sort ⚡

**What it does:** Picks a "pivot" element and partitions the array around it.

**How it works:**
1. Choose a pivot element (we use the last one)
2. Move smaller elements to the left, larger to the right
3. Recursively sort the left and right partitions

**When to use:** One of the fastest algorithms in practice

**Real-world analogy:** Pick a person and ask everyone shorter to go left, everyone taller to go right

---

## Searching Algorithms

### Linear Search 🔍

**What it does:** Checks each element one by one until the target is found.

**How it works:**
1. Start at the first element
2. Check if it matches the target
3. If not, move to the next element
4. Repeat until found or end of array

**When to use:** Simple and works on unsorted arrays

**Real-world analogy:** Looking for your friend in a line by checking each person from front to back

**Time Complexity:** O(n) - might check every element

---

### Binary Search 🎯

**What it does:** Efficiently searches a **sorted** array by dividing the search space in half.

**How it works:**
1. Look at the middle element
2. If target is smaller, search the left half
3. If target is larger, search the right half
4. Repeat until found or search space is empty

**When to use:** When your array is sorted and you need fast search

**Real-world analogy:** Finding a word in a dictionary - open to the middle, decide which half, repeat

**Time Complexity:** O(log n) - much faster than linear!

**Important:** The array MUST be sorted!

---

## Graph Algorithms

### BFS (Breadth-First Search) 🌊

**What it does:** Explores a graph level by level, like ripples in water.

**How it works:**
1. Start at a node
2. Visit all its neighbors
3. Then visit all their neighbors
4. Continue level by level

**When to use:**
- Finding shortest path (unweighted graphs)
- Level-order traversal
- Finding all nodes at a certain distance

**Real-world analogy:** Spreading news - tell your friends, they tell their friends, etc.

**Data structure:** Uses a Queue (First In, First Out)

---

### DFS (Depth-First Search) 🏔️

**What it does:** Explores a graph by going as deep as possible before backtracking.

**How it works:**
1. Start at a node
2. Go to one of its neighbors
3. Keep going deeper
4. When stuck, backtrack and try another path

**When to use:**
- Detecting cycles
- Pathfinding
- Topological sorting
- Solving mazes

**Real-world analogy:** Exploring a maze - go down one path until you hit a dead end, then backtrack

**Data structure:** Uses a Stack (Last In, First Out)

---

## String Algorithms

### Huffman Coding 🗜️

**What it does:** Compresses text by giving shorter codes to frequent characters.

**How it works:**
1. Count how often each character appears
2. Build a binary tree (frequent chars closer to root)
3. Generate codes: left = 0, right = 1
4. Encode text using these codes

**When to use:** File compression (like ZIP files)

**Example:**
- Text: "hello"
- 'h' appears 1 time → code: 110
- 'e' appears 1 time → code: 111
- 'l' appears 2 times → code: 0 (shorter because more frequent!)
- 'o' appears 1 time → code: 10

**Real-world analogy:** Using abbreviations for common words (lol, brb) to save typing

---

## Complexity Cheat Sheet

### Time Complexity (How long it takes)

| Notation | Name | Example |
|----------|------|---------|
| O(1) | Constant | Accessing an array element |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Linear search |
| O(n log n) | Linearithmic | Merge sort, Quick sort |
| O(n²) | Quadratic | Bubble sort, Selection sort |
| O(2ⁿ) | Exponential | Trying all subsets |

**Faster → Slower:**
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)

### Space Complexity (How much memory it uses)

| Notation | Meaning |
|----------|---------|
| O(1) | Uses constant extra space |
| O(n) | Uses space proportional to input size |
| O(log n) | Uses logarithmic space (usually recursion) |

---

## When to Use Which Algorithm?

### For Sorting:

- **Small array (<10 items):** Insertion Sort
- **Need speed:** Quick Sort or Merge Sort
- **Need stability:** Merge Sort
- **Limited memory:** Quick Sort (in-place)
- **Teaching/learning:** Bubble Sort (easiest to understand)

### For Searching:

- **Unsorted array:** Linear Search
- **Sorted array:** Binary Search (much faster!)
- **Need to search many times:** Sort first, then use Binary Search

### For Graphs:

- **Shortest path:** BFS
- **Detect cycles:** DFS
- **Explore all paths:** DFS
- **Level-order:** BFS

---

## Tips for Learning

1. **Start simple:** Begin with Bubble Sort and Linear Search
2. **Watch slowly:** Use 0.5x speed to see each step
3. **Try different inputs:** See how the algorithm behaves
4. **Compare algorithms:** Run Bubble Sort vs Quick Sort on the same data
5. **Step through:** Use the step buttons to go frame by frame

---

## Common Questions

**Q: Why is Bubble Sort so slow?**
A: It compares every pair of elements, even if the array is almost sorted. That's O(n²) comparisons!

**Q: Why is Binary Search so fast?**
A: It cuts the search space in half with each step. 1000 items → 500 → 250 → 125 → ... only 10 steps!

**Q: What does "stable" mean?**
A: A stable sort keeps equal elements in their original order. Merge Sort is stable, Quick Sort is not.

**Q: When is Insertion Sort faster than Quick Sort?**
A: On small arrays (< 10 items) or nearly-sorted arrays!

**Q: Why does Merge Sort use O(n) extra space?**
A: It needs temporary arrays to merge the sorted halves.

---

## Challenge Yourself!

Try to answer these after watching the visualizations:

1. Which sorting algorithm makes the fewest swaps?
2. How many comparisons does Binary Search make on an array of 16 elements?
3. Can Binary Search work on an unsorted array? Why or why not?
4. What's the difference between BFS and DFS?
5. Why do we need Huffman Coding when we can just use ASCII?

---

**Happy Learning! 🚀**

Remember: Understanding is more important than memorizing. Watch the visualizations, read the step descriptions, and experiment with different inputs!
