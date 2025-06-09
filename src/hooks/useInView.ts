'use client'

import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number | number[]
  rootMargin?: string
  triggerOnce?: boolean
}

export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options
  const [isInView, setIsInView] = useState(false)
  const [hasBeenViewed, setHasBeenViewed] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        setIsInView(inView)
        
        if (inView && !hasBeenViewed) {
          setHasBeenViewed(true)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, hasBeenViewed])

  return {
    ref,
    isInView: triggerOnce ? hasBeenViewed : isInView,
    hasBeenViewed,
  }
} 