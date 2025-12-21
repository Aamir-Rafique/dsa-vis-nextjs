/**
 * SELECTION SORT
 * Sorts an array by repeatedly finding the minimum element 
 * and moving it to the beginning.
 * 
 * How it works:
 * 1. Find the smallest element in the unsorted part
 * 2. Swap it with the first unsorted element
 * 3. Move the boundary between sorted/unsorted parts
 * 4. Repeat until everything is sorted
 * 
 * Time Complexity: O(n²) - Same as bubble sort, but makes fewer swaps!
 */

// Basic info about this algorithm
export const meta = {
  id: 'selection-sort',
  name: 'Selection Sort',
  category: 'sorting',
  description: 'Find the smallest element and move it to the front. Repeat!',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)'
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
    description: 'Starting Selection Sort. We will find the smallest element and move it to the front!',
    data: { 
      array: [...arr],
      metrics: { comparisons, swaps }
    },
    highlights: {
      current: -1,
      minIndex: -1,
      sorted: []
    },
    done: false
  };
  
  // Selection sort algorithm
  for (let i = 0; i < n - 1; i++) {
    // Assume the first unsorted element is the minimum
    let minIndex = i;
    
    yield {
      step: stepNum++,
      description: `Starting pass ${i + 1}. Looking for the smallest element in the unsorted part...`,
      data: { 
        array: [...arr],
        metrics: { comparisons, swaps }
      },
      highlights: {
        current: i,
        minIndex: minIndex,
        sorted: Array.from({ length: i }, (_, k) => k)
      },
      done: false
    };
    
    // Find the minimum element in the remaining unsorted array
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      
      yield {
        step: stepNum++,
        description: `Comparing ${arr[j]} with current minimum ${arr[minIndex]}`,
        data: { 
          array: [...arr],
          metrics: { comparisons, swaps }
        },
        highlights: {
          current: j,
          minIndex: minIndex,
          sorted: Array.from({ length: i }, (_, k) => k)
        },
        done: false
      };
      
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        
        yield {
          step: stepNum++,
          description: `Found a smaller value! ${arr[j]} is now our new minimum.`,
          data: { 
            array: [...arr],
            metrics: { comparisons, swaps }
          },
          highlights: {
            current: j,
            minIndex: minIndex,
            sorted: Array.from({ length: i }, (_, k) => k)
          },
          done: false
        };
      }
    }
    
    // Swap the found minimum element with the first unsorted element
    if (minIndex !== i) {
      yield {
        step: stepNum++,
        description: `Swapping ${arr[i]} at position ${i} with minimum ${arr[minIndex]} at position ${minIndex}`,
        data: { 
          array: [...arr],
          metrics: { comparisons, swaps }
        },
        highlights: {
          swapping: [i, minIndex],
          sorted: Array.from({ length: i }, (_, k) => k)
        },
        done: false
      };
      
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      swaps++;
    } else {
      yield {
        step: stepNum++,
        description: `${arr[i]} is already in the correct position. No swap needed.`,
        data: { 
          array: [...arr],
          metrics: { comparisons, swaps }
        },
        highlights: {
          current: i,
          sorted: Array.from({ length: i }, (_, k) => k)
        },
        done: false
      };
    }
    
    // Mark this position as sorted
    yield {
      step: stepNum++,
      description: `Position ${i} is now sorted! Moving to next position...`,
      data: { 
        array: [...arr],
        metrics: { comparisons, swaps }
      },
      highlights: {
        current: -1,
        minIndex: -1,
        sorted: Array.from({ length: i + 1 }, (_, k) => k)
      },
      done: false
    };
  }
  
  // Final frame
  yield {
    step: stepNum++,
    description: `✅ Selection Sort complete! Sorted with ${comparisons} comparisons and only ${swaps} swaps.`,
    data: { 
      array: [...arr],
      metrics: { comparisons, swaps }
    },
    highlights: {
      current: -1,
      minIndex: -1,
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
