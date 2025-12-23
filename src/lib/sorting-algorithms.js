// Utility to create delays based on speed
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const getDelayTime = (speed) => {
  return Math.max(1, 100 - speed)
}

// Bubble Sort
export const bubbleSort = async (arr, updateState, speed) => {
  const n = arr.length
  const delayTime = getDelayTime(speed)

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      updateState(
        [j, j + 1],
        Array.from({ length: n - i }, (_, k) => n - i - 1 + k),
        0,
      )
      await delay(delayTime)

      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        updateState(
          [j, j + 1],
          Array.from({ length: n - i }, (_, k) => n - i - 1 + k),
          1,
        )
      }
    }
  }
}

// Selection Sort
export const selectionSort = async (arr, updateState, speed) => {
  const n = arr.length
  const delayTime = getDelayTime(speed)

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    updateState(
      [i, minIdx],
      Array.from({ length: i }, (_, k) => k),
      0,
    )
    await delay(delayTime)

    for (let j = i + 1; j < n; j++) {
      updateState(
        [j, minIdx],
        Array.from({ length: i }, (_, k) => k),
        0,
      )
      await delay(delayTime)

      if (arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }

    if (minIdx !== i) {
      ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
      updateState(
        [i, minIdx],
        Array.from({ length: i + 1 }, (_, k) => k),
        1,
      )
      await delay(delayTime)
    }
  }
}

// Insertion Sort
export const insertionSort = async (arr, updateState, speed) => {
  const n = arr.length
  const delayTime = getDelayTime(speed)

  for (let i = 1; i < n; i++) {
    const key = arr[i]
    let j = i - 1

    updateState(
      [i, j],
      Array.from({ length: i }, (_, k) => k),
      0,
    )
    await delay(delayTime)

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]
      updateState(
        [i, j],
        Array.from({ length: i }, (_, k) => k),
        1,
      )
      j--
      await delay(delayTime)
    }
    arr[j + 1] = key
  }
}

// Quick Sort
export const quickSort = async (arr, updateState, speed) => {
  const delayTime = getDelayTime(speed)
  const sorted = []

  const partition = async (low, high) => {
    const pivot = arr[high]
    let i = low - 1

    for (let j = low; j < high; j++) {
      updateState([j, high], sorted, 0)
      await delay(delayTime)

      if (arr[j] < pivot) {
        i++
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
        updateState([i, j], sorted, 1)
        await delay(delayTime)
      }
    }
    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    updateState([i + 1, high], sorted, 1)
    await delay(delayTime)

    sorted.push(i + 1)
    return i + 1
  }

  const quickSortHelper = async (low, high) => {
    if (low < high) {
      const pi = await partition(low, high)
      await quickSortHelper(low, pi - 1)
      await quickSortHelper(pi + 1, high)
    } else if (low === high) {
      sorted.push(low)
    }
  }

  await quickSortHelper(0, arr.length - 1)
}

// Merge Sort
export const mergeSort = async (arr, updateState, speed) => {
  const delayTime = getDelayTime(speed)
  const sorted = []

  const merge = async (left, mid, right) => {
    const leftArr = arr.slice(left, mid + 1)
    const rightArr = arr.slice(mid + 1, right + 1)
    let i = 0,
      j = 0,
      k = left

    while (i < leftArr.length && j < rightArr.length) {
      updateState([left + i, mid + 1 + j], sorted, 0)
      await delay(delayTime)

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i]
        i++
      } else {
        arr[k] = rightArr[j]
        j++
      }
      updateState([], sorted, 1)
      k++
      await delay(delayTime)
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i]
      updateState([], sorted, 1)
      i++
      k++
      await delay(delayTime)
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j]
      updateState([], sorted, 1)
      j++
      k++
      await delay(delayTime)
    }

    for (let idx = left; idx <= right; idx++) {
      sorted.push(idx)
    }
  }

  const mergeSortHelper = async (left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      await mergeSortHelper(left, mid)
      await mergeSortHelper(mid + 1, right)
      await merge(left, mid, right)
    } else if (left === right) {
      sorted.push(left)
    }
  }

  await mergeSortHelper(0, arr.length - 1)
}

// Heap Sort
export const heapSort = async (arr, updateState, speed) => {
  const delayTime = getDelayTime(speed)
  const sorted = []
  const n = arr.length

  const heapify = async (n, i) => {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < n && arr[left] > arr[largest]) {
      largest = left
    }
    if (right < n && arr[right] > arr[largest]) {
      largest = right
    }

    if (largest !== i) {
      updateState([i, largest], sorted, 0)
      await delay(delayTime)
      ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
      updateState([i, largest], sorted, 1)
      await delay(delayTime)

      await heapify(n, largest)
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i)
  }

  for (let i = n - 1; i > 0; i--) {
    updateState([0, i], sorted, 0)
    await delay(delayTime)
    ;[arr[0], arr[i]] = [arr[i], arr[0]]
    updateState([0, i], sorted, 1)
    await delay(delayTime)

    sorted.push(i)
    await heapify(i, 0)
  }
  sorted.push(0)
}

// Get sorting algorithm by ID
export const getSortingAlgorithm = (algorithmId) => {
  const algorithms = {
    "bubble-sort": bubbleSort,
    // "selection-sort": selectionSort,
    // "insertion-sort": insertionSort,
    "quick-sort": quickSort,
    "merge-sort": mergeSort,
    "heap-sort": heapSort,
  }
  return algorithms[algorithmId] || bubbleSort
}
