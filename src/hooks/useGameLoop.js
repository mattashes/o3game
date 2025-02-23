import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for managing game loop
 * @param {Function} callback - Function to call each frame
 * @param {boolean} [isActive=true] - Whether the loop is active
 * @param {number} [fps=60] - Target frames per second
 */
export function useGameLoop(callback, isActive = true, fps = 60) {
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const frameInterval = 1000 / fps;

  const animate = useCallback((time) => {
    if (!isActive) return;

    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
      requestRef.current = window.requestAnimationFrame(animate);
      return;
    }

    const deltaTime = time - previousTimeRef.current;
    
    if (deltaTime >= frameInterval) {
      try {
        // Handle both async and sync callbacks
        const result = callback(deltaTime);
        if (result instanceof Promise) {
          result.catch(error => {
            console.error('Error in game loop callback:', error.message, '\n', error);
          });
        }
      } catch (error) {
        console.error('Error in game loop callback:', error.message, '\n', error);
      }
      previousTimeRef.current = time;
    }
    
    requestRef.current = window.requestAnimationFrame(animate);
  }, [callback, frameInterval, isActive]);

  useEffect(() => {
    if (!isActive) {
      if (requestRef.current) {
        window.cancelAnimationFrame(requestRef.current);
        requestRef.current = undefined;
      }
      return;
    }

    requestRef.current = window.requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        window.cancelAnimationFrame(requestRef.current);
        requestRef.current = undefined;
      }
    };
  }, [isActive, animate]);

  return null;
} 