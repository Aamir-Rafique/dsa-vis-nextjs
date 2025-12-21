/**
 * ANIMATION HELPERS
 * Simple wrapper functions for GSAP animations
 * Makes it easy to animate elements in our visualizations
 */

/**
 * Animate an element's color change
 * @param {string} selector - CSS selector for the element
 * @param {string} color - New color to animate to
 * @param {number} duration - How long the animation takes (in seconds)
 */
export function animateColor(selector, color, duration = 0.3) {
  if (typeof window === 'undefined' || !window.gsap) return;
  
  window.gsap.to(selector, {
    backgroundColor: color,
    duration,
    ease: 'power2.inOut'
  });
}

/**
 * Animate an element's height (for bar charts)
 * @param {string} selector - CSS selector for the element
 * @param {number} height - New height in pixels
 * @param {number} duration - How long the animation takes (in seconds)
 */
export function animateHeight(selector, height, duration = 0.5) {
  if (typeof window === 'undefined' || !window.gsap) return;
  
  window.gsap.to(selector, {
    height: `${height}px`,
    duration,
    ease: 'power2.inOut'
  });
}

/**
 * Animate an element's position (for swapping)
 * @param {string} selector - CSS selector for the element
 * @param {number} x - New X position
 * @param {number} y - New Y position
 * @param {number} duration - How long the animation takes (in seconds)
 */
export function animatePosition(selector, x, y, duration = 0.5) {
  if (typeof window === 'undefined' || !window.gsap) return;
  
  window.gsap.to(selector, {
    x,
    y,
    duration,
    ease: 'power2.inOut'
  });
}

/**
 * Pulse animation (for highlighting)
 * @param {string} selector - CSS selector for the element
 */
export function animatePulse(selector) {
  if (typeof window === 'undefined' || !window.gsap) return;
  
  window.gsap.to(selector, {
    scale: 1.2,
    duration: 0.3,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut'
  });
}

/**
 * Fade in animation
 * @param {string} selector - CSS selector for the element
 * @param {number} duration - How long the animation takes (in seconds)
 */
export function animateFadeIn(selector, duration = 0.5) {
  if (typeof window === 'undefined' || !window.gsap) return;
  
  window.gsap.fromTo(selector, 
    { opacity: 0 },
    { opacity: 1, duration, ease: 'power2.inOut' }
  );
}

/**
 * Swap two elements with animation
 * @param {string} selector1 - CSS selector for first element
 * @param {string} selector2 - CSS selector for second element
 * @param {number} duration - How long the animation takes (in seconds)
 */
export function animateSwap(selector1, selector2, duration = 0.6) {
  if (typeof window === 'undefined' || !window.gsap) return;
  
  const el1 = document.querySelector(selector1);
  const el2 = document.querySelector(selector2);
  
  if (!el1 || !el2) return;
  
  const pos1 = el1.getBoundingClientRect();
  const pos2 = el2.getBoundingClientRect();
  
  const diffX = pos2.left - pos1.left;
  
  // Move both elements
  window.gsap.to(el1, {
    x: diffX,
    duration,
    ease: 'power2.inOut'
  });
  
  window.gsap.to(el2, {
    x: -diffX,
    duration,
    ease: 'power2.inOut'
  });
}

/**
 * Reset all animations on an element
 * @param {string} selector - CSS selector for the element
 */
export function resetAnimations(selector) {
  if (typeof window === 'undefined' || !window.gsap) return;
  
  window.gsap.set(selector, {
    clearProps: 'all'
  });
}

/**
 * Get animation duration based on speed setting
 * @param {number} speed - Speed multiplier (0.5 = slow, 1 = normal, 2 = fast)
 * @returns {number} Duration in seconds
 */
export function getDuration(speed = 1) {
  const baseDuration = 0.5; // Base duration in seconds
  return baseDuration / speed;
}
