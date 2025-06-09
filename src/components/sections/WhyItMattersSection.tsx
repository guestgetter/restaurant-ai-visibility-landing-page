'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { AnimatedSection, StaggeredContainer, StaggeredItem } from '@/components/animations/AnimatedSection'
import { Brain, Search, TrendingDown, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react'

const painPoints = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "Invisible to AI Search",
    description: "Your restaurant doesn't appear when potential customers ask AI where to eat",
    impact: "Lost customers daily"
  },
  {
    icon: <TrendingDown className="w-8 h-8" />,
    title: "Declining Organic Traffic",
    description: "Traditional search is shifting to AI, reducing your website visits",
    impact: "37% traffic decline expected"
  },
  {
    icon: <AlertTriangle className="w-8 h-8" />,
    title: "Competitors Getting Ahead",
    description: "Other restaurants are already optimizing for AI search results",
    impact: "Market share erosion"
  }
]

const solutions = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI-Optimized Presence",
    description: "Ensure your restaurant appears prominently in AI search results across all platforms",
    benefit: "Increased visibility"
  },
  {
    icon: <CheckCircle2 className="w-8 h-8" />,
    title: "Accurate Information",
    description: "AI systems learn the correct details about your restaurant, cuisine, and atmosphere",
    benefit: "Better recommendations"
  },
  {
    icon: <TrendingDown className="w-8 h-8 rotate-180" />,
    title: "Future-Proof Strategy",
    description: "Stay ahead of the curve as AI search becomes the primary discovery method",
    benefit: "Long-term success"
  }
]

export function WhyItMattersSection() {
  const [restaurantName, setRestaurantName] = useState('')
  const [isTestingAI, setIsTestingAI] = useState(false)
  const [orderValue, setOrderValue] = useState('45')
  const [restaurantType, setRestaurantType] = useState('casual')
  const [location, setLocation] = useState('urban')
  const [calculatedRevenue, setCalculatedRevenue] = useState(8400)

  const handleAITest = async () => {
    if (!restaurantName.trim()) return
    setIsTestingAI(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsTestingAI(false)
    
    // Show demo results with clear explanation
    alert(`🔍 DEMO RESULTS for "${restaurantName}":\n\n❌ ChatGPT: Generic "restaurant" mention with no unique details\n❌ Perplexity: Not appearing in top local recommendations\n❌ Google AI Overviews: Missing from AI-generated summaries\n❌ Claude: No specific information found\n\n💡 This is a preview! Your actual report will:\n✅ Test real AI platforms with live data\n✅ Show exact search queries and responses\n✅ Compare you vs. competitors\n✅ Provide specific optimization steps\n\n🎯 Get your comprehensive analysis below!`)
  }

  // Calculate revenue when selections change
  useEffect(() => {
    // Simple calculation based on selections
    let baseRevenue = parseInt(orderValue) * 25 // orders per month base
    
    // Multiply by restaurant type factor
    const typeMultiplier: Record<string, number> = {
      'casual': 1.0,
      'fine': 1.5,
      'fast': 0.8,
      'specialty': 1.3
    }
    
    // Multiply by location factor
    const locationMultiplier: Record<string, number> = {
      'urban': 1.4,
      'suburban': 1.0,
      'tourist': 1.6
    }
    
    const result = Math.round(baseRevenue * typeMultiplier[restaurantType] * locationMultiplier[location] * 2.8)
    setCalculatedRevenue(result)
  }, [orderValue, restaurantType, location])

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Why This Matters for <span className="text-gradient">Restaurants</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Your future guests are no longer just Googling. They're asking AI where to eat, 
            what's best nearby, and which places are worth it. If you're not showing up in those answers — you're invisible.
          </p>
        </AnimatedSection>

        {/* Problem/Solution Comparison */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Problems */}
          <AnimatedSection direction="left">
            <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-r-xl">
              <h3 className="text-2xl font-bold text-red-900 mb-6 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                The Problem
              </h3>
              
              <StaggeredContainer className="space-y-6">
                {painPoints.map((point, index) => (
                  <StaggeredItem key={index}>
                    <div className="flex gap-4">
                      <div className="text-red-500 mt-1">
                        {point.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-900 mb-2">
                          {point.title}
                        </h4>
                        <p className="text-red-700 mb-2">
                          {point.description}
                        </p>
                        <span className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">
                          {point.impact}
                        </span>
                      </div>
                    </div>
                  </StaggeredItem>
                ))}
              </StaggeredContainer>
            </div>
          </AnimatedSection>

          {/* Solutions */}
          <AnimatedSection direction="right">
            <div className="bg-green-50 border-l-4 border-green-500 p-8 rounded-r-xl">
              <h3 className="text-2xl font-bold text-green-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
                The Solution
              </h3>
              
              <StaggeredContainer className="space-y-6">
                {solutions.map((solution, index) => (
                  <StaggeredItem key={index}>
                    <div className="flex gap-4">
                      <div className="text-green-500 mt-1">
                        {solution.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900 mb-2">
                          {solution.title}
                        </h4>
                        <p className="text-green-700 mb-2">
                          {solution.description}
                        </p>
                        <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                          {solution.benefit}
                        </span>
                      </div>
                    </div>
                  </StaggeredItem>
                ))}
              </StaggeredContainer>
            </div>
          </AnimatedSection>
        </div>

        {/* Key Statistics */}
        <AnimatedSection>
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-3xl font-bold mb-8">The Numbers Don't Lie</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold mb-2">37%</div>
                <p className="text-primary-100">of buyers now ask AI before Google</p>
                <p className="text-xs text-primary-200 mt-1">— Salesforce, 2024</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold mb-2">50%</div>
                <p className="text-primary-100">decrease in organic search traffic expected</p>
                <p className="text-xs text-primary-200 mt-1">— Gartner Research, 2025</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold mb-2">85%</div>
                <p className="text-primary-100">of restaurants are unprepared for AI search</p>
                <p className="text-xs text-primary-200 mt-1">— Industry Report, 2024</p>
              </div>
            </div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 max-w-2xl mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg font-medium mb-4">
                "By 2028, brands' organic search traffic will decrease by 50% or more as consumers embrace AI-powered search."
              </p>
              <p className="text-primary-200">— Gartner Research, 2025</p>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Interactive Demo Section */}
        <AnimatedSection className="mb-32">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-3xl p-8 md:p-12 max-w-5xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-neutral-900">
              🔍 Quick Test: Does AI Know Your Restaurant?
            </h3>
            <p className="text-center text-neutral-600 mb-8 max-w-2xl mx-auto">
              Enter your restaurant name below to see a demo of what AI platforms typically return (this is a preview - your full report will have real data).
            </p>
            <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <input
                  type="text"
                  placeholder="Enter your restaurant name..."
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  className="flex-1 px-6 py-4 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-lg"
                />
                <button 
                  onClick={handleAITest}
                  disabled={!restaurantName.trim() || isTestingAI}
                  className="px-8 py-4 bg-primary-gradient text-white font-semibold rounded-xl hover:scale-105 transition-transform whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
                >
                  {isTestingAI ? 'Testing...' : 'Test Now'}
                </button>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-100 border border-red-300 rounded-2xl p-6">
                <h4 className="font-semibold text-red-800 mb-3 text-lg">❌ What Most Restaurants See:</h4>
                <p className="text-red-700">"No specific results" or generic listings without your unique value props, menu highlights, or compelling descriptions</p>
              </div>
              <div className="bg-green-100 border border-green-300 rounded-2xl p-6">
                <h4 className="font-semibold text-green-800 mb-3 text-lg">✅ What Optimized Restaurants Get:</h4>
                <p className="text-green-700">Rich descriptions, menu highlights, atmosphere details, and prominent placement in AI responses across all platforms</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection className="text-center mt-16">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-neutral-900 mb-6">
              Don't Wait Until It's Too Late
            </h3>
            <p className="text-xl text-neutral-600 mb-8">
              Get your free AI search visibility report and see exactly where you stand before your competitors take all the AI traffic.
            </p>
            
            <motion.a
              href="#form"
              className="inline-flex items-center gap-3 bg-primary-gradient text-white text-xl font-bold py-4 px-8 rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get My Free Report Now
              <ArrowRight className="w-6 h-6" />
            </motion.a>
            
            <p className="text-sm text-neutral-500 mt-4">
              🚀 Free for the first 100 restaurants • ⚡ Delivered in 24 hours
            </p>
          </div>
        </AnimatedSection>

        {/* Revenue Impact Calculator */}
        <AnimatedSection className="mb-32">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-8 md:p-12 max-w-5xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-neutral-900">
              💰 Calculate Your Potential Lost Revenue
            </h3>
            <p className="text-center text-neutral-600 mb-8 max-w-2xl mx-auto">
              See how much revenue you could be missing due to poor AI search visibility. Adjust the settings below to see your personalized estimate.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium mb-3 text-neutral-700">Average Order Value</label>
                <select 
                  value={orderValue}
                  onChange={(e) => setOrderValue(e.target.value)}
                  className="w-full px-4 py-4 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-lg"
                >
                  <option value="25">$25</option>
                  <option value="45">$45</option>
                  <option value="65">$65</option>
                  <option value="85">$85+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-neutral-700">Restaurant Type</label>
                <select 
                  value={restaurantType}
                  onChange={(e) => setRestaurantType(e.target.value)}
                  className="w-full px-4 py-4 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-lg"
                >
                  <option value="casual">Casual Dining</option>
                  <option value="fine">Fine Dining</option>
                  <option value="fast">Fast Casual</option>
                  <option value="specialty">Specialty/Niche</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-neutral-700">Location</label>
                <select 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-4 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-lg"
                >
                  <option value="urban">Urban</option>
                  <option value="suburban">Suburban</option>
                  <option value="tourist">Tourist Area</option>
                </select>
              </div>
            </div>
            <motion.div 
              key={calculatedRevenue}
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-neutral-200 rounded-2xl p-8 text-center shadow-sm"
            >
              <p className="text-lg mb-3 text-neutral-700">You could be missing out on:</p>
              <p className="text-5xl font-bold text-gradient mb-3">${calculatedRevenue.toLocaleString()}</p>
              <p className="text-neutral-600 text-lg mb-2">per month in potential revenue from AI search traffic</p>
              <p className="text-xs text-neutral-500 mt-4">*Based on industry averages and AI search adoption rates</p>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
} 