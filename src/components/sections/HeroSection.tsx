'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { ParticleBackground, RestaurantFloatingElements } from '@/components/ui/ParticleBackground'
import { CountdownTimer } from '@/components/ui/CountdownTimer'

export function HeroSection() {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -300])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // Set deadline to 7 days from now
  const deadline = new Date()
  deadline.setDate(deadline.getDate() + 7)

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 pt-20 pb-20">
      {/* Background Elements */}
      <ParticleBackground />
      <RestaurantFloatingElements />
      
      {/* Parallax Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
      />

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white px-4 py-12">
        {/* Centered Brand Logo */}
        <AnimatedSection direction="fade" duration={0.6}>
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img 
                src="/guest-getter-logo.png" 
                alt="Guest Getter" 
                className="h-12 w-auto filter brightness-0 invert opacity-90"
              />
              <div className="text-white/60 text-sm">
                Restaurant AI Visibility Report
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="down" duration={0.8} delay={0.3}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-gradient">See How Your</span>
            <span className="block">Restaurant Shows Up</span>
            <span className="block text-gradient">in AI Search</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.6} duration={0.8}>
          <p className="text-lg md:text-xl text-neutral-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get a fast, free report showing exactly how your restaurant appears across 
            <span className="text-primary-400 font-semibold"> ChatGPT, Google AI Overviews, and Perplexity</span>
          </p>
        </AnimatedSection>

        {/* Countdown Timer - Better positioned */}
        <AnimatedSection direction="scale" delay={0.8}>
          <div className="mb-8">
            <CountdownTimer 
              targetDate={deadline}
              title="🚀 Free comprehensive analysis"
              subtitle="Limited time offer ends in:"
              className="max-w-2xl mx-auto bg-gradient-to-r from-red-500/90 to-red-600/90 backdrop-blur-sm"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection direction="scale" delay={0.9}>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-gradient">
              📊 You'll get:
            </h2>
            <ul className="text-left space-y-3 text-base md:text-lg">
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                Your AI search visibility score across 5 platforms
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                Analysis of how you're being described by AI
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                Competitive analysis of your local market
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                Actionable recommendations for improvement
              </li>
            </ul>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="scale" delay={1.2}>
          <motion.a
            href="#form"
            className="inline-block bg-primary-gradient text-white text-lg md:text-xl font-bold py-4 px-8 md:px-12 rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300 mb-6"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            Get My Free AI Search Report →
          </motion.a>
        </AnimatedSection>

        {/* Unique Guarantee */}
        <AnimatedSection direction="up" delay={1.3}>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 max-w-2xl mx-auto mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-2xl">🛡️</span>
              <h3 className="text-lg font-bold">The "AI Visibility Promise"</h3>
            </div>
            <p className="text-center text-neutral-200">
              If your report doesn't reveal at least 3 specific opportunities to improve your AI search presence, 
              we'll personally help you optimize your first listing for <strong>free</strong>.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={1.4}>
          <div className="p-4 md:p-6 bg-primary-600/20 backdrop-blur-sm rounded-xl border border-primary-500/30 max-w-2xl mx-auto">
            <p className="text-base md:text-lg text-primary-200 mb-2">
              🧠 <strong>"37% of buyers now ask AI before Google."</strong>
            </p>
            <p className="text-primary-300">– Salesforce, 2024</p>
          </div>
        </AnimatedSection>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  )
} 