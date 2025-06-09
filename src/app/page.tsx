'use client'

import { HeroSection } from '@/components/sections/HeroSection'
import { WhyItMattersSection } from '@/components/sections/WhyItMattersSection'
import { SocialProofSection } from '@/components/sections/SocialProofSection'
import { RestaurantForm } from '@/components/forms/RestaurantForm'
import { FloatingActionButton } from '@/components/ui/FloatingActionButton'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <WhyItMattersSection />
      <SocialProofSection />
      <RestaurantForm />
      <FloatingActionButton />
      
      {/* Footer Disclaimer */}
      <footer className="bg-neutral-950 border-t border-neutral-800 py-8">
        <div className="container-custom max-w-4xl mx-auto text-center text-neutral-400 text-sm">
          <p className="mb-4">
            Analysis reports are provided for informational purposes only. Results may vary based on 
            individual restaurant circumstances and market conditions.
          </p>
          <p>
            © 2024 Guest Getter. All rights reserved. 
            <span className="mx-2">•</span>
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <span className="mx-2">•</span>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
          </p>
        </div>
      </footer>
    </main>
  )
} 