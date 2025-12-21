/**
 * INPUT FORM COMPONENT
 * Form to input data for the selected algorithm
 * Different inputs for different algorithm types
 */

'use client';

import React, { useState, useEffect } from 'react';
import { generateRandomArray, generateSortedArray, generateRandomGraph, generateRandomText } from '@/lib/helpers/dataGenerator';

/**
 * InputForm Component
 * @param {object} props
 * @param {string} props.algorithmId - Selected algorithm ID
 * @param {string} props.category - Algorithm category
 * @param {function} props.onSubmit - Callback with input data
 */
export default function InputForm({ algorithmId, category, onSubmit }) {
  // Form state
  const [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState(45);
  const [text, setText] = useState('hello world');
  
  // Generate initial data when algorithm changes
  useEffect(() => {
    if (category === 'sorting') {
      const newArray = generateRandomArray(arraySize);
      setArray(newArray);
      onSubmit({ array: newArray });
    } else if (category === 'searching') {
      if (algorithmId === 'binary-search') {
        const newArray = generateSortedArray(arraySize);
        setArray(newArray);
        setTarget(newArray[Math.floor(newArray.length / 2)] || 45);
        onSubmit({ array: newArray, target: newArray[Math.floor(newArray.length / 2)] || 45 });
      } else {
        const newArray = generateRandomArray(arraySize);
        setArray(newArray);
        setTarget(newArray[Math.floor(newArray.length / 2)] || 45);
        onSubmit({ array: newArray, target: newArray[Math.floor(newArray.length / 2)] || 45 });
      }
    } else if (category === 'graph') {
      const graphData = generateRandomGraph(6, 0.4, false);
      onSubmit({ ...graphData, startNode: '0' });
    } else if (category === 'string') {
      setText('hello world');
      onSubmit({ text: 'hello world' });
    }
  }, [algorithmId, category]);
  
  // Randomize array
  const randomizeArray = () => {
    let newArray;
    if (algorithmId === 'binary-search') {
      newArray = generateSortedArray(arraySize);
    } else {
      newArray = generateRandomArray(arraySize);
    }
    setArray(newArray);
    
    if (category === 'searching') {
      const newTarget = newArray[Math.floor(newArray.length / 2)] || 45;
      setTarget(newTarget);
      onSubmit({ array: newArray, target: newTarget });
    } else {
      onSubmit({ array: newArray });
    }
  };
  
  // Randomize graph
  const randomizeGraph = () => {
    const graphData = generateRandomGraph(6, 0.4, false);
    onSubmit({ ...graphData, startNode: '0' });
  };
  
  // Randomize text
  const randomizeText = () => {
    const newText = generateRandomText(50);
    setText(newText);
    onSubmit({ text: newText });
  };
  
  // Show different forms based on category
  if (category === 'sorting') {
    return (
      <div className="bg-gray-800 rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-bold text-white">Input Data</h3>
        
        {/* Array size slider */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300 font-semibold">
            Array Size: {arraySize}
          </label>
          <input
            type="range"
            min="5"
            max="15"
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
        
        {/* Randomize button */}
        <button
          onClick={randomizeArray}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          🎲 Randomize Array
        </button>
        
        {/* Array preview */}
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Array:</div>
          <div className="text-white font-mono text-sm break-all">
            [{array.join(', ')}]
          </div>
        </div>
      </div>
    );
  }
  
  if (category === 'searching') {
    return (
      <div className="bg-gray-800 rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-bold text-white">Input Data</h3>
        
        {/* Array size slider */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300 font-semibold">
            Array Size: {arraySize}
          </label>
          <input
            type="range"
            min="5"
            max="15"
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
        
        {/* Target value input */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300 font-semibold">
            Target Value:
          </label>
          <input
            type="number"
            value={target}
            onChange={(e) => {
              const newTarget = parseInt(e.target.value);
              setTarget(newTarget);
              onSubmit({ array, target: newTarget });
            }}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
        
        {/* Randomize button */}
        <button
          onClick={randomizeArray}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          🎲 Randomize Data
        </button>
        
        {/* Array preview */}
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">
            Array {algorithmId === 'binary-search' && '(sorted)'}:
          </div>
          <div className="text-white font-mono text-sm break-all">
            [{array.join(', ')}]
          </div>
        </div>
      </div>
    );
  }
  
  if (category === 'graph') {
    return (
      <div className="bg-gray-800 rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-bold text-white">Input Data</h3>
        
        <button
          onClick={randomizeGraph}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          🎲 Generate Random Graph
        </button>
        
        <div className="text-sm text-gray-400">
          Graph will be generated with 6 nodes and random connections.
        </div>
      </div>
    );
  }
  
  if (category === 'string') {
    return (
      <div className="bg-gray-800 rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-bold text-white">Input Data</h3>
        
        {/* Text input */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300 font-semibold">
            Text to Encode:
          </label>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              onSubmit({ text: e.target.value });
            }}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
            rows="4"
            maxLength="100"
          />
          <div className="text-xs text-gray-400">
            {text.length} / 100 characters
          </div>
        </div>
        
        {/* Randomize button */}
        <button
          onClick={randomizeText}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          🎲 Generate Random Text
        </button>
      </div>
    );
  }
  
  // Default placeholder
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold text-white mb-3">Input Data</h3>
      <p className="text-gray-400 text-sm">Select an algorithm to configure input data.</p>
    </div>
  );
}
