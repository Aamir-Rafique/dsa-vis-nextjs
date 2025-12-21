/**
 * CONTROLS BAR COMPONENT
 * Play, pause, step forward/backward, reset buttons
 * The control panel for the visualizer!
 */

'use client';

import React from 'react';

/**
 * ControlsBar Component
 * @param {object} props
 * @param {boolean} props.isPlaying - Is the algorithm currently playing?
 * @param {boolean} props.isDone - Is the algorithm finished?
 * @param {function} props.onPlay - Play callback
 * @param {function} props.onPause - Pause callback
 * @param {function} props.onStepForward - Step forward callback
 * @param {function} props.onStepBackward - Step backward callback
 * @param {function} props.onReset - Reset callback
 * @param {number} props.speed - Current speed
 * @param {function} props.onSpeedChange - Speed change callback
 */
export default function ControlsBar({
  isPlaying = false,
  isDone = false,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onReset,
  speed = 1,
  onSpeedChange
}) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Controls</h3>
      
      {/* Main control buttons */}
      <div className="flex gap-2">
        {/* Play/Pause button */}
        <button
          onClick={isPlaying ? onPause : onPlay}
          className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
            isPlaying
              ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
          title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
        >
          {isPlaying ? '⏸ Pause' : isDone ? '🔄 Play Again' : '▶ Play'}
        </button>
        
        {/* Reset button */}
        <button
          onClick={onReset}
          className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
          title="Reset (R)"
        >
          🔄 Reset
        </button>
      </div>
      
      {/* Step buttons */}
      <div className="flex gap-2">
        <button
          onClick={onStepBackward}
          className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
          title="Previous Step (←)"
        >
          ⏮ Previous
        </button>
        
        <button
          onClick={onStepForward}
          className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
          title="Next Step (→)"
        >
          ⏭ Next
        </button>
      </div>
      
      {/* Speed control */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-300 font-semibold">
            Speed: {speed}x
          </label>
          <div className="text-xs text-gray-400">
            {speed < 1 ? 'Slow' : speed === 1 ? 'Normal' : 'Fast'}
          </div>
        </div>
        
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.5"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          title="Adjust Speed (+/-)"
        />
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>0.5x</span>
          <span>1x</span>
          <span>1.5x</span>
          <span>2x</span>
          <span>2.5x</span>
          <span>3x</span>
        </div>
      </div>
      
      {/* Keyboard shortcuts help */}
      <div className="pt-4 border-t border-gray-700">
        <h4 className="text-xs font-semibold text-gray-400 mb-2">Keyboard Shortcuts</h4>
        <div className="text-xs text-gray-500 space-y-1">
          <div><kbd className="px-1 bg-gray-700 rounded">Space</kbd> Play/Pause</div>
          <div><kbd className="px-1 bg-gray-700 rounded">→</kbd> Next Step</div>
          <div><kbd className="px-1 bg-gray-700 rounded">←</kbd> Previous Step</div>
          <div><kbd className="px-1 bg-gray-700 rounded">R</kbd> Reset</div>
        </div>
      </div>
    </div>
  );
}
