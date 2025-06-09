import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Search for Restaurants | See How Your Restaurant Appears in AI Search',
  description: 'Get a fast, free report showing exactly how your restaurant appears across ChatGPT, Google AI Overviews, and Perplexity. Delivered within 24 hours.',
  keywords: 'restaurant AI search, ChatGPT restaurant visibility, Google AI restaurant, Perplexity search, restaurant marketing, AI optimization',
  authors: [{ name: 'AI Search for Restaurants' }],
  creator: 'AI Search for Restaurants',
  publisher: 'AI Search for Restaurants',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aisearchforrestaurants.com',
    title: 'AI Search for Restaurants | Free AI Visibility Report',
    description: 'Get a fast, free report showing exactly how your restaurant appears across ChatGPT, Google AI Overviews, and Perplexity. Delivered within 24 hours.',
    siteName: 'AI Search for Restaurants',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Search for Restaurants - Free AI Visibility Report',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Search for Restaurants | Free AI Visibility Report',
    description: 'Get a fast, free report showing exactly how your restaurant appears across ChatGPT, Google AI Overviews, and Perplexity.',
    images: ['/og-image.jpg'],
    creator: '@aisearchrest',
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
  alternates: {
    canonical: 'https://aisearchforrestaurants.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ec7f1a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AI Search for Restaurants",
              "url": "https://aisearchforrestaurants.com",
              "logo": "https://aisearchforrestaurants.com/logo.png",
              "description": "Get a fast, free report showing exactly how your restaurant appears across ChatGPT, Google AI Overviews, and Perplexity.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-123-4567",
                "contactType": "customer service",
                "email": "hello@aisearchforrestaurants.com"
              },
              "sameAs": [
                "https://twitter.com/aisearchrest",
                "https://linkedin.com/company/aisearchforrestaurants"
              ]
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
} 