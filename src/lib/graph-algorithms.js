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
