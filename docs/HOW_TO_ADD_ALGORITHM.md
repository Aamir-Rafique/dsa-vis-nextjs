# How to Add a New Algorithm 🚀

Adding a new algorithm is easy! Just follow these 4 simple steps.

## Step 1: Create Your Algorithm File

Create a new file in the appropriate folder:

- **Sorting** → `/src/lib/algorithms/sorting/yourSort.js`
- **Searching** → `/src/lib/algorithms/searching/yourSearch.js`
- **Graph** → `/src/lib/algorithms/graph/yourGraph.js`
- **Tree** → `/src/lib/algorithms/tree/yourTree.js`
- **String** → `/src/lib/algorithms/string/yourString.js`
- **Other** → `/src/lib/algorithms/other/yourAlgo.js`

## Step 2: Write the Algorithm Template

Every algorithm needs these 4 parts:

```javascript
/**
 * YOUR ALGORITHM NAME
 * Brief description of what it does and how it works
 */

// 1. Meta information
export const meta = {
  id: 'your-algorithm-id',      // Unique ID (lowercase-with-dashes)
  name: 'Your Algorithm Name',   // Display name
  category: 'sorting',           // Category: sorting, searching, graph, tree, string, other
  description: 'What does it do?', // Short description
  timeComplexity: 'O(n)',       // Big O notation
  spaceComplexity: 'O(1)'       // Big O notation
};

// 2. Initialize function - set up starting state
export function initialize(input) {
  return {
    // Copy input data
    array: [...input.array], // or whatever data you need
    step: 0,
    // Add any counters or state you need
    comparisons: 0,
    swaps: 0
  };
}

// 3. Run function - the actual algorithm (uses generator!)
export function* run(state, controls) {
  // Get data from state
  const arr = [...state.array];
  let stepNum = 0;
  
  // First frame - starting state
  yield {
    step: stepNum++,
    description: 'Starting the algorithm...',
    data: { 
      array: [...arr]
    },
    highlights: {},
    done: false
  };
  
  // YOUR ALGORITHM LOGIC HERE
  // For example, a simple loop:
  for (let i = 0; i < arr.length; i++) {
    // Show what's happening
    yield {
      step: stepNum++,
      description: `Checking element at position ${i}: ${arr[i]}`,
      data: { 
        array: [...arr]
      },
      highlights: {
        current: i
      },
      done: false
    };
    
    // Do something with the element
    // ...
  }
  
  // Final frame - done!
  yield {
    step: stepNum++,
    description: '✅ Algorithm complete!',
    data: { 
      array: [...arr]
    },
    highlights: {},
    done: true
  };
}

// 4. Validate function - check if input is valid
export function validateInput(input) {
  if (!input.array) {
    throw new Error('Please provide an array');
  }
  if (input.array.length === 0) {
    throw new Error('Array must have at least one element');
  }
  // Add more validation as needed
}
```

## Step 3: Understanding the Frame Object

Each `yield` creates one animation frame. The frame object has:

```javascript
{
  step: 1,                    // Step number
  description: 'What is happening now',  // Plain English explanation
  
  data: {                     // The actual data to display
    array: [1, 2, 3],         // For sorting/searching
    graph: { nodes, edges },  // For graph algorithms
    tree: { root },           // For tree algorithms
    metrics: {                // Optional: show statistics
      comparisons: 5,
      swaps: 2
    }
  },
  
  highlights: {               // What to highlight in the visualization
    current: 0,               // Current position
    comparing: [0, 1],        // Elements being compared
    swapping: [0, 1],         // Elements being swapped
    sorted: [0, 1, 2],        // Sorted elements
    // Add any highlights you need!
  },
  
  done: false                 // Is the algorithm finished?
}
```

## Step 4: Register Your Algorithm

Add your algorithm to `/src/lib/algorithms/allAlgorithms.js`:

```javascript
// Import your algorithm
import * as yourAlgorithm from './sorting/yourSort.js';

// Add it to the algorithms array
export const algorithms = [
  // ... existing algorithms
  yourAlgorithm,  // <-- Add yours here!
];
```

That's it! Your algorithm will now appear in the dropdown! 🎉

## Example: Simple Maximum Finder

Here's a complete example of a simple algorithm that finds the maximum value:

```javascript
/**
 * FIND MAXIMUM
 * Find the largest number in an array
 */

export const meta = {
  id: 'find-max',
  name: 'Find Maximum',
  category: 'searching',
  description: 'Find the largest number in an array',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)'
};

export function initialize(input) {
  return {
    array: [...input.array],
    step: 0
  };
}

export function* run(state, controls) {
  const arr = [...state.array];
  let stepNum = 0;
  
  // Start with first element as max
  let max = arr[0];
  let maxIndex = 0;
  
  yield {
    step: stepNum++,
    description: `Starting with first element: ${max}`,
    data: { array: [...arr] },
    highlights: { current: 0 },
    done: false
  };
  
  // Check each element
  for (let i = 1; i < arr.length; i++) {
    yield {
      step: stepNum++,
      description: `Comparing ${arr[i]} with current max ${max}`,
      data: { array: [...arr] },
      highlights: { 
        current: i,
        maxIndex: maxIndex
      },
      done: false
    };
    
    if (arr[i] > max) {
      max = arr[i];
      maxIndex = i;
      
      yield {
        step: stepNum++,
        description: `New maximum found: ${max}!`,
        data: { array: [...arr] },
        highlights: { 
          maxIndex: maxIndex
        },
        done: false
      };
    }
  }
  
  // Done!
  yield {
    step: stepNum++,
    description: `✅ Maximum value is ${max} at position ${maxIndex}`,
    data: { array: [...arr] },
    highlights: { 
      found: maxIndex
    },
    done: true
  };
}

export function validateInput(input) {
  if (!input.array || input.array.length === 0) {
    throw new Error('Please provide a non-empty array');
  }
}
```

## Tips for Great Algorithms

### 1. Use Clear Descriptions
```javascript
// ❌ Bad
description: 'i=3, j=5'

// ✅ Good
description: 'Comparing element at position 3 (value: 12) with element at position 5 (value: 8)'
```

### 2. Highlight Important Elements
```javascript
yield {
  highlights: {
    current: i,           // What we're looking at now
    comparing: [i, j],    // What we're comparing
    sorted: sortedIndices // What's already done
  }
};
```

### 3. Show Progress
```javascript
data: {
  array: [...arr],
  metrics: {
    comparisons: comparisonCount,
    swaps: swapCount,
    operations: operationCount
  }
}
```

### 4. Add Meaningful Steps
Don't just show the final result - show the journey!
- Before comparison
- After comparison
- Before swap
- After swap
- When something important happens

### 5. Use Emojis in Final Step
```javascript
description: '✅ Algorithm complete!' // Success
description: '❌ Not found'            // Failure
description: '🎉 Sorted!'              // Celebration
```

## Testing Your Algorithm

1. **Save your file**
2. **Restart the dev server** (`npm run dev`)
3. **Select your algorithm** from the dropdown
4. **Click through steps** - does it make sense?
5. **Try different inputs** - does it handle edge cases?

## Common Mistakes to Avoid

### 1. Forgetting to copy arrays
```javascript
// ❌ Bad - modifies original
const arr = state.array;

// ✅ Good - makes a copy
const arr = [...state.array];
```

### 2. Not using generators
```javascript
// ❌ Bad - regular function
export function run(state) {
  return result;
}

// ✅ Good - generator function
export function* run(state) {
  yield frame1;
  yield frame2;
}
```

### 3. Missing `done: true` on final step
```javascript
// ❌ Bad - algorithm never finishes
yield { done: false };

// ✅ Good - marks completion
yield { done: true };
```

## Need Help?

- Look at existing algorithms in `/src/lib/algorithms/`
- Copy the structure from `bubbleSort.js`
- Start simple and add features gradually

**Happy coding! 🎨**
