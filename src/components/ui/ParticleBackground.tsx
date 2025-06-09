'use client'

import { useEffect, useState } from 'react'
import { generateParticles } from '@/lib/utils'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(generateParticles(20))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary-500/10 animate-particle-float"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary-400/20 rounded-full animate-float" />
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-primary-500/20 rotate-45 animate-float animate-delay-400" />
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-primary-600/20 rounded-full animate-float animate-delay-800" />
      <div className="absolute top-2/3 right-1/3 w-5 h-5 bg-primary-400/20 rotate-12 animate-float animate-delay-600" />
      
      {/* AI-themed icons */}
      <div className="absolute top-1/6 right-1/6 text-2xl text-primary-500/20 animate-float animate-delay-200">
        🤖
      </div>
      <div className="absolute bottom-1/6 left-1/6 text-xl text-primary-500/20 animate-float animate-delay-1000">
        🧠
      </div>
      <div className="absolute top-1/2 left-1/8 text-lg text-primary-500/20 animate-float animate-delay-600">
        ⚡
      </div>
    </div>
  )
}

export function RestaurantFloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Restaurant-themed elements - more subtle and better positioned */}
      <div className="absolute top-1/6 right-1/5 text-2xl text-primary-500/10 animate-float animate-delay-200">
        🍽️
      </div>
      <div className="absolute top-3/4 left-1/6 text-xl text-primary-500/10 animate-float animate-delay-600">
        👨‍🍳
      </div>
      <div className="absolute bottom-1/5 right-1/4 text-lg text-primary-500/10 animate-float animate-delay-800">
        🍕
      </div>
      <div className="absolute bottom-1/6 right-1/8 text-sm text-primary-500/8 animate-float animate-delay-1000">
        📱
      </div>
    </div>
  )
} 