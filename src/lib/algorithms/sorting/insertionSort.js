/**
 * INSERTION SORT
 * Builds the final sorted array one item at a time.
 * Like sorting playing cards in your hand!
 * 
 * How it works:
 * 1. Start with the second element
 * 2. Compare it with elements before it
 * 3. Insert it in the right position
 * 4. Repeat for all elements
 * 
 * Time Complexity: O(n²) - But fast for small or nearly-sorted arrays!
 */

// Basic info about this algorithm
export const meta = {
  id: 'insertion-sort',
  name: 'Insertion Sort',
  category: 'sorting',
  description: 'Build a sorted list one item at a time, like sorting cards in your hand!',
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
    shifts: 0
  };
}

/**
 * The algorithm - yields one frame per step
 */
export function* run(state, controls) {
  const arr = [...state.array];
  const n = arr.length;
  let comparisons = 0;
  let shifts = 0;
  let stepNum = 0;
  
  // First frame
  yield {
    step: stepNum++,
    description: 'Starting Insertion Sort. The first element is already "sorted".',
    data: { 
      array: [...arr],
      metrics: { comparisons, shifts }
    },
    highlights: {
      current: -1,
      sorted: [0]
    },
    done: false
  };
  
  // Start from the second element (index 1)
  for (let i = 1; i < n; i++) {
    const key = arr[i]; // The element we want to insert
    
    yield {
      step: stepNum++,
      description: `Picking up ${key} to insert it into the sorted part.`,
      data: { 
        array: [...arr],
        metrics: { comparisons, shifts }
      },
      highlights: {
        current: i,
        sorted: Array.from({ length: i }, (_, k) => k)
      },
      done: false
    };
    
    let j = i - 1;
    
    // Move elements greater than key one position ahead
    while (j >= 0) {
      comparisons++;
      
      yield {
        step: stepNum++,
        description: `Is ${key} < ${arr[j]}? ${key < arr[j] ? 'Yes, shift it right!' : 'No, found the spot!'}`,
        data: { 
          array: [...arr],
          metrics: { comparisons, shifts }
        },
        highlights: {
          current: i,
          comparing: j,
          sorted: Array.from({ length: i }, (_, k) => k)
        },
        done: false
      };
      
      if (arr[j] > key) {
        // Shift element to the right
        arr[j + 1] = arr[j];
        shifts++;
        
        yield {
          step: stepNum++,
          description: `Shifting ${arr[j]} one position to the right.`,
          data: { 
            array: [...arr],
            metrics: { comparisons, shifts }
          },
          highlights: {
            current: i,
            shifting: j,
            sorted: Array.from({ length: i }, (_, k) => k)
          },
          done: false
        };
        
        j--;
      } else {
        break;
      }
    }
    
    // Insert the key at its correct position
    arr[j + 1] = key;
    
    yield {
      step: stepNum++,
      description: `Inserting ${key} at position ${j + 1}. Now ${i + 1} elements are sorted!`,
      data: { 
        array: [...arr],
        metrics: { comparisons, shifts }
      },
      highlights: {
        current: j + 1,
        sorted: Array.from({ length: i + 1 }, (_, k) => k)
      },
      done: false
    };
  }
  
  // Final frame
  yield {
    step: stepNum++,
    description: `✅ Insertion Sort complete! Sorted with ${comparisons} comparisons and ${shifts} shifts.`,
    data: { 
      array: [...arr],
      metrics: { comparisons, shifts }
    },
    highlights: {
      current: -1,
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
