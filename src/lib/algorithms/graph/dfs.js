/**
 * DEPTH-FIRST SEARCH (DFS)
 * Graph traversal that explores as deep as possible before backtracking.
 * Like exploring a maze - go down one path until you hit a dead end!
 * 
 * Uses a Stack (Last In, First Out) - or recursion
 * Time Complexity: O(V + E)
 */

export const meta = {
  id: 'dfs',
  name: 'Depth-First Search (DFS)',
  category: 'graph',
  description: 'Go deep into the graph before exploring sideways!',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V)'
};

export function initialize(input) {
  return {
    nodes: input.nodes || [],
    edges: input.edges || [],
    startNode: input.startNode || '0',
    step: 0
  };
}

export function* run(state, controls) {
  const { nodes, edges, startNode } = state;
  let stepNum = 0;
  
  // Build adjacency list
  const adjList = {};
  nodes.forEach(node => { adjList[node.id] = []; });
  edges.forEach(edge => {
    adjList[edge.from].push(edge.to);
    adjList[edge.to].push(edge.from);
  });
  
  yield {
    step: stepNum++,
    description: `Starting DFS from node ${nodes.find(n => n.id === startNode)?.label || startNode}`,
    data: {
      graph: { nodes, edges },
      visited: [],
      stack: [],
      current: null
    },
    highlights: { start: startNode },
    done: false
  };
  
  const visited = new Set();
  const stack = [startNode];
  const visitedOrder = [];
  
  while (stack.length > 0) {
    const currentNode = stack.pop();
    
    if (visited.has(currentNode)) continue;
    
    visited.add(currentNode);
    visitedOrder.push(currentNode);
    
    const currentLabel = nodes.find(n => n.id === currentNode)?.label || currentNode;
    
    yield {
      step: stepNum++,
      description: `Visiting node ${currentLabel} (going deep!)`,
      data: {
        graph: { nodes, edges },
        visited: [...visitedOrder],
        stack: [...stack],
        current: currentNode
      },
      highlights: {
        current: currentNode,
        visited: [...visitedOrder]
      },
      done: false
    };
    
    // Add unvisited neighbors to stack
    const neighbors = (adjList[currentNode] || []).reverse(); // Reverse for visual consistency
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }
  
  yield {
    step: stepNum++,
    description: `✅ DFS complete! Visited ${visitedOrder.length} nodes`,
    data: {
      graph: { nodes, edges },
      visited: visitedOrder,
      stack: [],
      current: null
    },
    highlights: { visited: visitedOrder },
    done: true
  };
}

export function validateInput(input) {
  if (!input.nodes || !Array.isArray(input.nodes) || input.nodes.length === 0) {
    throw new Error('Please provide nodes for the graph');
  }
  if (!input.edges || !Array.isArray(input.edges)) {
    throw new Error('Please provide edges for the graph');
  }
}
