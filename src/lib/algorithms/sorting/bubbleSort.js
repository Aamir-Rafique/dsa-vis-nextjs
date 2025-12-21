/**
 * BUBBLE SORT
 * Simple sorting algorithm that repeatedly steps through the list,
 * compares adjacent elements and swaps them if they're in wrong order.
 * 
 * How it works:
 * 1. Compare each pair of adjacent items
 * 2. Swap them if they're in the wrong order
 * 3. Repeat until no more swaps are needed
 * 
 * Time Complexity: O(n²) - Not very fast, but easy to understand!
 */

// Basic info about this algorithm
export const meta = {
  id: 'bubble-sort',
  name: 'Bubble Sort',
  category: 'sorting',
  description: 'Compare neighbors and swap if needed. Repeat until sorted!',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)'
};

/**
 * Set up the starting state
 * @param {object} input - Contains the array to sort
 * @returns {object} Initial state for the algorithm
 */
export function initialize(input) {
  return {
    array: [...input.array], // Make a copy so we don't modify the original
    step: 0,
    comparisons: 0,
    swaps: 0
  };
}

/**
 * The actual algorithm - yields one frame per step
 * Each yield creates one animation frame that shows what's happening
 * @param {object} state - Current state (array, counters, etc.)
 * @param {object} controls - Control settings (speed, etc.)
 * @yields {object} Frame object with current step info
 */
export function* run(state, controls) {
  const arr = [...state.array];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  let stepNum = 0;
  
  // First frame - show starting state
  yield {
    step: stepNum++,
    description: 'Starting Bubble Sort. We will compare neighbors and swap if needed!',
    data: { 
      array: [...arr],
      metrics: { comparisons, swaps }
    },
    highlights: {
      comparing: [],
      sorted: []
    },
    done: false
  };
  
  // Bubble sort algorithm - outer loop
  for (let i = 0; i < n - 1; i++) {
    let swappedInThisPass = false;
    
    // Inner loop - compare adjacent elements
    for (let j = 0; j < n - i - 1; j++) {
      // Show comparison
      comparisons++;
      yield {
        step: stepNum++,
        description: `Comparing ${arr[j]} and ${arr[j + 1]}. Is ${arr[j]} > ${arr[j + 1]}?`,
        data: { 
          array: [...arr],
          metrics: { comparisons, swaps }
        },
        highlights: {
          comparing: [j, j + 1],
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k)
        },
        done: false
      };
      
      // Swap if needed
      if (arr[j] > arr[j + 1]) {
        // Perform the swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        swappedInThisPass = true;
        
        yield {
          step: stepNum++,
          description: `Yes! ${arr[j + 1]} > ${arr[j]}, so we swap them!`,
          data: { 
            array: [...arr],
            metrics: { comparisons, swaps }
          },
          highlights: {
            swapping: [j, j + 1],
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k)
          },
          done: false
        };
      } else {
        yield {
          step: stepNum++,
          description: `No swap needed. ${arr[j]} ≤ ${arr[j + 1]}, they're in the right order.`,
          data: { 
            array: [...arr],
            metrics: { comparisons, swaps }
          },
          highlights: {
            comparing: [],
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k)
          },
          done: false
        };
      }
    }
    
    // Mark the last position as sorted
    yield {
      step: stepNum++,
      description: `Pass ${i + 1} complete! Position ${n - i - 1} is now in its correct place.`,
      data: { 
        array: [...arr],
        metrics: { comparisons, swaps }
      },
      highlights: {
        comparing: [],
        sorted: Array.from({ length: i + 1 }, (_, k) => n - 1 - k)
      },
      done: false
    };
    
    // Early exit if no swaps were made
    if (!swappedInThisPass) {
      yield {
        step: stepNum++,
        description: 'No swaps in this pass - array is already sorted!',
        data: { 
          array: [...arr],
          metrics: { comparisons, swaps }
        },
        highlights: {
          comparing: [],
          sorted: arr.map((_, idx) => idx)
        },
        done: false
      };
      break;
    }
  }
  
  // Final frame - all done!
  yield {
    step: stepNum++,
    description: `✅ Bubble Sort complete! Array is sorted with ${comparisons} comparisons and ${swaps} swaps.`,
    data: { 
      array: [...arr],
      metrics: { comparisons, swaps }
    },
    highlights: {
      comparing: [],
      sorted: arr.map((_, idx) => idx)
    },
    done: true
  };
}

/**
 * Make sure input is valid
 * @param {object} input - Input to validate
 * @throws {Error} If input is invalid
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
  // Check if all elements are numbers
  if (!input.array.every(item => typeof item === 'number')) {
    throw new Error('All array elements must be numbers');
  }
}
