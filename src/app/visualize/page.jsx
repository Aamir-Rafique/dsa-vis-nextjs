/**
 * MAIN VISUALIZER PAGE
 * This is where all the magic happens!
 * Users select an algorithm, input data, and watch it visualize
 */

'use client';

import React, { useState, useEffect } from 'react';
import AlgorithmPicker from '@/components/AlgorithmPicker';
import InputForm from '@/components/InputForm';
import ArrayVisual from '@/components/ArrayVisual';
import StepInfo from '@/components/StepInfo';
import ControlsBar from '@/components/ControlsBar';
import { useAlgorithm } from '@/lib/hooks/useAlgorithm';
import { getAlgorithmById } from '@/lib/algorithms/allAlgorithms';
import Link from 'next/link';

export default function VisualizePage() {
  // State
  const [selectedAlgorithmId, setSelectedAlgorithmId] = useState(null);
  const [algorithmModule, setAlgorithmModule] = useState(null);
  const [input, setInput] = useState(null);
  const [speed, setSpeed] = useState(1);
  
  // Get algorithm module when selection changes
  useEffect(() => {
    if (selectedAlgorithmId) {
      const algo = getAlgorithmById(selectedAlgorithmId);
      setAlgorithmModule(algo);
      setInput(null); // Reset input when changing algorithms
    } else {
      setAlgorithmModule(null);
    }
  }, [selectedAlgorithmId]);
  
  // Use the algorithm hook
  const {
    currentFrame,
    isPlaying,
    isDone,
    frameIndex,
    totalFrames,
    initialize,
    stepForward,
    stepBackward,
    play,
    pause,
    reset
  } = useAlgorithm(algorithmModule, input, speed);
  
  // Initialize when algorithm and input are ready
  useEffect(() => {
    if (algorithmModule && input) {
      initialize();
    }
  }, [algorithmModule, input, initialize]);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignore if user is typing in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
      
      switch (e.key) {
        case ' ': // Space - play/pause
          e.preventDefault();
          if (isPlaying) {
            pause();
          } else {
            play();
          }
          break;
        case 'ArrowRight': // Right arrow - next step
          e.preventDefault();
          pause();
          stepForward();
          break;
        case 'ArrowLeft': // Left arrow - previous step
          e.preventDefault();
          pause();
          stepBackward();
          break;
        case 'r':
        case 'R': // R - reset
          e.preventDefault();
          reset();
          break;
        case '+':
        case '=': // + - speed up
          e.preventDefault();
          setSpeed(Math.min(3, speed + 0.5));
          break;
        case '-':
        case '_': // - - slow down
          e.preventDefault();
          setSpeed(Math.max(0.5, speed - 0.5));
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, play, pause, stepForward, stepBackward, reset, speed]);
  
  // Get category for the selected algorithm
  const category = algorithmModule?.meta?.category;
  
  return (
    <div className="min-h-screen bg-gray-900 p-4">
      {/* Header */}
      <header className="mb-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
            ← Algorithm Visualizer
          </Link>
          <div className="text-sm text-gray-400">
            Interactive DSA Learning Tool
          </div>
        </div>
      </header>
      
      {/* Main layout - 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left sidebar - Algorithm picker and input */}
        <div className="lg:col-span-3 space-y-4">
          <AlgorithmPicker
            selectedId={selectedAlgorithmId}
            onSelect={setSelectedAlgorithmId}
          />
          
          {selectedAlgorithmId && (
            <InputForm
              algorithmId={selectedAlgorithmId}
              category={category}
              onSubmit={setInput}
            />
          )}
        </div>
        
        {/* Main area - Visualization */}
        <div className="lg:col-span-6">
          {!selectedAlgorithmId ? (
            // No algorithm selected - show welcome message
            <div className="h-full flex items-center justify-center bg-gray-800 rounded-lg p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">👈</div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome!
                </h2>
                <p className="text-gray-400">
                  Select an algorithm from the dropdown to get started
                </p>
              </div>
            </div>
          ) : !currentFrame ? (
            // Algorithm selected but no visualization yet
            <div className="h-full flex items-center justify-center bg-gray-800 rounded-lg p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">⚙️</div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Ready to visualize!
                </h2>
                <p className="text-gray-400 mb-4">
                  Press Play or Step Forward to start
                </p>
              </div>
            </div>
          ) : (
            // Show visualization based on category
            <>
              {(category === 'sorting' || category === 'searching') && (
                <ArrayVisual
                  array={currentFrame.data?.array || []}
                  highlights={currentFrame.highlights || {}}
                />
              )}
              
              {category === 'graph' && (
                <div className="bg-gray-800 rounded-lg p-6 h-full flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="text-4xl mb-4">🕸️</div>
                    <p>Graph visualization coming soon!</p>
                    <p className="text-sm mt-2">Check the step info panel for algorithm progress</p>
                  </div>
                </div>
              )}
              
              {category === 'string' && (
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Huffman Coding</h3>
                  
                  {currentFrame.data?.codes && (
                    <div className="space-y-4">
                      {/* Codes table */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-300 mb-2">Generated Codes:</h4>
                        <div className="bg-gray-700 rounded p-3 font-mono text-sm">
                          {Object.entries(currentFrame.data.codes).map(([char, code]) => (
                            <div key={char} className="flex justify-between py-1">
                              <span className="text-yellow-400">'{char}'</span>
                              <span className="text-blue-400">{code}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Encoded text */}
                      {currentFrame.data?.encodedText && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">Encoded Text:</h4>
                          <div className="bg-gray-700 rounded p-3 font-mono text-xs break-all text-green-400">
                            {currentFrame.data.encodedText.substring(0, 200)}
                            {currentFrame.data.encodedText.length > 200 && '...'}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {currentFrame.data?.frequencyTable && !currentFrame.data?.codes && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Character Frequencies:</h4>
                      <div className="bg-gray-700 rounded p-3 font-mono text-sm">
                        {Object.entries(currentFrame.data.frequencyTable).map(([char, freq]) => (
                          <div key={char} className="flex justify-between py-1">
                            <span className="text-yellow-400">'{char}'</span>
                            <span className="text-white">{freq}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Right sidebar - Step info and controls */}
        <div className="lg:col-span-3 space-y-4">
          <StepInfo
            currentFrame={currentFrame}
            frameIndex={frameIndex}
            totalFrames={totalFrames}
          />
          
          <ControlsBar
            isPlaying={isPlaying}
            isDone={isDone}
            onPlay={play}
            onPause={pause}
            onStepForward={stepForward}
            onStepBackward={stepBackward}
            onReset={reset}
            speed={speed}
            onSpeedChange={setSpeed}
          />
        </div>
      </div>
    </div>
  );
}
