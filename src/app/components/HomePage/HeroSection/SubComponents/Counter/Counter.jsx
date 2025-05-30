'use client'

import React, { useState, useEffect } from 'react'

// Counter component to animate from 'from' to 'to' value
const Counter = ({ from, to, duration = 2 }) => {
  // State for current count and animation status
  const [count, setCount] = useState(from)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Animation effect
  useEffect(() => {
    // Skip if animation has already run
    if (hasAnimated) return

    let startTime = null
    let animationFrame = null

    // Animation function using requestAnimationFrame
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 2000), 1)

      const newCount = Math.floor(from + progress * (to - from))
      setCount(newCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(to) // Ensure exact final value
        setHasAnimated(true) // Mark animation as complete
      }
    }

    animationFrame = requestAnimationFrame(animate)

    // Cleanup to prevent memory leaks
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [from, to, duration]) // Dependencies: re-run only if props change

  return <span>{count}</span>
}

export default Counter