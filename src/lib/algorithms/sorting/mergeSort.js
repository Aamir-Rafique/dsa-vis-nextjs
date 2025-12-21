/**
 * MERGE SORT
 * Divide and conquer sorting algorithm!
 * Split the array in half, sort each half, then merge them back together.
 * 
 * How it works:
 * 1. Split the array into two halves
 * 2. Recursively sort each half
 * 3. Merge the two sorted halves back together
 * 
 * Time Complexity: O(n log n) - Much faster than bubble/selection/insertion!
 */

// Basic info about this algorithm
export const meta = {
  id: 'merge-sort',
  name: 'Merge Sort',
  category: 'sorting',
  description: 'Divide and conquer! Split, sort, and merge back together.',
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(n)'
};

/**
 * Set up the starting state
 */
export function initialize(input) {
  return {
    array: [...input.array],
    step: 0,
    comparisons: 0,
    merges: 0
  };
}

/**
 * The algorithm - yields one frame per step
 */
export function* run(state, controls) {
  const arr = [...state.array];
  const n = arr.length;
  let comparisons = 0;
  let merges = 0;
  let stepNum = 0;
  
  // First frame
  yield {
    step: stepNum++,
    description: 'Starting Merge Sort. We will divide the array and conquer!',
    data: { 
      array: [...arr],
      metrics: { comparisons, merges }
    },
    highlights: {
      dividing: [],
      merging: []
    },
    done: false
  };
  
  /**
   * Helper function to merge two sorted subarrays
   */
  function* merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    yield {
      step: stepNum++,
      description: `Merging subarrays: [${leftArr.join(', ')}] and [${rightArr.join(', ')}]`,
      data: { 
        array: [...arr],
        metrics: { comparisons, merges }
      },
      highlights: {
        merging: Array.from({ length: right - left + 1 }, (_, i) => left + i)
      },
      done: false
    };
    
    let i = 0, j = 0, k = left;
    
    // Merge the two arrays
    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        
        yield {
          step: stepNum++,
          description: `${leftArr[i]} ≤ ${rightArr[j]}, so place ${leftArr[i]} at position ${k}`,
          data: { 
            array: [...arr],
            metrics: { comparisons, merges }
          },
          highlights: {
            merging: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
            current: k
          },
          done: false
        };
        
        i++;
      } else {
        arr[k] = rightArr[j];
        
        yield {
          step: stepNum++,
          description: `${leftArr[i]} > ${rightArr[j]}, so place ${rightArr[j]} at position ${k}`,
          data: { 
            array: [...arr],
            metrics: { comparisons, merges }
          },
          highlights: {
            merging: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
            current: k
          },
          done: false
        };
        
        j++;
      }
      k++;
    }
    
    // Copy remaining elements from left array (if any)
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      
      yield {
        step: stepNum++,
        description: `Copying remaining element ${leftArr[i]} to position ${k}`,
        data: { 
          array: [...arr],
          metrics: { comparisons, merges }
        },
        highlights: {
          merging: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
          current: k
        },
        done: false
      };
      
      i++;
      k++;
    }
    
    // Copy remaining elements from right array (if any)
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      
      yield {
        step: stepNum++,
        description: `Copying remaining element ${rightArr[j]} to position ${k}`,
        data: { 
          array: [...arr],
          metrics: { comparisons, merges }
        },
        highlights: {
          merging: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
          current: k
        },
        done: false
      };
      
      j++;
      k++;
    }
    
    merges++;
    
    yield {
      step: stepNum++,
      description: `Merge complete! Subarray from ${left} to ${right} is now sorted.`,
      data: { 
        array: [...arr],
        metrics: { comparisons, merges }
      },
      highlights: {
        sorted: Array.from({ length: right - left + 1 }, (_, idx) => left + idx)
      },
      done: false
    };
  }
  
  /**
   * Recursive merge sort helper
   */
  function* mergeSortHelper(arr, left, right) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      yield {
        step: stepNum++,
        description: `Dividing array from position ${left} to ${right} at midpoint ${mid}`,
        data: { 
          array: [...arr],
          metrics: { comparisons, merges }
        },
        highlights: {
          dividing: Array.from({ length: right - left + 1 }, (_, i) => left + i)
        },
        done: false
      };
      
      // Sort first half
      yield* mergeSortHelper(arr, left, mid);
      
      // Sort second half
      yield* mergeSortHelper(arr, mid + 1, right);
      
      // Merge the sorted halves
      yield* merge(arr, left, mid, right);
    }
  }
  
  // Start the recursive sorting
  yield* mergeSortHelper(arr, 0, n - 1);
  
  // Final frame
  yield {
    step: stepNum++,
    description: `✅ Merge Sort complete! Sorted with ${comparisons} comparisons and ${merges} merges.`,
    data: { 
      array: [...arr],
      metrics: { comparisons, merges }
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
