'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { calculateTimeLeft } from '@/lib/utils'

interface CountdownTimerProps {
  targetDate: Date
  title?: string
  subtitle?: string
  className?: string
}

export function CountdownTimer({ 
  targetDate, 
  title = "Limited Time Offer", 
  subtitle = "Don't miss out!",
  className = ""
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <motion.div
      className={`bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-red-100 mb-4">{subtitle}</p>
        
        <div className="flex justify-center gap-4">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[70px]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <motion.div
                className="text-2xl font-bold"
                key={unit.value}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {unit.value.toString().padStart(2, '0')}
              </motion.div>
              <div className="text-xs text-red-100 mt-1">{unit.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function UrgencyBanner() {
  // Set deadline to 7 days from now
  const deadline = new Date()
  deadline.setDate(deadline.getDate() + 7)

  return (
    <div className="bg-red-600 text-white py-2 px-4 text-center">
      <div className="flex items-center justify-center gap-2 text-sm">
        <span className="animate-pulse">🔥</span>
        <span className="font-semibold">Limited Time:</span>
        <span>Free AI Search Report for the first 100 restaurants only!</span>
        <CountdownTimer 
          targetDate={deadline}
          title=""
          subtitle=""
          className="ml-4 bg-transparent p-0 shadow-none"
        />
      </div>
    </div>
  )
} 