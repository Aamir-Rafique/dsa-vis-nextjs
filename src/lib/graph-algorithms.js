const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const bfsTraversal = async (graph, startNode, updateState, delayTime) => {
  const visited = new Set()
  const queue = [startNode]
  visited.add(startNode)

  while (queue.length > 0) {
    const node = queue.shift()
    updateState(node)
    await delay(delayTime)

    // Find connected nodes
    const connectedNodes = graph.edges
      .filter((edge) => edge.from === node)
      .map((edge) => edge.to)
      .filter((n) => !visited.has(n))

    for (const nextNode of connectedNodes) {
      if (!visited.has(nextNode)) {
        visited.add(nextNode)
        queue.push(nextNode)
      }
    }
  }
}

export const dfsTraversal = async (graph, startNode, updateState, delayTime) => {
  const visited = new Set()

  const dfs = async (node) => {
    visited.add(node)
    updateState(node)
    await delay(delayTime)

    const connectedNodes = graph.edges
      .filter((edge) => edge.from === node)
      .map((edge) => edge.to)
      .filter((n) => !visited.has(n))

    for (const nextNode of connectedNodes) {
      if (!visited.has(nextNode)) {
        await dfs(nextNode)
      }
    }
  }

  await dfs(startNode)
}

export const dijkstraAlgorithm = async (graph, startNode, updateState, delayTime) => {
  const distances = {}
  const visited = new Set()
  const previous = {}
  
  // Initialize distances
  graph.nodes.forEach(node => {
    distances[node.id] = node.id === startNode ? 0 : Infinity
    previous[node.id] = null
  })

  while (visited.size < graph.nodes.length) {
    // Find unvisited node with minimum distance
    let minNode = null
    let minDistance = Infinity
    
    for (const node of graph.nodes) {
      if (!visited.has(node.id) && distances[node.id] < minDistance) {
        minDistance = distances[node.id]
        minNode = node.id
      }
    }

    if (minNode === null || minDistance === Infinity) break

    visited.add(minNode)
    updateState(minNode, distances, previous)
    await delay(delayTime)

    // Update distances to neighbors
    const neighbors = graph.edges
      .filter(edge => edge.from === minNode)
      .map(edge => ({ to: edge.to, weight: edge.weight || 1 }))

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.to)) {
        const newDistance = distances[minNode] + neighbor.weight
        if (newDistance < distances[neighbor.to]) {
          distances[neighbor.to] = newDistance
          previous[neighbor.to] = minNode
        }
      }
    }
  }

  return { distances, previous }
}
