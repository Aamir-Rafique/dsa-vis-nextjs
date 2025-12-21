/**
 * USE ALGORITHM HOOK
 * Custom hook to run algorithms step by step
 * Manages the generator, current frame, and playback state
 */

'use client';

import { useState, useRef, useCallback } from 'react';

/**
 * Hook to manage algorithm execution
 * @param {object} algorithmModule - The algorithm module (has meta, initialize, run, validateInput)
 * @param {object} input - Input data for the algorithm
 * @param {number} speed - Playback speed (0.5 = slow, 1 = normal, 2 = fast)
 * @returns {object} Algorithm state and control functions
 */
export function useAlgorithm(algorithmModule, input, speed = 1) {
  // Current frame being displayed
  const [currentFrame, setCurrentFrame] = useState(null);
  
  // Is the algorithm playing?
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Has the algorithm finished?
  const [isDone, setIsDone] = useState(false);
  
  // All frames (for going back)
  const [frames, setFrames] = useState([]);
  
  // Current frame index
  const [frameIndex, setFrameIndex] = useState(-1);
  
  // Generator reference
  const generatorRef = useRef(null);
  
  // Interval reference for auto-play
  const intervalRef = useRef(null);
  
  /**
   * Initialize the algorithm
   * Creates the generator and sets up the first frame
   */
  const initialize = useCallback(() => {
    if (!algorithmModule || !input) return;
    
    try {
      // Validate input
      algorithmModule.validateInput(input);
      
      // Initialize state
      const state = algorithmModule.initialize(input);
      
      // Create generator
      generatorRef.current = algorithmModule.run(state, { speed });
      
      // Get first frame
      const firstFrame = generatorRef.current.next();
      
      if (!firstFrame.done) {
        setCurrentFrame(firstFrame.value);
        setFrames([firstFrame.value]);
        setFrameIndex(0);
        setIsDone(false);
      }
    } catch (error) {
      console.error('Error initializing algorithm:', error);
      setCurrentFrame({
        step: 0,
        description: `Error: ${error.message}`,
        data: {},
        highlights: {},
        done: true
      });
    }
  }, [algorithmModule, input, speed]);
  
  /**
   * Go to the next step
   */
  const stepForward = useCallback(() => {
    if (!generatorRef.current) {
      initialize();
      return;
    }
    
    if (isDone) return;
    
    // If we have frames ahead (user went back), just move forward
    if (frameIndex < frames.length - 1) {
      const nextIndex = frameIndex + 1;
      setFrameIndex(nextIndex);
      setCurrentFrame(frames[nextIndex]);
      if (frames[nextIndex].done) {
        setIsDone(true);
        setIsPlaying(false);
      }
      return;
    }
    
    // Generate next frame
    const nextFrame = generatorRef.current.next();
    
    if (!nextFrame.done && nextFrame.value) {
      const newFrames = [...frames, nextFrame.value];
      setFrames(newFrames);
      setFrameIndex(newFrames.length - 1);
      setCurrentFrame(nextFrame.value);
      
      if (nextFrame.value.done) {
        setIsDone(true);
        setIsPlaying(false);
      }
    } else {
      setIsDone(true);
      setIsPlaying(false);
    }
  }, [frameIndex, frames, isDone, initialize]);
  
  /**
   * Go to the previous step
   */
  const stepBackward = useCallback(() => {
    if (frameIndex > 0) {
      const prevIndex = frameIndex - 1;
      setFrameIndex(prevIndex);
      setCurrentFrame(frames[prevIndex]);
      setIsDone(false);
    }
  }, [frameIndex, frames]);
  
  /**
   * Start auto-play
   */
  const play = useCallback(() => {
    if (isDone) {
      reset();
      return;
    }
    
    setIsPlaying(true);
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Calculate delay based on speed
    const delay = 1000 / speed;
    
    intervalRef.current = setInterval(() => {
      stepForward();
    }, delay);
  }, [isDone, speed, stepForward]);
  
  /**
   * Pause auto-play
   */
  const pause = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  
  /**
   * Reset to beginning
   */
  const reset = useCallback(() => {
    pause();
    setFrames([]);
    setFrameIndex(-1);
    setCurrentFrame(null);
    setIsDone(false);
    generatorRef.current = null;
    initialize();
  }, [pause, initialize]);
  
  /**
   * Jump to a specific step
   */
  const jumpToStep = useCallback((stepNumber) => {
    if (stepNumber >= 0 && stepNumber < frames.length) {
      setFrameIndex(stepNumber);
      setCurrentFrame(frames[stepNumber]);
      setIsDone(frames[stepNumber].done);
    }
  }, [frames]);
  
  return {
    // State
    currentFrame,
    isPlaying,
    isDone,
    frameIndex,
    totalFrames: frames.length,
    
    // Actions
    initialize,
    stepForward,
    stepBackward,
    play,
    pause,
    reset,
    jumpToStep
  };
}
