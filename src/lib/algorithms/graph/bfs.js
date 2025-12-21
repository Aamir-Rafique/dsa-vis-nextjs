/**
 * BREADTH-FIRST SEARCH (BFS)
 * Graph traversal algorithm that explores level by level.
 * Like ripples in a pond spreading outward!
 * 
 * How it works:
 * 1. Start at a node (usually node 0)
 * 2. Visit all its neighbors first
 * 3. Then visit neighbors of neighbors
 * 4. Continue until all reachable nodes are visited
 * 
 * Uses a Queue (First In, First Out)
 * Time Complexity: O(V + E) where V = vertices, E = edges
 */

// Basic info about this algorithm
export const meta = {
  id: 'bfs',
  name: 'Breadth-First Search (BFS)',
  category: 'graph',
  description: 'Explore graph level by level, like ripples spreading in water!',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V)'
};

/**
 * Set up the starting state
 */
export function initialize(input) {
  return {
    nodes: input.nodes || [],
    edges: input.edges || [],
    startNode: input.startNode || '0',
    step: 0
  };
}

/**
 * The algorithm - yields one frame per step
 */
export function* run(state, controls) {
  const { nodes, edges, startNode } = state;
  let stepNum = 0;
  
  // Build adjacency list from edges
  const adjList = {};
  nodes.forEach(node => {
    adjList[node.id] = [];
  });
  edges.forEach(edge => {
    adjList[edge.from].push(edge.to);
    adjList[edge.to].push(edge.from); // Undirected graph
  });
  
  // First frame
  yield {
    step: stepNum++,
    description: `Starting BFS from node ${nodes.find(n => n.id === startNode)?.label || startNode}`,
    data: {
      graph: { nodes, edges },
      visited: [],
      queue: [],
      current: null
    },
    highlights: {
      start: startNode
    },
    done: false
  };
  
  const visited = new Set();
  const queue = [startNode];
  const visitedOrder = [];
  
  yield {
    step: stepNum++,
    description: `Adding start node to the queue`,
    data: {
      graph: { nodes, edges },
      visited: visitedOrder,
      queue: [...queue],
      current: null
    },
    highlights: {
      queue: [...queue]
    },
    done: false
  };
  
  while (queue.length > 0) {
    const currentNode = queue.shift();
    
    if (visited.has(currentNode)) continue;
    
    visited.add(currentNode);
    visitedOrder.push(currentNode);
    
    const currentLabel = nodes.find(n => n.id === currentNode)?.label || currentNode;
    
    yield {
      step: stepNum++,
      description: `Visiting node ${currentLabel}`,
      data: {
        graph: { nodes, edges },
        visited: [...visitedOrder],
        queue: [...queue],
        current: currentNode
      },
      highlights: {
        current: currentNode,
        visited: [...visitedOrder]
      },
      done: false
    };
    
    // Add unvisited neighbors to queue
    const neighbors = adjList[currentNode] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor) && !queue.includes(neighbor)) {
        queue.push(neighbor);
        const neighborLabel = nodes.find(n => n.id === neighbor)?.label || neighbor;
        
        yield {
          step: stepNum++,
          description: `Adding neighbor ${neighborLabel} to the queue`,
          data: {
            graph: { nodes, edges },
            visited: [...visitedOrder],
            queue: [...queue],
            current: currentNode
          },
          highlights: {
            current: currentNode,
            neighbor: neighbor,
            visited: [...visitedOrder],
            queue: [...queue]
          },
          done: false
        };
      }
    }
  }
  
  // Final frame
  yield {
    step: stepNum++,
    description: `✅ BFS complete! Visited ${visitedOrder.length} nodes in order: ${visitedOrder.map(id => nodes.find(n => n.id === id)?.label || id).join(' → ')}`,
    data: {
      graph: { nodes, edges },
      visited: visitedOrder,
      queue: [],
      current: null
    },
    highlights: {
      visited: visitedOrder
    },
    done: true
  };
}

/**
 * Validate input
 */
export function validateInput(input) {
  if (!input.nodes || !Array.isArray(input.nodes)) {
    throw new Error('Please provide an array of nodes');
  }
  if (input.nodes.length === 0) {
    throw new Error('Graph must have at least one node');
  }
  if (!input.edges || !Array.isArray(input.edges)) {
    throw new Error('Please provide an array of edges');
  }
}
