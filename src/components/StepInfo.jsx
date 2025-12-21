/**
 * STEP INFO COMPONENT
 * Shows the current step number, description, and metrics
 * Helps users understand what's happening in the algorithm
 */

'use client';

import React from 'react';

/**
 * StepInfo Component
 * @param {object} props
 * @param {object} props.currentFrame - Current frame data
 * @param {number} props.frameIndex - Current frame index
 * @param {number} props.totalFrames - Total number of frames
 */
export default function StepInfo({ currentFrame, frameIndex = 0, totalFrames = 0 }) {
  // If no frame, show placeholder
  if (!currentFrame) {
    return (
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-bold text-white mb-3">Step Information</h3>
        <p className="text-gray-400 text-sm">Select an algorithm and start visualization to see step details.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
      {/* Header with step number */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">
          Step {currentFrame.step}
        </h3>
        <div className="text-sm text-gray-400">
          {frameIndex + 1} / {totalFrames}
        </div>
      </div>
      
      {/* Progress bar */}
      {totalFrames > 0 && (
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((frameIndex + 1) / totalFrames) * 100}%` }}
          ></div>
        </div>
      )}
      
      {/* Description */}
      <div className="bg-gray-700 rounded-lg p-3">
        <p className="text-white text-sm leading-relaxed">
          {currentFrame.description}
        </p>
      </div>
      
      {/* Metrics (comparisons, swaps, etc.) */}
      {currentFrame.data?.metrics && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-300">Metrics</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(currentFrame.data.metrics).map(([key, value]) => (
              <div key={key} className="bg-gray-700 rounded p-2">
                <div className="text-xs text-gray-400 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="text-lg font-bold text-white">{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Status indicator */}
      <div className="flex items-center gap-2 text-sm">
        {currentFrame.done ? (
          <>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-semibold">Complete!</span>
          </>
        ) : (
          <>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-400 font-semibold">Running...</span>
          </>
        )}
      </div>
      
      {/* Found result (for searching) */}
      {currentFrame.data?.foundAt !== undefined && (
        <div className="bg-gray-700 rounded-lg p-3">
          <h4 className="text-sm font-semibold text-gray-300 mb-1">Result</h4>
          {currentFrame.data.foundAt >= 0 ? (
            <p className="text-green-400">
              ✅ Target found at index {currentFrame.data.foundAt}
            </p>
          ) : (
            <p className="text-red-400">
              ❌ Target not found in array
            </p>
          )}
        </div>
      )}
      
      {/* Huffman coding specific info */}
      {currentFrame.data?.compressionRatio && (
        <div className="bg-gray-700 rounded-lg p-3">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">Compression Stats</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Original:</span>
              <span className="text-white">{currentFrame.data.originalBits} bits</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Compressed:</span>
              <span className="text-white">{currentFrame.data.compressedBits} bits</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-gray-400">Savings:</span>
              <span className="text-green-400">{currentFrame.data.compressionRatio}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
