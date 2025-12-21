/**
 * DATA GENERATOR
 * Helper functions to create random data for testing algorithms
 * Makes it easy to generate arrays, graphs, trees, etc.
 */

/**
 * Generate a random array of numbers
 * @param {number} size - How many numbers to generate
 * @param {number} min - Smallest possible number
 * @param {number} max - Largest possible number
 * @returns {number[]} Array of random numbers
 */
export function generateRandomArray(size = 10, min = 1, max = 50) {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return array;
}

/**
 * Generate a sorted array (for binary search testing)
 * @param {number} size - How many numbers to generate
 * @returns {number[]} Sorted array of numbers
 */
export function generateSortedArray(size = 10) {
  const array = [];
  let current = 1;
  for (let i = 0; i < size; i++) {
    current += Math.floor(Math.random() * 5) + 1;
    array.push(current);
  }
  return array;
}

/**
 * Generate a random graph with nodes and edges
 * @param {number} nodeCount - Number of nodes in the graph
 * @param {number} edgeProbability - Chance (0-1) that two nodes are connected
 * @param {boolean} weighted - Whether edges should have weights
 * @returns {object} Graph with nodes and edges
 */
export function generateRandomGraph(nodeCount = 6, edgeProbability = 0.3, weighted = false) {
  // Create nodes
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      id: i.toString(),
      label: String.fromCharCode(65 + i), // A, B, C, D...
      x: Math.random() * 400 + 50, // Random position for visualization
      y: Math.random() * 300 + 50
    });
  }

  // Create edges
  const edges = [];
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      // Randomly decide if these two nodes are connected
      if (Math.random() < edgeProbability) {
        const edge = {
          from: i.toString(),
          to: j.toString()
        };
        
        // Add weight if needed
        if (weighted) {
          edge.weight = Math.floor(Math.random() * 20) + 1;
        }
        
        edges.push(edge);
      }
    }
  }

  return { nodes, edges };
}

/**
 * Generate a grid graph (for pathfinding algorithms like A*)
 * @param {number} rows - Number of rows
 * @param {number} cols - Number of columns
 * @param {number} obstacleProbability - Chance (0-1) that a cell is blocked
 * @returns {object} Grid with start, end, and obstacles
 */
export function generateGridGraph(rows = 10, cols = 10, obstacleProbability = 0.2) {
  const grid = [];
  
  // Create grid cells
  for (let row = 0; row < rows; row++) {
    const rowCells = [];
    for (let col = 0; col < cols; col++) {
      rowCells.push({
        row,
        col,
        isObstacle: Math.random() < obstacleProbability,
        isStart: false,
        isEnd: false
      });
    }
    grid.push(rowCells);
  }

  // Set start and end positions (make sure they're not obstacles)
  grid[0][0].isObstacle = false;
  grid[0][0].isStart = true;
  
  grid[rows - 1][cols - 1].isObstacle = false;
  grid[rows - 1][cols - 1].isEnd = true;

  return { grid, rows, cols };
}

/**
 * Generate a random binary search tree
 * @param {number} nodeCount - Number of nodes to create
 * @returns {object} Tree structure with root node
 */
export function generateRandomTree(nodeCount = 7) {
  const values = new Set();
  
  // Generate unique random values
  while (values.size < nodeCount) {
    values.add(Math.floor(Math.random() * 100) + 1);
  }

  return Array.from(values);
}

/**
 * Generate random text for Huffman coding
 * @param {number} length - Length of text
 * @returns {string} Random text
 */
export function generateRandomText(length = 50) {
  const words = [
    'hello', 'world', 'code', 'algorithm', 'data', 'structure',
    'learn', 'visualize', 'sort', 'search', 'tree', 'graph'
  ];
  
  const text = [];
  for (let i = 0; i < length; i++) {
    const word = words[Math.floor(Math.random() * words.length)];
    text.push(word);
  }
  
  return text.join(' ');
}

/**
 * Create a simple example for each algorithm category
 */
export const exampleInputs = {
  sorting: {
    array: [64, 34, 25, 12, 22, 11, 90]
  },
  searching: {
    array: [5, 12, 23, 34, 45, 56, 67, 78, 89],
    target: 45
  },
  graph: generateRandomGraph(6, 0.4, false),
  graphWeighted: generateRandomGraph(6, 0.4, true),
  grid: generateGridGraph(8, 8, 0.2),
  tree: [50, 30, 70, 20, 40, 60, 80],
  text: "hello world hello data structures",
  monteCarloSamples: 1000
};
