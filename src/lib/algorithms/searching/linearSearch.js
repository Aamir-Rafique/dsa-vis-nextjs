/**
 * LINEAR SEARCH
 * The simplest search algorithm!
 * Check each element one by one until we find what we're looking for.
 * 
 * How it works:
 * 1. Start from the first element
 * 2. Check if it matches the target
 * 3. If yes, we found it! If no, move to next element
 * 4. Repeat until found or end of array
 * 
 * Time Complexity: O(n) - Might have to check every element
 */

// Basic info about this algorithm
export const meta = {
  id: 'linear-search',
  name: 'Linear Search',
  category: 'searching',
  description: 'Check each element one by one until we find the target!',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)'
};

/**
 * Set up the starting state
 */
export function initialize(input) {
  return {
    array: [...input.array],
    target: input.target,
    step: 0,
    comparisons: 0
  };
}

/**
 * The algorithm - yields one frame per step
 */
export function* run(state, controls) {
  const arr = [...state.array];
  const target = state.target;
  const n = arr.length;
  let comparisons = 0;
  let stepNum = 0;
  
  // First frame
  yield {
    step: stepNum++,
    description: `Starting Linear Search. Looking for ${target} in the array...`,
    data: { 
      array: [...arr],
      target,
      metrics: { comparisons }
    },
    highlights: {
      current: -1,
      found: -1
    },
    done: false
  };
  
  // Search through the array
  for (let i = 0; i < n; i++) {
    comparisons++;
    
    yield {
      step: stepNum++,
      description: `Checking position ${i}: Is ${arr[i]} equal to ${target}?`,
      data: { 
        array: [...arr],
        target,
        metrics: { comparisons }
      },
      highlights: {
        current: i,
        found: -1
      },
      done: false
    };
    
    if (arr[i] === target) {
      // Found it!
      yield {
        step: stepNum++,
        description: `✅ Found ${target} at position ${i}! Search complete with ${comparisons} comparisons.`,
        data: { 
          array: [...arr],
          target,
          metrics: { comparisons },
          foundAt: i
        },
        highlights: {
          current: -1,
          found: i
        },
        done: true
      };
      return;
    } else {
      yield {
        step: stepNum++,
        description: `${arr[i]} ≠ ${target}. Moving to next element...`,
        data: { 
          array: [...arr],
          target,
          metrics: { comparisons }
        },
        highlights: {
          current: -1,
          checked: Array.from({ length: i + 1 }, (_, k) => k)
        },
        done: false
      };
    }
  }
  
  // Not found
  yield {
    step: stepNum++,
    description: `❌ ${target} not found in the array. Checked all ${comparisons} elements.`,
    data: { 
      array: [...arr],
      target,
      metrics: { comparisons },
      foundAt: -1
    },
    highlights: {
      current: -1,
      found: -1,
      checked: arr.map((_, idx) => idx)
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
  if (input.target === undefined || input.target === null) {
    throw new Error('Please provide a target value to search for');
  }
  if (typeof input.target !== 'number') {
    throw new Error('Target must be a number');
  }
  if (!input.array.every(item => typeof item === 'number')) {
    throw new Error('All array elements must be numbers');
  }
}
