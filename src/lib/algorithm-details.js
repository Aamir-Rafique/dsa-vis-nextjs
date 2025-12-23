export const ALGORITHM_DETAILS = {
  "bubble-sort": {
    name: "Bubble Sort",
    language: "javascript",
    code: `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap if out of order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    csharpCode: `public static void BubbleSort(int[] arr) 
{
    int n = arr.Length;
    
    for (int i = 0; i < n - 1; i++) 
    {
        // Last i elements are already in place
        for (int j = 0; j < n - i - 1; j++) 
        {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) 
            {
                // Swap if out of order
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
    complexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },
    stability: true,
    inPlace: true,
    description:
      'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they\'re in the wrong order. The largest unsorted element "bubbles" to its correct position in each iteration.',
    howItWorks: [
      "Start at the beginning of the array",
      "Compare the first two elements",
      "If the first is greater than the second, swap them",
      "Move to the next pair and repeat steps 2-3",
      "After each pass, the largest element is in its final position",
      "Repeat until no more swaps are needed",
    ],
    advantages: [
      "Very simple to understand and implement",
      "Adaptive - performs well on nearly sorted data (O(n) best case)",
      "Stable - maintains relative order of equal elements",
      "In-place - requires only O(1) extra space",
    ],
    disadvantages: [
      "Very slow for large datasets - O(n²) time complexity",
      "Makes many unnecessary comparisons",
      "Not suitable for real-world applications with large data",
    ],
    useCases: "Educational purposes and very small datasets. Not recommended for production use.",
  },

  "selection-sort": {
    name: "Selection Sort",
    language: "javascript",
    code: `function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    // Find minimum element in remaining array
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    // Swap minimum with current position
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
    csharpCode: `public static void SelectionSort(int[] arr) 
{
    int n = arr.Length;
    
    for (int i = 0; i < n - 1; i++) 
    {
        // Find minimum element in remaining array
        int minIdx = i;
        for (int j = i + 1; j < n; j++) 
        {
            if (arr[j] < arr[minIdx]) 
            {
                minIdx = j;
            }
        }
        // Swap minimum with current position
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}`,
    complexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },
    stability: false,
    inPlace: true,
    description:
      "Selection Sort divides the array into two parts: sorted and unsorted. It repeatedly finds the minimum element from the unsorted portion and moves it to the sorted portion.",
    howItWorks: [
      "Find the minimum element in the unsorted portion",
      "Swap it with the first element of the unsorted portion",
      "Move the boundary between sorted and unsorted one position right",
      "Repeat until the entire array is sorted",
    ],
    advantages: [
      "Simple to understand and implement",
      "In-place sorting - requires only O(1) extra space",
      "Reduces number of swaps compared to bubble sort",
    ],
    disadvantages: [
      "Always O(n²) even for sorted data - not adaptive",
      "Not stable - may change relative order of equal elements",
      "Slow for large datasets",
    ],
    useCases: "Small datasets and educational purposes. Better than bubble sort but still slow for production.",
  },

  "insertion-sort": {
    name: "Insertion Sort",
    language: "javascript",
    code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    // Shift larger elements right
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    // Insert key at correct position
    arr[j + 1] = key;
  }
  return arr;
}`,
    complexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },
    stability: true,
    inPlace: true,
    description:
      "Insertion Sort builds the sorted array one item at a time. It iterates through an input array, and for each element, finds the place it belongs in the sorted part and inserts it there.",
    howItWorks: [
      "Start with the second element (first element is already sorted)",
      "Compare it with elements in the sorted portion",
      "Shift larger elements one position to the right",
      "Insert the element in its correct position",
      "Move to the next element and repeat",
    ],
    advantages: [
      "Efficient for small datasets",
      "Adaptive - very fast on nearly sorted data (O(n) best case)",
      "Stable - preserves relative order of equal elements",
      "Online - can sort data as it receives it",
      "In-place - requires only O(1) extra space",
    ],
    disadvantages: [
      "O(n²) average and worst case time complexity",
      "Slower than advanced algorithms like quick sort or merge sort",
    ],
    useCases:
      "Small datasets, nearly sorted data, and as part of hybrid algorithms like timsort. Used in practice for small subarrays within divide-and-conquer algorithms.",
  },

  "merge-sort": {
    name: "Merge Sort",
    language: "javascript",
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(n)",
    },
    stability: true,
    inPlace: false,
    description:
      "Merge Sort is a divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves back together.",
    howItWorks: [
      "Divide the array into two halves",
      "Recursively sort the left half",
      "Recursively sort the right half",
      "Merge the two sorted halves into a single sorted array",
    ],
    advantages: [
      "Guaranteed O(n log n) time complexity in all cases",
      "Stable - maintains relative order of equal elements",
      "Predictable performance - no worst-case scenarios",
      "Great for external sorting and linked lists",
    ],
    disadvantages: [
      "Requires O(n) extra space for merging",
      "Slower than quick sort for random data due to constant factors",
      "Not in-place",
    ],
    useCases:
      "Large datasets, when guaranteed O(n log n) is needed, external sorting, and when stability is important. Used in many programming language standard libraries.",
  },

  "quick-sort": {
    name: "Quick Sort",
    language: "javascript",
    code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [
    ...quickSort(left),
    ...middle,
    ...quickSort(right)
  ];
}`,
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
      space: "O(log n)",
    },
    stability: false,
    inPlace: true,
    description:
      "Quick Sort is a highly efficient divide-and-conquer algorithm that works by selecting a 'pivot' element and partitioning the array around it, then recursively sorting the sub-arrays.",
    howItWorks: [
      "Choose a pivot element from the array",
      "Partition the array so elements less than pivot are on the left and greater on the right",
      "Recursively sort the left partition",
      "Recursively sort the right partition",
      "Combine the sorted partitions",
    ],
    advantages: [
      "Very fast for most practical cases - O(n log n) average",
      "In-place sorting - minimal extra space needed",
      "Cache-friendly - good locality of reference",
      "Used in many standard library implementations",
    ],
    disadvantages: [
      "Worst case O(n²) on already sorted data (poor pivot selection)",
      "Not stable - relative order of equal elements may change",
      "Quicksort's performance is sensitive to the pivot selection strategy",
    ],
    useCases:
      "General-purpose sorting, large datasets, and when average-case performance matters most. Very common in production systems.",
  },

  "heap-sort": {
    name: "Heap Sort",
    language: "javascript",
    code: `function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(1)",
    },
    stability: false,
    inPlace: true,
    description:
      "Heap Sort uses a binary heap data structure to sort elements. It builds a heap, then repeatedly extracts the maximum element and places it at the end of the sorted portion.",
    howItWorks: [
      "Build a max heap from the input array",
      "Swap the root (maximum) with the last element",
      "Reduce the heap size by 1",
      "Heapify the root to restore heap property",
      "Repeat steps 2-4 until heap size is 1",
    ],
    advantages: [
      "Guaranteed O(n log n) time in all cases",
      "In-place sorting - requires only O(1) extra space",
      "No worst-case performance degradation",
      "Good for memory-constrained systems",
    ],
    disadvantages: [
      "Not stable - doesn't preserve order of equal elements",
      "Slower than quick sort on average due to constant factors",
      "Poor cache performance - not cache-friendly",
      "More complex to implement correctly",
    ],
    useCases:
      "When guaranteed O(n log n) and minimal space are required. Used in real-time systems where worst-case guarantees are important.",
  },

  "linear-search": {
    name: "Linear Search",
    language: "javascript",
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Found at index i
    }
  }
  return -1; // Not found
}`,
    complexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    stability: true,
    inPlace: true,
    description:
      "Linear Search is the simplest search algorithm that checks every element in the array sequentially until finding the target or reaching the end.",
    howItWorks: [
      "Start at the first element",
      "Compare it with the target value",
      "If it matches, return the index",
      "If not, move to the next element",
      "Repeat until found or end of array reached",
    ],
    advantages: [
      "Simple to understand and implement",
      "Works on unsorted arrays",
      "Best case O(1) if element is at the beginning",
    ],
    disadvantages: ["Inefficient for large datasets - O(n) time", "Much slower than binary search on sorted data"],
    useCases:
      "Small arrays, unsorted data, and when you need the first occurrence. Educational purposes and baseline comparisons.",
  },

  "binary-search": {
    name: "Binary Search",
    language: "javascript",
    code: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found
    } else if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  return -1; // Not found
}`,
    complexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
      space: "O(1)",
    },
    stability: true,
    inPlace: true,
    description:
      "Binary Search is an efficient algorithm for finding a target value in a sorted array by repeatedly dividing the search interval in half.",
    howItWorks: [
      "Start with the middle element",
      "If it matches the target, return the index",
      "If target is smaller, search the left half",
      "If target is larger, search the right half",
      "Repeat until found or search space is empty",
    ],
    advantages: [
      "Very fast - O(log n) time complexity",
      "Efficient for large sorted datasets",
      "Much faster than linear search",
    ],
    disadvantages: ["Requires the array to be sorted", "Cannot find first or last occurrence of duplicates easily"],
    useCases:
      "Searching sorted arrays, databases, and any scenario where array is sorted. One of the most important algorithms in computer science.",
  },

  "tower-of-hanoi": {
    name: "Tower of Hanoi",
    language: "javascript",
    code: `function hanoi(n, source = 'A', target = 'C', auxiliary = 'B') {
  if (n === 1) {
    console.log(\`Move disk 1 from \${source} to \${target}\`);
    return;
  }
  
  // Move n-1 disks from source to auxiliary
  hanoi(n - 1, source, auxiliary, target);
  
  // Move the largest disk from source to target
  console.log(\`Move disk \${n} from \${source} to \${target}\`);
  
  // Move n-1 disks from auxiliary to target
  hanoi(n - 1, auxiliary, target, source);
}`,
    complexity: {
      best: "O(2ⁿ)",
      average: "O(2ⁿ)",
      worst: "O(2ⁿ)",
      space: "O(n)",
    },
    stability: true,
    inPlace: false,
    description:
      "The Tower of Hanoi is a classic recursive problem where you must move a stack of disks from one peg to another, following the rules that only one disk can be moved at a time and a larger disk can never be placed on a smaller disk.",
    howItWorks: [
      "To move n disks from source to target using auxiliary",
      "Move n-1 disks from source to auxiliary (using target as temporary)",
      "Move the largest disk from source to target",
      "Move n-1 disks from auxiliary to target (using source as temporary)",
    ],
    advantages: [
      "Classic example of divide-and-conquer",
      "Perfect for teaching recursion concepts",
      "Elegant and concise solution",
    ],
    disadvantages: [
      "Exponential time complexity O(2ⁿ)",
      "Only practical for small values of n",
      "No practical real-world application",
    ],
    useCases: "Educational purposes and teaching recursion. Mathematical puzzle and algorithmic study.",
  },

  factorial: {
    name: "Factorial",
    language: "javascript",
    code: `function factorial(n) {
  // Base case: 0! = 1
  if (n === 0 || n === 1) {
    return 1;
  }
  
  // Recursive case: n! = n * (n-1)!
  return n * factorial(n - 1);
}`,
    complexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(n)",
    },
    stability: true,
    inPlace: false,
    description:
      "Factorial is the product of all positive integers less than or equal to n. The recursive approach demonstrates how a function can call itself with a simpler version of the problem.",
    howItWorks: [
      "If n is 0 or 1, return 1 (base case)",
      "Otherwise, return n times the factorial of n-1",
      "Each recursive call reduces n by 1",
      "Eventually reaches the base case and results are combined",
    ],
    advantages: [
      "Simple recursive structure - easy to understand",
      "Direct mathematical definition",
      "Great introduction to recursion",
    ],
    disadvantages: [
      "Stack overflow for large n (stack depth = n)",
      "Slow compared to iterative approach",
      "Cannot handle very large numbers due to exponential growth",
    ],
    useCases:
      "Educational purposes and teaching recursion. Mathematical calculations in combinatorics and probability. Often used as a first recursion example.",
  },

  "singly-linked-list": {
    name: "Singly Linked List",
    language: "javascript",
    code: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
  }
  
  insert(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
  
  delete(data) {
    if (!this.head) return;
    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }
  
  traverse() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}`,
    complexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(n)",
    },
    stability: false,
    inPlace: false,
    description:
      "A Singly Linked List is a linear data structure where each node contains data and a reference (link) to the next node. The last node points to null.",
    howItWorks: [
      "Each node stores data and a reference to the next node",
      "Insertion adds a new node and updates the next pointer",
      "Deletion removes a node and updates the previous node's pointer",
      "Traversal follows the next pointers from head to tail",
    ],
    advantages: [
      "Dynamic size - grows and shrinks as needed",
      "Efficient insertion and deletion - O(1) when position is known",
      "No memory wastage - only uses needed memory",
      "Easy to implement",
    ],
    disadvantages: [
      "No random access - must traverse from beginning",
      "Extra memory for storing pointers",
      "Slower than arrays for access operations",
    ],
    useCases:
      "Stack and queue implementations, music playlist, browser history, polynomial representation, and sparse matrices.",
  },

  "doubly-linked-list": {
    name: "Doubly Linked List",
    language: "javascript",
    code: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
  }
  
  insert(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
    newNode.prev = current;
  }
  
  traverseForward() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
  
  traverseBackward() {
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    while (current) {
      console.log(current.data);
      current = current.prev;
    }
  }
}`,
    complexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(n)",
    },
    stability: false,
    inPlace: false,
    description:
      "A Doubly Linked List is similar to a singly linked list, but each node has two references: one to the next node and one to the previous node. This allows traversal in both directions.",
    howItWorks: [
      "Each node stores data, next pointer, and previous pointer",
      "Can traverse forward and backward",
      "Insertion and deletion require updating two pointers",
      "Useful for bidirectional traversal",
    ],
    advantages: [
      "Can traverse in both directions",
      "Efficient deletion when pointer to node is known",
      "Better for undo/redo functionality",
      "Can easily find previous element",
    ],
    disadvantages: [
      "Extra memory for storing two pointers per node",
      "More complex to implement and maintain",
      "Still requires O(n) for random access",
    ],
    useCases: "Browser history (forward/back), text editors (undo/redo), music players with prev/next, and LRU cache.",
  },

  "circular-linked-list": {
    name: "Circular Linked List",
    language: "javascript",
    code: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class CircularLinkedList {
  constructor() {
    this.head = null;
  }
  
  insert(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      newNode.next = newNode;
      return;
    }
    let current = this.head;
    while (current.next !== this.head) {
      current = current.next;
    }
    current.next = newNode;
    newNode.next = this.head;
  }
  
  traverse() {
    if (!this.head) return;
    let current = this.head;
    do {
      console.log(current.data);
      current = current.next;
    } while (current !== this.head);
  }
}`,
    complexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(n)",
    },
    stability: false,
    inPlace: false,
    description:
      "A Circular Linked List is a variation where the last node points back to the first node instead of null, forming a circular structure.",
    howItWorks: [
      "Each node has a next pointer",
      "The last node points back to the first node",
      "Traversal can start at any node and continue in a circle",
      "Useful for round-robin scheduling",
    ],
    advantages: [
      "Efficient for operations that need to loop around",
      "Good for round-robin algorithms",
      "Can access any node from any other node",
      "Useful for implementing circular queues",
    ],
    disadvantages: [
      "Must be careful with loop termination conditions",
      "Infinite loop risk if not properly handled",
      "Slightly more complex than singly linked list",
    ],
    useCases: "Round-robin scheduling, circular queues, multiplayer games, and Josephus problem.",
  },

  "circular-doubly-list": {
    name: "Circular Doubly Linked List",
    language: "javascript",
    code: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class CircularDoublyLinkedList {
  constructor() {
    this.head = null;
  }
  
  insert(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
      return;
    }
    let current = this.head;
    while (current.next !== this.head) {
      current = current.next;
    }
    current.next = newNode;
    newNode.prev = current;
    newNode.next = this.head;
    this.head.prev = newNode;
  }
}`,
    complexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(n)",
    },
    stability: false,
    inPlace: false,
    description:
      "A Circular Doubly Linked List combines the features of doubly linked lists and circular linked lists, allowing bidirectional traversal in a circular structure.",
    howItWorks: [
      "Each node has next and previous pointers",
      "Last node points to first node",
      "First node's previous points to last node",
      "Can traverse in both directions continuously",
    ],
    advantages: [
      "Bidirectional traversal with circular structure",
      "Can easily navigate forward and backward",
      "Perfect for advanced data structures",
    ],
    disadvantages: [
      "Most complex linked list variant",
      "Maximum memory overhead (two pointers per node)",
      "Complex insertion and deletion operations",
    ],
    useCases:
      "Advanced scheduling algorithms, music playlist with previous/next navigation, and complex graph representations.",
  },

  bfs: {
    name: "Breadth-First Search",
    language: "javascript",
    code: `function bfs(graph, startNode) {
  const visited = new Set();
  const queue = [startNode];
  const result = [];
  
  visited.add(startNode);
  
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);
    
    // Visit all adjacent nodes
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return result;
}`,
    complexity: {
      best: "O(V + E)",
      average: "O(V + E)",
      worst: "O(V + E)",
      space: "O(V)",
    },
    stability: false,
    inPlace: false,
    description:
      "BFS explores a graph level-by-level, starting from a source node. It uses a queue to track nodes to visit and ensures all nodes at distance k are visited before nodes at distance k+1.",
    howItWorks: [
      "Start with the source node and mark it as visited",
      "Add it to the queue",
      "While queue is not empty:",
      "  Dequeue a node",
      "  Visit all unvisited neighbors and enqueue them",
      "Continue until queue is empty",
    ],
    advantages: [
      "Guarantees shortest path in unweighted graphs",
      "Complete - finds solution if one exists",
      "Good for finding connected components",
      "Explores graph level by level",
    ],
    disadvantages: [
      "Requires more memory than DFS",
      "Not suitable for finding paths in very large graphs",
      "May not be efficient for finding deep nodes",
    ],
    useCases:
      "Shortest path in unweighted graphs, connected components, network broadcasting, and social network analysis.",
  },

  dfs: {
    name: "Depth-First Search",
    language: "javascript",
    code: `function dfs(graph, startNode, visited = new Set()) {
  visited.add(startNode);
  console.log(startNode);
  
  // Visit all adjacent nodes
  for (let neighbor of graph[startNode]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}

// Iterative version
function dfsIterative(graph, startNode) {
  const visited = new Set();
  const stack = [startNode];
  
  while (stack.length > 0) {
    const node = stack.pop();
    
    if (!visited.has(node)) {
      visited.add(node);
      console.log(node);
      
      // Add unvisited neighbors to stack
      for (let neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
}`,
    complexity: {
      best: "O(V + E)",
      average: "O(V + E)",
      worst: "O(V + E)",
      space: "O(V)",
    },
    stability: false,
    inPlace: false,
    description:
      "DFS explores a graph by going as deep as possible along each branch before backtracking. It uses a stack (or recursion) to track nodes to visit.",
    howItWorks: [
      "Start with the source node",
      "Mark it as visited",
      "Recursively visit all unvisited neighbors",
      "Backtrack when reaching a dead end",
      "Continue until all reachable nodes are visited",
    ],
    advantages: [
      "Uses less memory than BFS",
      "Good for detecting cycles",
      "Efficient for traversing all nodes",
      "Can be implemented recursively",
      "Good for topological sorting",
    ],
    disadvantages: [
      "Does not guarantee shortest path",
      "Can get stuck in infinite loops with cycles",
      "Slower for finding nodes at shallow depths",
    ],
    useCases:
      "Cycle detection, topological sorting, detecting strongly connected components, maze solving, and backtracking algorithms.",
  },

  dijkstra: {
    name: "Dijkstra's Algorithm",
    language: "javascript",
    code: `// graph is an adjacency list: { node: [{ to: 'B', weight: 3 }, ...], ... }
function dijkstra(graph, start) {
  const distances = {};
  const previous = {};
  const visited = new Set();

  // initialize distances
  for (const node of Object.keys(graph)) {
    distances[node] = Infinity;
    previous[node] = null;
  }
  distances[start] = 0;

  // simple min-heap implementation
  class MinHeap {
    constructor() { this.heap = []; }
    push(item) { this.heap.push(item); this._siftUp(); }
    pop() {
      if (!this.heap.length) return null;
      const top = this.heap[0];
      const last = this.heap.pop();
      if (this.heap.length) { this.heap[0] = last; this._siftDown(); }
      return top;
    }
    _siftUp() {
      let i = this.heap.length - 1;
      while (i > 0) {
        const parent = Math.floor((i - 1) / 2);
        if (this.heap[parent].dist <= this.heap[i].dist) break;
        [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
        i = parent;
      }
    }
    _siftDown() {
      let i = 0;
      const n = this.heap.length;
      while (true) {
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        let smallest = i;
        if (left < n && this.heap[left].dist < this.heap[smallest].dist) smallest = left;
        if (right < n && this.heap[right].dist < this.heap[smallest].dist) smallest = right;
        if (smallest === i) break;
        [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
        i = smallest;
      }
    }
  }

  const heap = new MinHeap();
  heap.push({ node: start, dist: 0 });

  while (true) {
    const entry = heap.pop();
    if (!entry) break;
    const { node: u, dist } = entry;
    if (visited.has(u)) continue;
    visited.add(u);

    for (const edge of graph[u] || []) {
      const v = edge.to;
      const alt = dist + (edge.weight ?? 1);
      if (alt < distances[v]) {
        distances[v] = alt;
        previous[v] = u;
        heap.push({ node: v, dist: alt });
      }
    }
  }

  return { distances, previous };
}
`,
    complexity: {
      best: "O(E + V log V)",
      average: "O(E + V log V)",
      worst: "O(E + V log V)",
      space: "O(V)",
    },
    stability: false,
    inPlace: false,
    description:
      "Finds shortest paths from a source node to all other nodes in a weighted graph using a priority queue (min-heap). Works with non-negative edge weights.",
    howItWorks: [
      "Initialize all distances to Infinity except the source (0)",
      "Use a min-priority queue to repeatedly select the closest unvisited node",
      "Relax all outgoing edges from the selected node",
      "Update distances and previous pointers when a shorter path is found",
      "Continue until all reachable nodes are visited",
    ],
    advantages: [
      "Efficient for sparse graphs with a proper priority queue",
      "Finds shortest paths in weighted graphs with non-negative weights",
    ],
    disadvantages: [
      "Requires non-negative weights (doesn't work with negative edges)",
      "Heap operations add overhead compared to simple BFS in unweighted graphs",
    ],
    useCases:
      "Routing, shortest-path problems, network analysis, and maps where edges have non-negative weights.",
  },

  "n-queens": {
    name: "N-Queens Problem",
    language: "javascript",
    code: `function solveNQueens(n) {
  const board = Array(n).fill(-1);
  const results = [];
  
  function isSafe(row, col) {
    // Check if queen can be placed at board[row][col]
    for (let i = 0; i < row; i++) {
      const queenCol = board[i];
      // Check column and diagonals
      if (queenCol === col || 
          Math.abs(i - row) === Math.abs(queenCol - col)) {
        return false;
      }
    }
    return true;
  }
  
  function backtrack(row) {
    if (row === n) {
      results.push([...board]);
      return;
    }
    
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row] = col;
        backtrack(row + 1);
        board[row] = -1; // Backtrack
      }
    }
  }
  
  backtrack(0);
  return results;
}`,
    complexity: {
      best: "O(N!)",
      average: "O(N!)",
      worst: "O(N!)",
      space: "O(N)",
    },
    stability: false,
    inPlace: false,
    description:
      "The N-Queens problem asks: place N queens on an NxN chessboard such that no two queens attack each other. It's solved using backtracking.",
    howItWorks: [
      "Try placing a queen in each row",
      "For each placement, check if it's safe (no conflicts)",
      "If safe, move to the next row",
      "If not safe or dead end, backtrack",
      "Continue until all queens are placed",
    ],
    advantages: ["Demonstrates backtracking clearly", "Finds all solutions", "Educational for understanding recursion"],
    disadvantages: [
      "Exponential time complexity O(N!)",
      "Only practical for small board sizes",
      "Can be very slow for large N",
    ],
    useCases: "Educational purposes, constraint satisfaction problems, and algorithm study.",
  },

  default: {
    name: "Algorithm",
    language: "javascript",
    code: "// Code for this algorithm coming soon...",
    complexity: {
      best: "N/A",
      average: "N/A",
      worst: "N/A",
      space: "N/A",
    },
    stability: false,
    inPlace: false,
    description: "Details for this algorithm are coming soon.",
  },
}
