/**
 * ALGORITHM PICKER COMPONENT
 * Dropdown to select which algorithm to visualize
 * Groups algorithms by category for easy navigation
 */

'use client';

import React from 'react';
import { algorithms, getAlgorithmsGroupedByCategory } from '@/lib/algorithms/allAlgorithms';

/**
 * AlgorithmPicker Component
 * @param {object} props
 * @param {string} props.selectedId - Currently selected algorithm ID
 * @param {function} props.onSelect - Callback when an algorithm is selected
 */
export default function AlgorithmPicker({ selectedId, onSelect }) {
  // Group algorithms by category
  const grouped = getAlgorithmsGroupedByCategory();
  
  // Category display names
  const categoryNames = {
    sorting: '📊 Sorting',
    searching: '🔍 Searching',
    graph: '🕸️ Graph',
    tree: '🌳 Tree',
    string: '📝 String',
    other: '🎲 Other'
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold text-white mb-3">Choose Algorithm</h3>
      
      <select
        value={selectedId || ''}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none cursor-pointer"
      >
        <option value="">-- Select an Algorithm --</option>
        
        {Object.entries(grouped).map(([category, algos]) => (
          <optgroup 
            key={category} 
            label={categoryNames[category] || category}
          >
            {algos.map((algo) => (
              <option key={algo.meta.id} value={algo.meta.id}>
                {algo.meta.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      
      {/* Show algorithm info if one is selected */}
      {selectedId && (() => {
        const algo = algorithms.find(a => a.meta.id === selectedId);
        if (!algo) return null;
        
        return (
          <div className="mt-4 p-3 bg-gray-700 rounded-lg">
            <h4 className="font-semibold text-white mb-2">{algo.meta.name}</h4>
            <p className="text-sm text-gray-300 mb-2">{algo.meta.description}</p>
            <div className="text-xs text-gray-400 space-y-1">
              <div>⏱️ Time: {algo.meta.timeComplexity}</div>
              <div>💾 Space: {algo.meta.spaceComplexity}</div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
