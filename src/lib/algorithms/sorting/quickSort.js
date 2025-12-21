/**
 * QUICK SORT
 * Another divide and conquer algorithm!
 * Pick a "pivot" element and partition the array around it.
 * 
 * How it works:
 * 1. Pick a pivot element (we'll use the last element)
 * 2. Partition: put smaller elements left, larger elements right
 * 3. Recursively sort the left and right partitions
 * 
 * Time Complexity: O(n log n) average - One of the fastest sorting algorithms!
 */

// Basic info about this algorithm
export const meta = {
  id: 'quick-sort',
  name: 'Quick Sort',
  category: 'sorting',
  description: 'Pick a pivot, partition around it, and sort recursively!',
  timeComplexity: 'O(n log n) average',
  spaceComplexity: 'O(log n)'
};

/**
 * Set up the starting state
 */
export function initialize(input) {
  return {
    array: [...input.array],
    step: 0,
    comparisons: 0,
    swaps: 0
  };
}

/**
 * The algorithm - yields one frame per step
 */
export function* run(state, controls) {
  const arr = [...state.array];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  let stepNum = 0;
  
  // First frame
  yield {
    step: stepNum++,
    description: 'Starting Quick Sort. We will pick pivots and partition!',
    data: { 
      array: [...arr],
      metrics: { comparisons, swaps }
    },
    highlights: {
      pivot: -1,
      partitioning: []
    },
    done: false
  };
  
  /**
   * Partition function
   * Places pivot in correct position and returns its index
   */
  function* partition(arr, low, high) {
    const pivot = arr[high]; // Choose last element as pivot
    
    yield {
      step: stepNum++,
      description: `Choosing ${pivot} (at position ${high}) as the pivot`,
      data: { 
        array: [...arr],
        metrics: { comparisons, swaps }
      },
      highlights: {
        pivot: high,
        partitioning: Array.from({ length: high - low + 1 }, (_, i) => low + i)
      },
      done: false
    };
    
    let i = low - 1; // Index of smaller element
    
    // Go through all elements and partition
    for (let j = low; j < high; j++) {
      comparisons++;
      
      yield {
        step: stepNum++,
        description: `Comparing ${arr[j]} with pivot ${pivot}`,
        data: { 
          array: [...arr],
          metrics: { comparisons, swaps }
        },
        highlights: {
          pivot: high,
          comparing: j,
          partitioning: Array.from({ length: high - low + 1 }, (_, idx) => low + idx)
        },
        done: false
      };
      
      if (arr[j] < pivot) {
        i++;
        
        if (i !== j) {
          yield {
            step: stepNum++,
            description: `${arr[j]} < ${pivot}, swapping ${arr[i]} and ${arr[j]}`,
            data: { 
              array: [...arr],
              metrics: { comparisons, swaps }
            },
            highlights: {
              pivot: high,
              swapping: [i, j],
              partitioning: Array.from({ length: high - low + 1 }, (_, idx) => low + idx)
            },
            done: false
          };
          
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swaps++;
        } else {
          yield {
            step: stepNum++,
            description: `${arr[j]} < ${pivot}, it's already in the right place`,
            data: { 
              array: [...arr],
              metrics: { comparisons, swaps }
            },
            highlights: {
              pivot: high,
              partitioning: Array.from({ length: high - low + 1 }, (_, idx) => low + idx)
            },
            done: false
          };
        }
      }
    }
    
    // Place pivot in correct position
    yield {
      step: stepNum++,
      description: `Placing pivot ${pivot} in its correct position ${i + 1}`,
      data: { 
        array: [...arr],
        metrics: { comparisons, swaps }
      },
      highlights: {
        pivot: high,
        swapping: [i + 1, high],
        partitioning: Array.from({ length: high - low + 1 }, (_, idx) => low + idx)
      },
      done: false
    };
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;
    
    yield {
      step: stepNum++,
      description: `Partition complete! ${pivot} is now at position ${i + 1}. Left side has smaller values, right side has larger values.`,
      data: { 
        array: [...arr],
        metrics: { comparisons, swaps }
      },
      highlights: {
        sorted: [i + 1],
        partitioning: []
      },
      done: false
    };
    
    return i + 1;
  }
  
  /**
   * Recursive quick sort helper
   */
  function* quickSortHelper(arr, low, high) {
    if (low < high) {
      // Partition the array
      const pivotIndex = yield* partition(arr, low, high);
      
      // Recursively sort elements before and after partition
      yield* quickSortHelper(arr, low, pivotIndex - 1);
      yield* quickSortHelper(arr, pivotIndex + 1, high);
    } else if (low === high) {
      yield {
        step: stepNum++,
        description: `Single element at position ${low} is already sorted`,
        data: { 
          array: [...arr],
          metrics: { comparisons, swaps }
        },
        highlights: {
          sorted: [low]
        },
        done: false
      };
    }
  }
  
  // Start the recursive sorting
  yield* quickSortHelper(arr, 0, n - 1);
  
  // Final frame
  yield {
    step: stepNum++,
    description: `✅ Quick Sort complete! Sorted with ${comparisons} comparisons and ${swaps} swaps.`,
    data: { 
      array: [...arr],
      metrics: { comparisons, swaps }
    },
    highlights: {
      sorted: arr.map((_, idx) => idx)
    },
    done: true
  };
}

/**
 * Validate input
 */
export function validateInput(input) {
  if (!input.array) {
    throw new Error('Please provide an array');
  }
  if (!Array.isArray(input.array)) {
    throw new Error('Input must be an array');
  }
  if (input.array.length === 0) {
    throw new Error('Array must have at least one number');
  }
  if (input.array.length > 20) {
    throw new Error('Array is too large (max 20 items for better visualization)');
  }
  if (!input.array.every(item => typeof item === 'number')) {
    throw new Error('All array elements must be numbers');
  }
}
