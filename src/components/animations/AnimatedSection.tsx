'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
  duration?: number
  staggerChildren?: number
}

const animations = {
  up: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  },
  down: {
    initial: { opacity: 0, y: -60 },
    animate: { opacity: 1, y: 0 },
  },
  left: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
  },
  right: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  staggerChildren,
}: AnimatedSectionProps) {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true })

  const animation = animations[direction]

  return (
    <motion.section
      ref={ref as any}
      className={cn(className)}
      initial={animation.initial}
      animate={isInView ? animation.animate : animation.initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren,
      }}
    >
      {children}
    </motion.section>
  )
}

export function AnimatedDiv({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.6,
}: Omit<AnimatedSectionProps, 'staggerChildren'>) {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true })

  const animation = animations[direction]

  return (
    <motion.div
      ref={ref as any}
      className={cn(className)}
      initial={animation.initial}
      animate={isInView ? animation.animate : animation.initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredContainer({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}) {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref as any}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
} 