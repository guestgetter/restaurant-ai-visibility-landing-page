'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { restaurantFormSchema, type RestaurantFormData } from '@/lib/validations'
import { ChevronLeft, ChevronRight, Check, MapPin, Building, Target, MessageSquare } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Basic Information',
    description: 'Tell us about your restaurant',
    icon: <Building className="w-6 h-6" />,
    fields: ['restaurantName', 'ownerName', 'email', 'phone']
  },
  {
    id: 2,
    title: 'Location Details',
    description: 'Where is your restaurant located?',
    icon: <MapPin className="w-6 h-6" />,
    fields: ['address', 'city', 'state', 'zipCode']
  },
  {
    id: 3,
    title: 'Restaurant Details',
    description: 'Help us understand your business',
    icon: <Target className="w-6 h-6" />,
    fields: ['website', 'restaurantType', 'cuisineType', 'yearsInBusiness', 'averageTicket']
  },
  {
    id: 4,
    title: 'Challenges & Goals',
    description: 'What can we help you with?',
    icon: <MessageSquare className="w-6 h-6" />,
    fields: ['currentChallenges', 'hearAboutUs', 'additionalNotes']
  },
  {
    id: 5,
    title: 'Final Details',
    description: 'Almost done!',
    icon: <Check className="w-6 h-6" />,
    fields: ['marketingConsent', 'termsAccepted']
  }
]

const restaurantTypes = [
  { value: 'fine-dining', label: 'Fine Dining' },
  { value: 'casual-dining', label: 'Casual Dining' },
  { value: 'fast-casual', label: 'Fast Casual' },
  { value: 'fast-food', label: 'Fast Food' },
  { value: 'cafe', label: 'Café' },
  { value: 'bakery', label: 'Bakery' },
  { value: 'bar', label: 'Bar/Pub' },
  { value: 'food-truck', label: 'Food Truck' },
  { value: 'catering', label: 'Catering' },
  { value: 'other', label: 'Other' }
]

const averageTicketOptions = [
  { value: 'under-15', label: 'Under $15' },
  { value: '15-30', label: '$15 - $30' },
  { value: '30-50', label: '$30 - $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: 'over-100', label: 'Over $100' }
]

const challengeOptions = [
  'Low online visibility',
  'Inconsistent online reviews',
  'Poor social media presence',
  'Outdated website',
  'Limited digital marketing',
  'Competitor dominance',
  'Seasonal fluctuations',
  'Staff recruitment',
  'Food cost management',
  'Customer retention'
]

const hearAboutOptions = [
  { value: 'google', label: 'Google Search' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'referral', label: 'Referral' },
  { value: 'industry-publication', label: 'Industry Publication' },
  { value: 'conference', label: 'Conference/Event' },
  { value: 'other', label: 'Other' }
]

export function RestaurantForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([])
  const [utmParams, setUtmParams] = useState<Record<string, string>>({})

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    watch,
    setValue,
    getValues
  } = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantFormSchema),
    mode: 'onChange',
    defaultValues: {
      currentChallenges: [],
      marketingConsent: false,
      termsAccepted: false
    }
  })

  // Capture UTM parameters on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const utmData: Record<string, string> = {}
      
      // Capture standard UTM parameters
      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      utmKeys.forEach(key => {
        const value = urlParams.get(key)
        if (value) {
          utmData[key] = value
        }
      })
      
      // Also capture referrer and landing page
      utmData.referrer = document.referrer || 'direct'
      utmData.landing_page = window.location.href
      
      setUtmParams(utmData)
      console.log('UTM Parameters captured:', utmData)
    }
  }, [])

  const onSubmit = async (data: RestaurantFormData) => {
    setIsSubmitting(true)
    try {
      console.log('Submitting lead for:', data.restaurantName)
      
      // Prepare data for GoHighLevel including UTM parameters
      const leadData = {
        firstName: data.ownerName.split(' ')[0] || data.ownerName,
        lastName: data.ownerName.split(' ').slice(1).join(' ') || '',
        email: data.email,
        phone: data.phone,
        restaurantName: data.restaurantName,
        restaurantType: data.cuisineType,
        location: `${data.city}, ${data.state}`,
        website: data.website,
        marketingGoals: data.currentChallenges,
        utmParams: utmParams // Include UTM tracking data
      }

      // Submit to GoHighLevel
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData)
      })

      if (!response.ok) {
        throw new Error('Lead submission failed')
      }

      const result = await response.json()
      console.log('Lead submitted successfully:', result)
      
      // Show thank you state
      setIsSubmitted(true)
      
    } catch (error) {
      console.error('Error submitting lead:', error)
      alert('❌ Submission failed. Please try again or contact support.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = async () => {
    const currentStepFields = steps[currentStep - 1].fields
    const isStepValid = await trigger(currentStepFields as any)
    
    if (isStepValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleChallenge = (challenge: string) => {
    const newChallenges = selectedChallenges.includes(challenge)
      ? selectedChallenges.filter(c => c !== challenge)
      : [...selectedChallenges, challenge]
    
    setSelectedChallenges(newChallenges)
    setValue('currentChallenges', newChallenges)
  }

  const progress = (currentStep / steps.length) * 100

  // Show thank you message if submitted
  if (isSubmitted) {
    return (
      <section id="form" className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-12 text-center"
            >
              <div className="mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                  🎉 Thank You!
                </h2>
                <p className="text-xl text-neutral-600 mb-8">
                  Your restaurant AI search analysis request has been submitted successfully.
                </p>
              </div>

              <div className="bg-primary-50 rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-primary-900 mb-4">
                  What happens next?
                </h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">Due Diligence Review</h4>
                      <p className="text-neutral-600">Our team will conduct a thorough analysis of your restaurant's AI search presence across ChatGPT, Google AI, and Perplexity.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">Detailed Report Generation</h4>
                      <p className="text-neutral-600">You'll receive a comprehensive PDF report with your visibility score, competitor analysis, and actionable recommendations.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">Report Delivery</h4>
                      <p className="text-neutral-600">Your personalized AI search report will be delivered to your email within <strong>24-48 hours</strong>.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
                    <span className="text-yellow-800 font-bold text-sm">!</span>
                  </div>
                  <h4 className="font-semibold text-yellow-800">Free for First 100 Restaurants</h4>
                </div>
                <p className="text-yellow-700 text-sm">
                  You're part of our launch program! This comprehensive analysis is completely free with no obligation.
                </p>
              </div>

              <p className="text-neutral-500 text-sm">
                Questions? Reply to our confirmation email or contact us directly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="form" className="section-padding bg-neutral-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              🚀 Get Your Free AI Search Snapshot
            </h2>
            <p className="text-xl text-neutral-600">
              Free for the first 100 restaurants – delivered in 24 hours.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full text-sm font-semibold mb-2 transition-all duration-300 ${
                      currentStep >= step.id
                        ? 'bg-primary-500 text-white shadow-glow'
                        : 'bg-neutral-200 text-neutral-400'
                    }`}
                  >
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : step.icon}
                  </div>
                  <span className="text-xs text-neutral-500 text-center max-w-20">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <motion.div
                className="bg-primary-gradient h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    {steps[currentStep - 1].title}
                  </h3>
                  <p className="text-neutral-600">
                    {steps[currentStep - 1].description}
                  </p>
                </div>

                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Restaurant Name *
                        </label>
                        <input
                          {...register('restaurantName')}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          placeholder="e.g., Mario's Italian Kitchen"
                        />
                        {errors.restaurantName && (
                          <p className="text-red-500 text-sm mt-1">{errors.restaurantName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Owner Name *
                        </label>
                        <input
                          {...register('ownerName')}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          placeholder="e.g., Mario Rossi"
                        />
                        {errors.ownerName && (
                          <p className="text-red-500 text-sm mt-1">{errors.ownerName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          placeholder="mario@mariositalian.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          placeholder="(555) 123-4567"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Location */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        {...register('address')}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="123 Main Street"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          City *
                        </label>
                        <input
                          {...register('city')}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          placeholder="New York"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          State *
                        </label>
                        <input
                          {...register('state')}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          placeholder="NY"
                        />
                        {errors.state && (
                          <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          {...register('zipCode')}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          placeholder="10001"
                        />
                        {errors.zipCode && (
                          <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Restaurant Details */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Website (Optional)
                      </label>
                      <input
                        {...register('website')}
                        type="url"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="https://www.mariositalian.com"
                      />
                      {errors.website && (
                        <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Restaurant Type *
                        </label>
                        <select
                          {...register('restaurantType')}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select restaurant type</option>
                          {restaurantTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                        {errors.restaurantType && (
                          <p className="text-red-500 text-sm mt-1">{errors.restaurantType.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Cuisine Type *
                        </label>
                        <input
                          {...register('cuisineType')}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          placeholder="e.g., Italian, Mexican, Asian Fusion"
                        />
                        {errors.cuisineType && (
                          <p className="text-red-500 text-sm mt-1">{errors.cuisineType.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Years in Business *
                        </label>
                        <input
                          {...register('yearsInBusiness', { valueAsNumber: true })}
                          type="number"
                          min="0"
                          max="100"
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          placeholder="5"
                        />
                        {errors.yearsInBusiness && (
                          <p className="text-red-500 text-sm mt-1">{errors.yearsInBusiness.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Average Ticket Price *
                        </label>
                        <select
                          {...register('averageTicket')}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select price range</option>
                          {averageTicketOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.averageTicket && (
                          <p className="text-red-500 text-sm mt-1">{errors.averageTicket.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Challenges & Goals */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-4">
                        Current Challenges (Select all that apply) *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {challengeOptions.map((challenge) => (
                          <button
                            key={challenge}
                            type="button"
                            onClick={() => toggleChallenge(challenge)}
                            className={`p-3 text-left border rounded-lg transition-all duration-200 ${
                              selectedChallenges.includes(challenge)
                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                : 'border-neutral-300 hover:border-neutral-400'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                selectedChallenges.includes(challenge)
                                  ? 'border-primary-500 bg-primary-500'
                                  : 'border-neutral-300'
                              }`}>
                                {selectedChallenges.includes(challenge) && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <span className="text-sm">{challenge}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                      {errors.currentChallenges && (
                        <p className="text-red-500 text-sm mt-2">{errors.currentChallenges.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        How did you hear about us? *
                      </label>
                      <select
                        {...register('hearAboutUs')}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Please select</option>
                        {hearAboutOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.hearAboutUs && (
                        <p className="text-red-500 text-sm mt-1">{errors.hearAboutUs.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        {...register('additionalNotes')}
                        rows={4}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Tell us more about your goals, specific challenges, or questions..."
                      />
                      {errors.additionalNotes && (
                        <p className="text-red-500 text-sm mt-1">{errors.additionalNotes.message}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 5: Final Details */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="bg-neutral-50 rounded-lg p-6">
                      <h4 className="font-semibold text-neutral-900 mb-4">
                        📋 Review Your Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-neutral-600">Restaurant:</span>
                          <span className="ml-2 font-medium">{watch('restaurantName') || 'Not provided'}</span>
                        </div>
                        <div>
                          <span className="text-neutral-600">Type:</span>
                          <span className="ml-2 font-medium">{watch('restaurantType') || 'Not provided'}</span>
                        </div>
                        <div>
                          <span className="text-neutral-600">Location:</span>
                          <span className="ml-2 font-medium">
                            {watch('city') && watch('state') ? `${watch('city')}, ${watch('state')}` : 'Not provided'}
                          </span>
                        </div>
                        <div>
                          <span className="text-neutral-600">Email:</span>
                          <span className="ml-2 font-medium">{watch('email') || 'Not provided'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-start gap-3">
                        <input
                          {...register('marketingConsent')}
                          type="checkbox"
                          className="mt-1 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-neutral-700">
                          I agree to receive marketing communications about AI search optimization tips and industry insights. You can unsubscribe at any time.
                        </span>
                      </label>
                      {errors.marketingConsent && (
                        <p className="text-red-500 text-sm">{errors.marketingConsent.message}</p>
                      )}

                      <label className="flex items-start gap-3">
                        <input
                          {...register('termsAccepted')}
                          type="checkbox"
                          className="mt-1 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-neutral-700">
                          I accept the <a href="/terms" className="text-primary-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a> *
                        </span>
                      </label>
                      {errors.termsAccepted && (
                        <p className="text-red-500 text-sm">{errors.termsAccepted.message}</p>
                      )}
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-800">
                        <Check className="w-5 h-5" />
                        <span className="font-medium">What happens next?</span>
                      </div>
                      <ul className="mt-2 text-sm text-green-700 space-y-1">
                        <li>• We'll analyze your restaurant's AI search presence across ChatGPT, Google AI, and Perplexity</li>
                        <li>• You'll receive a detailed report within 24 hours</li>
                        <li>• The report includes your visibility score, competitor analysis, and improvement recommendations</li>
                        <li>• 100% free with no obligation</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 px-6 py-3 text-neutral-600 bg-neutral-100 rounded-lg hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>

                  {currentStep === steps.length ? (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 btn-primary disabled:opacity-50 min-w-[200px] justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Get My Free Report
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 btn-primary"
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  )
} 