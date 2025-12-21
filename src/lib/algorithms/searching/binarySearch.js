/**
 * BINARY SEARCH
 * Smart search for SORTED arrays!
 * Instead of checking every element, we divide the search space in half each time.
 * 
 * How it works:
 * 1. Start by looking at the middle element
 * 2. If target is smaller, search the left half
 * 3. If target is larger, search the right half
 * 4. Repeat until found or no elements left
 * 
 * Time Complexity: O(log n) - Much faster than linear search!
 * IMPORTANT: Array MUST be sorted!
 */

// Basic info about this algorithm
export const meta = {
  id: 'binary-search',
  name: 'Binary Search',
  category: 'searching',
  description: 'Smart search! Divide the search space in half each time. (Array must be sorted!)',
  timeComplexity: 'O(log n)',
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
  let comparisons = 0;
  let stepNum = 0;
  
  // First frame
  yield {
    step: stepNum++,
    description: `Starting Binary Search. Looking for ${target} in the sorted array...`,
    data: { 
      array: [...arr],
      target,
      metrics: { comparisons }
    },
    highlights: {
      left: -1,
      right: -1,
      mid: -1,
      found: -1
    },
    done: false
  };
  
  let left = 0;
  let right = arr.length - 1;
  
  yield {
    step: stepNum++,
    description: `Setting up search range: left = ${left}, right = ${right}`,
    data: { 
      array: [...arr],
      target,
      metrics: { comparisons }
    },
    highlights: {
      left: left,
      right: right,
      mid: -1,
      searchSpace: Array.from({ length: right - left + 1 }, (_, i) => left + i)
    },
    done: false
  };
  
  // Binary search loop
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    comparisons++;
    
    yield {
      step: stepNum++,
      description: `Checking middle element at position ${mid}: ${arr[mid]}`,
      data: { 
        array: [...arr],
        target,
        metrics: { comparisons }
      },
      highlights: {
        left: left,
        right: right,
        mid: mid,
        searchSpace: Array.from({ length: right - left + 1 }, (_, i) => left + i)
      },
      done: false
    };
    
    if (arr[mid] === target) {
      // Found it!
      yield {
        step: stepNum++,
        description: `✅ Found ${target} at position ${mid}! Binary Search complete with only ${comparisons} comparisons.`,
        data: { 
          array: [...arr],
          target,
          metrics: { comparisons },
          foundAt: mid
        },
        highlights: {
          left: -1,
          right: -1,
          mid: -1,
          found: mid
        },
        done: true
      };
      return;
    } else if (arr[mid] < target) {
      // Target is in the right half
      yield {
        step: stepNum++,
        description: `${arr[mid]} < ${target}, so target must be in the RIGHT half. Eliminating left half!`,
        data: { 
          array: [...arr],
          target,
          metrics: { comparisons }
        },
        highlights: {
          left: left,
          right: right,
          mid: mid,
          eliminated: Array.from({ length: mid - left + 1 }, (_, i) => left + i)
        },
        done: false
      };
      
      left = mid + 1;
      
      if (left <= right) {
        yield {
          step: stepNum++,
          description: `New search range: positions ${left} to ${right}`,
          data: { 
            array: [...arr],
            target,
            metrics: { comparisons }
          },
          highlights: {
            left: left,
            right: right,
            mid: -1,
            searchSpace: Array.from({ length: right - left + 1 }, (_, i) => left + i)
          },
          done: false
        };
      }
    } else {
      // Target is in the left half
      yield {
        step: stepNum++,
        description: `${arr[mid]} > ${target}, so target must be in the LEFT half. Eliminating right half!`,
        data: { 
          array: [...arr],
          target,
          metrics: { comparisons }
        },
        highlights: {
          left: left,
          right: right,
          mid: mid,
          eliminated: Array.from({ length: right - mid + 1 }, (_, i) => mid + i)
        },
        done: false
      };
      
      right = mid - 1;
      
      if (left <= right) {
        yield {
          step: stepNum++,
          description: `New search range: positions ${left} to ${right}`,
          data: { 
            array: [...arr],
            target,
            metrics: { comparisons }
          },
          highlights: {
            left: left,
            right: right,
            mid: -1,
            searchSpace: Array.from({ length: right - left + 1 }, (_, i) => left + i)
          },
          done: false
        };
      }
    }
  }
  
  // Not found
  yield {
    step: stepNum++,
    description: `❌ ${target} not found in the array. Binary Search complete with only ${comparisons} comparisons!`,
    data: { 
      array: [...arr],
      target,
      metrics: { comparisons },
      foundAt: -1
    },
    highlights: {
      left: -1,
      right: -1,
      mid: -1,
      found: -1
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
  
  // Check if array is sorted
  for (let i = 1; i < input.array.length; i++) {
    if (input.array[i] < input.array[i - 1]) {
      throw new Error('Binary Search requires a SORTED array! Please sort the array first.');
    }
  }
}
