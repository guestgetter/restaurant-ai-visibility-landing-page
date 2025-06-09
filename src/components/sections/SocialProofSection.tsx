'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AnimatedSection, StaggeredContainer, StaggeredItem } from '@/components/animations/AnimatedSection'
import { Star, Quote, TrendingUp, Users, CheckCircle } from 'lucide-react'
import CountUp from 'react-countup'

const testimonials = [
  {
    id: 1,
    name: "Maria Rodriguez",
    title: "Owner, La Cocina Authentic",
    image: "/testimonials/maria.jpg",
    rating: 5,
    text: "This AI search report was eye-opening! We discovered we weren't showing up in ChatGPT results at all. After implementing their recommendations, our online visibility increased by 40%.",
    restaurantType: "Mexican Fine Dining",
    location: "Austin, TX"
  },
  {
    id: 2,
    name: "James Chen",
    title: "Chef & Owner, Sakura Ramen House",
    image: "/testimonials/james.jpg",
    rating: 5,
    text: "AI search is the future, and these guys helped us get ahead of the curve. Our reservations from AI recommendations have tripled in just 2 months.",
    restaurantType: "Japanese Casual",
    location: "San Francisco, CA"
  },
  {
    id: 3,
    name: "Isabella Thompson",
    title: "Marketing Director, Thompson's Steakhouse",
    image: "/testimonials/isabella.jpg",
    rating: 5,
    text: "The detailed analysis showed exactly where we were losing potential customers. The recommendations were actionable and results came quickly.",
    restaurantType: "American Steakhouse",
    location: "Chicago, IL"
  }
]

const customerLogos = [
  { name: "Restaurant Group A", logo: "/logos/logo1.png" },
  { name: "Dining Co", logo: "/logos/logo2.png" },
  { name: "Food Chain B", logo: "/logos/logo3.png" },
  { name: "Bistro Partners", logo: "/logos/logo4.png" },
  { name: "Culinary Collective", logo: "/logos/logo5.png" },
  { name: "Taste Holdings", logo: "/logos/logo6.png" },
]

const stats = [
  {
    value: 100,
    label: "Free Reports Available",
    suffix: "+",
    icon: <Users className="w-8 h-8" />
  },
  {
    value: 24,
    label: "Hour Report Delivery",
    suffix: "hr",
    icon: <CheckCircle className="w-8 h-8" />
  },
  {
    value: 5,
    label: "AI Platforms Analyzed",
    suffix: "",
    icon: <TrendingUp className="w-8 h-8" />
  }
]

export function SocialProofSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="section-padding bg-neutral-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20" />
      </div>

      <div className="container-custom relative z-10">
        {/* Stats Section */}
        <AnimatedSection className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Professional AI Search Analysis</span>
          </h2>
          <p className="text-xl text-neutral-300 mb-12 max-w-3xl mx-auto">
            Get comprehensive insights into your restaurant's AI visibility
          </p>

          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <StaggeredItem key={index}>
                <motion.div 
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-primary-400 mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold mb-2">
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                      enableScrollSpy
                    />
                  </div>
                  <p className="text-neutral-300">{stat.label}</p>
                </motion.div>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </AnimatedSection>

        {/* Industry Context */}
        <AnimatedSection className="mb-20">
          <p className="text-center text-neutral-400 mb-8">Built by restaurant industry experts</p>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-2xl mx-auto text-center">
            <p className="text-neutral-300 mb-4">
              Our methodology is based on extensive analysis of AI search patterns and restaurant visibility factors across major platforms.
            </p>
            <p className="text-sm text-neutral-400">
              🎯 Comprehensive analysis • ⚡ Fast delivery • 📊 Actionable insights
            </p>
          </div>
        </AnimatedSection>

        {/* Competitor Insights Instead of Testimonials */}
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">
              See How Your Competitors Are Winning
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">😰</span>
                  <h4 className="text-xl font-bold">Restaurants Missing Out</h4>
                </div>
                <ul className="space-y-3 text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">❌</span>
                    <span>AI describes them as "a restaurant" with no unique features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">❌</span>
                    <span>Competitors appear first in AI recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">❌</span>
                    <span>Lost 23% of potential discovery traffic</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🚀</span>
                  <h4 className="text-xl font-bold">AI-Optimized Restaurants</h4>
                </div>
                <ul className="space-y-3 text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✅</span>
                    <span>AI mentions their signature dishes and atmosphere</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✅</span>
                    <span>Appear in top 3 recommendations consistently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✅</span>
                    <span>Increased walk-ins by 40% in 3 months</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-lg text-neutral-300 mb-4">
                Your report will show you exactly where you stand vs. your local competition
              </p>
              <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-amber-300 font-semibold">⚡ Quick Action Wins Big</p>
                <p className="text-sm text-neutral-300">The restaurants moving fast are claiming the top AI spots in their markets</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Enhanced Scarcity */}
        <AnimatedSection className="text-center mt-20">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-xl p-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-red-400 font-semibold">Only 23 Spots Left</span>
              </div>
              <p className="text-xl font-bold mb-1">
                Free Analysis Slots Filling Fast
              </p>
              <p className="text-neutral-400 text-sm">
                77 restaurants have already secured their free report
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-400/20 border border-amber-400/30 rounded-xl p-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                <span className="text-amber-400 font-semibold">Your Local Market</span>
              </div>
              <p className="text-xl font-bold mb-1">
                3 competitors already analyzed
              </p>
              <p className="text-neutral-400 text-sm">
                Don't let them get ahead in AI search
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
} 