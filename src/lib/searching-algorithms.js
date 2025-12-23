const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const getDelayTime = (speed) => {
  return Math.max(50, 150 - speed)
}

export const linearSearch = async (arr, target, updateState, speed) => {
  const delayTime = getDelayTime(speed)
  let comparisons = 0

  for (let i = 0; i < arr.length; i++) {
    updateState([i], -1, comparisons)
    await delay(delayTime)

    comparisons++
    if (arr[i] === target) {
      updateState([i], i, comparisons)
      return i
    }
  }

  return -1
}

export const binarySearch = async (arr, target, updateState, speed) => {
  const delayTime = getDelayTime(speed)
  let left = 0
  let right = arr.length - 1
  let comparisons = 0

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    updateState([left, mid, right], -1, comparisons)
    await delay(delayTime)

    comparisons++
    if (arr[mid] === target) {
      updateState([mid], mid, comparisons)
      return mid
    } else if (arr[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return -1
}
