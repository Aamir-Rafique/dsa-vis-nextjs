/**
 * ARRAY VISUAL COMPONENT
 * Displays an array as colorful bars (like a bar chart)
 * Perfect for visualizing sorting algorithms!
 */

'use client';

import React from 'react';

/**
 * ArrayVisual Component
 * @param {object} props
 * @param {number[]} props.array - The array to visualize
 * @param {object} props.highlights - Which elements to highlight
 * @param {number} props.maxValue - Maximum value (for scaling)
 */
export default function ArrayVisual({ array = [], highlights = {}, maxValue = null }) {
  // If no array, show placeholder
  if (!array || array.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">
        <p className="text-gray-400">No data to display</p>
      </div>
    );
  }
  
  // Calculate max value for scaling
  const max = maxValue || Math.max(...array);
  
  // Helper function to get bar color
  const getBarColor = (index) => {
    // Check different highlight types
    if (highlights.found === index) {
      return 'bg-green-500'; // Found!
    }
    if (highlights.current === index) {
      return 'bg-purple-500'; // Current position
    }
    if (highlights.comparing?.includes(index)) {
      return 'bg-yellow-500'; // Comparing
    }
    if (highlights.swapping?.includes(index)) {
      return 'bg-red-500'; // Swapping
    }
    if (highlights.sorted?.includes(index)) {
      return 'bg-green-500'; // Sorted
    }
    if (highlights.minIndex === index) {
      return 'bg-orange-500'; // Minimum index (selection sort)
    }
    if (highlights.pivot === index) {
      return 'bg-pink-500'; // Pivot (quick sort)
    }
    if (highlights.checked?.includes(index)) {
      return 'bg-gray-600'; // Already checked
    }
    if (highlights.searchSpace?.includes(index)) {
      return 'bg-blue-400'; // Search space (binary search)
    }
    if (highlights.left === index || highlights.right === index) {
      return 'bg-cyan-500'; // Left/right pointers
    }
    if (highlights.mid === index) {
      return 'bg-purple-500'; // Mid pointer
    }
    
    // Default color
    return 'bg-blue-500';
  };
  
  return (
    <div className="w-full p-6 bg-gray-900 rounded-lg">
      {/* Array visualization */}
      <div className="flex items-end justify-center gap-1 h-64 mb-4">
        {array.map((value, index) => {
          const barHeight = (value / max) * 100; // Percentage of max height
          const barColor = getBarColor(index);
          
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-end flex-1 max-w-16"
              style={{ minWidth: '20px' }}
            >
              {/* The bar */}
              <div
                className={`w-full ${barColor} rounded-t transition-all duration-300 flex items-end justify-center text-white text-xs font-bold pb-1`}
                style={{ 
                  height: `${Math.max(barHeight, 10)}%`,
                  minHeight: '30px'
                }}
              >
                {value}
              </div>
              
              {/* Index label */}
              <div className="text-xs text-gray-400 mt-1">
                {index}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center text-sm">
        {highlights.found !== undefined && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-300">Found</span>
          </div>
        )}
        {highlights.comparing && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-gray-300">Comparing</span>
          </div>
        )}
        {highlights.swapping && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-gray-300">Swapping</span>
          </div>
        )}
        {highlights.sorted && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-300">Sorted</span>
          </div>
        )}
        {highlights.current !== undefined && highlights.current >= 0 && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-gray-300">Current</span>
          </div>
        )}
      </div>
    </div>
  );
}
