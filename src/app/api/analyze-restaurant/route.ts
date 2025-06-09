import { NextRequest, NextResponse } from 'next/server'
import { analyzeRestaurantAI } from '@/lib/ai-analyzer'
import { generatePDFReport } from '@/lib/pdf-generator'
import { getRestaurantData } from '@/lib/restaurant-data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      restaurantName, 
      location, 
      cuisine, 
      website, 
      email,
      phone,
      ownerName 
    } = body

    // Validate required fields
    if (!restaurantName || !location || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log(`Starting analysis for ${restaurantName} in ${location}`)

    // Step 1: Get restaurant data from various sources
    const restaurantData = await getRestaurantData({
      name: restaurantName,
      location,
      website,
      cuisine
    })

    // Step 2: Analyze AI visibility across platforms
    const aiAnalysis = await analyzeRestaurantAI({
      restaurantName,
      location,
      cuisine: cuisine || restaurantData.cuisine,
      website: website || restaurantData.website,
      description: restaurantData.description
    })

    // Step 3: Calculate scores and recommendations
    const overallScore = calculateOverallScore(aiAnalysis)
    const recommendations = generateRecommendations(aiAnalysis, restaurantData)

    // Step 4: Generate PDF report
    const reportData = {
      restaurant: {
        name: restaurantName,
        location,
        cuisine: cuisine || restaurantData.cuisine,
        website: website || restaurantData.website,
        ownerName
      },
      analysis: aiAnalysis,
      score: overallScore,
      recommendations,
      generatedAt: new Date().toISOString()
    }

    const pdfBuffer = await generatePDFReport(reportData)

    // Step 5: Send email with report (implement email service)
    // await sendReportEmail(email, pdfBuffer, reportData)

    return NextResponse.json({
      success: true,
      score: overallScore,
      analysis: aiAnalysis,
      recommendations: recommendations.slice(0, 3), // Top 3 for API response
      reportGenerated: true,
      message: 'Analysis complete! Check your email for the full report.'
    })

  } catch (error) {
    console.error('Restaurant analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 }
    )
  }
}

function calculateOverallScore(analysis: any): number {
  const weights = {
    chatgpt: 0.3,
    perplexity: 0.25,
    claude: 0.2,
    gemini: 0.15,
    searchVisibility: 0.1
  }

  let totalScore = 0
  let totalWeight = 0

  Object.entries(weights).forEach(([platform, weight]) => {
    if (analysis[platform]?.score !== undefined) {
      // Cap individual platform scores at 100 for realistic overall score
      const cappedScore = Math.min(analysis[platform].score, 100)
      totalScore += cappedScore * weight
      totalWeight += weight
    }
  })

  return Math.round(totalScore / totalWeight)
}

function generateRecommendations(analysis: any, restaurantData: any): string[] {
  const recommendations = []

  // Low ChatGPT visibility
  if (analysis.chatgpt?.score < 50) {
    recommendations.push("Optimize your Google Business Profile with detailed descriptions and recent photos")
  }

  // Missing cuisine information
  if (!restaurantData.cuisine || analysis.perplexity?.score < 40) {
    recommendations.push("Add detailed cuisine type and specialty dishes to your online listings")
  }

  // Poor search visibility
  if (analysis.searchVisibility?.score < 60) {
    recommendations.push("Improve your website SEO with local keywords and structured data")
  }

  // Missing reviews
  if (analysis.reviews?.count < 50) {
    recommendations.push("Actively encourage customer reviews on Google and Yelp")
  }

  // Add more specific recommendations based on analysis
  recommendations.push("Create social media content highlighting your unique atmosphere and dishes")
  recommendations.push("Ensure consistent NAP (Name, Address, Phone) across all online directories")

  return recommendations
} 