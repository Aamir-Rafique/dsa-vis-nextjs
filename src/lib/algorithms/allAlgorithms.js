/**
 * ALL ALGORITHMS REGISTRY
 * Central place to register all algorithms
 * Import all algorithms and export them as a single array
 */

// Sorting algorithms
import * as bubbleSort from './sorting/bubbleSort.js';
import * as selectionSort from './sorting/selectionSort.js';
import * as insertionSort from './sorting/insertionSort.js';
import * as mergeSort from './sorting/mergeSort.js';
import * as quickSort from './sorting/quickSort.js';

// Searching algorithms
import * as linearSearch from './searching/linearSearch.js';
import * as binarySearch from './searching/binarySearch.js';

// Graph algorithms
import * as bfs from './graph/bfs.js';
import * as dfs from './graph/dfs.js';

// String algorithms
import * as huffmanCoding from './string/huffmanCoding.js';

/**
 * Array of all algorithms
 * Each algorithm object has: meta, initialize, run, and validateInput
 */
export const algorithms = [
  // Sorting (5 algorithms)
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  
  // Searching (2 algorithms)
  linearSearch,
  binarySearch,
  
  // Graph (2 algorithms)
  bfs,
  dfs,
  
  // String (1 algorithm)
  huffmanCoding
];

/**
 * Get algorithm by ID
 * @param {string} id - Algorithm ID
 * @returns {object} Algorithm object
 */
export function getAlgorithmById(id) {
  return algorithms.find(algo => algo.meta.id === id);
}

/**
 * Get algorithms by category
 * @param {string} category - Category name
 * @returns {array} Array of algorithms in that category
 */
export function getAlgorithmsByCategory(category) {
  return algorithms.filter(algo => algo.meta.category === category);
}

/**
 * Get all categories
 * @returns {array} Array of unique category names
 */
export function getAllCategories() {
  const categories = algorithms.map(algo => algo.meta.category);
  return [...new Set(categories)];
}

/**
 * Get algorithms grouped by category
 * @returns {object} Object with categories as keys
 */
export function getAlgorithmsGroupedByCategory() {
  const grouped = {};
  
  algorithms.forEach(algo => {
    const category = algo.meta.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(algo);
  });
  
  return grouped;
}
