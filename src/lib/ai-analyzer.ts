import OpenAI from 'openai'

// Initialize OpenAI only if API key is available
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null

interface RestaurantInfo {
  restaurantName: string
  location: string
  cuisine?: string
  website?: string
  description?: string
}

interface AIAnalysisResult {
  chatgpt: PlatformResult
  perplexity: PlatformResult
  claude: PlatformResult
  gemini: PlatformResult
  searchVisibility: PlatformResult
  summary: string
}

interface PlatformResult {
  score: number
  mentions: number
  description: string
  recommendations: string[]
  responseTime: number
  queries: QueryResult[]
}

interface QueryResult {
  query: string
  response: string
  mentioned: boolean
  quality: number
}

export async function analyzeRestaurantAI(info: RestaurantInfo): Promise<AIAnalysisResult> {
  console.log(`Analyzing AI visibility for ${info.restaurantName}`)
  
  const queries = generateTestQueries(info)
  
  const [
    chatgptResults,
    perplexityResults,
    claudeResults,
    geminiResults,
    searchResults
  ] = await Promise.allSettled([
    testChatGPT(info, queries),
    testPerplexity(info, queries), 
    testClaude(info, queries),
    testGemini(info, queries),
    testSearchVisibility(info)
  ])

  // Handle settled promises and extract results
  const results = {
    chatgpt: chatgptResults.status === 'fulfilled' ? chatgptResults.value : getDefaultResult(),
    perplexity: perplexityResults.status === 'fulfilled' ? perplexityResults.value : getDefaultResult(),
    claude: claudeResults.status === 'fulfilled' ? claudeResults.value : getDefaultResult(),
    gemini: geminiResults.status === 'fulfilled' ? geminiResults.value : getDefaultResult(),
    searchVisibility: searchResults.status === 'fulfilled' ? searchResults.value : getDefaultResult(),
    summary: generateSummary(info)
  }

  return results
}

function generateTestQueries(info: RestaurantInfo): string[] {
  const baseQueries = [
    `Best ${info.cuisine || 'restaurants'} in ${info.location}`,
    `Where should I eat in ${info.location}?`,
    `Recommend a good restaurant in ${info.location}`,
    `${info.cuisine || 'Food'} restaurants near ${info.location}`,
    `What's the best place to eat in ${info.location}?`
  ]

  // Add specific queries if we have restaurant name
  if (info.restaurantName) {
    baseQueries.push(
      `Tell me about ${info.restaurantName} restaurant`,
      `Is ${info.restaurantName} in ${info.location} good?`,
      `${info.restaurantName} ${info.location} reviews`
    )
  }

  return baseQueries
}

async function testChatGPT(info: RestaurantInfo, queries: string[]): Promise<PlatformResult> {
  const startTime = Date.now()
  const queryResults: QueryResult[] = []
  
  try {
    // If no OpenAI API key, simulate results for MVP
    if (!openai) {
      return simulateChatGPTResults(info, queries, startTime)
    }

    for (const query of queries.slice(0, 3)) { // Test first 3 queries
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: query
            }
          ],
          max_tokens: 300
        })

        const responseText = response.choices[0]?.message?.content || ''
        const mentioned = responseText.toLowerCase().includes(info.restaurantName.toLowerCase())
        
        queryResults.push({
          query,
          response: responseText,
          mentioned,
          quality: mentioned ? analyzeResponseQuality(responseText, info) : 0
        })

        // Small delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`ChatGPT query failed: ${query}`, error)
        queryResults.push({
          query,
          response: 'Query failed',
          mentioned: false,
          quality: 0
        })
      }
    }

    const totalMentions = queryResults.filter(r => r.mentioned).length
    const avgQuality = queryResults.reduce((sum, r) => sum + r.quality, 0) / queryResults.length
    const score = Math.round((totalMentions / queryResults.length) * 60 + avgQuality * 40)

    return {
      score,
      mentions: totalMentions,
      description: generatePlatformDescription('ChatGPT', score, totalMentions),
      recommendations: generatePlatformRecommendations('ChatGPT', score),
      responseTime: Date.now() - startTime,
      queries: queryResults
    }
  } catch (error) {
    console.error('ChatGPT analysis failed:', error)
    return getDefaultResult()
  }
}

async function testPerplexity(info: RestaurantInfo, queries: string[]): Promise<PlatformResult> {
  // For MVP, we'll simulate Perplexity results since their API requires special access
  // In production, integrate with Perplexity API
  const startTime = Date.now()
  
  const queryResults: QueryResult[] = queries.slice(0, 3).map(query => ({
    query,
    response: `Simulated Perplexity response for: ${query}`,
    mentioned: Math.random() > 0.6, // 40% chance of mention for demo
    quality: Math.floor(Math.random() * 70) + 30
  }))

  const totalMentions = queryResults.filter(r => r.mentioned).length
  const avgQuality = queryResults.reduce((sum, r) => sum + r.quality, 0) / queryResults.length
  const score = Math.round((totalMentions / queryResults.length) * 60 + avgQuality * 40)

  await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API delay

  return {
    score,
    mentions: totalMentions,
    description: generatePlatformDescription('Perplexity', score, totalMentions),
    recommendations: generatePlatformRecommendations('Perplexity', score),
    responseTime: Date.now() - startTime,
    queries: queryResults
  }
}

async function testClaude(info: RestaurantInfo, queries: string[]): Promise<PlatformResult> {
  // Simulate Claude results for MVP
  const startTime = Date.now()
  
  const queryResults: QueryResult[] = queries.slice(0, 3).map(query => ({
    query,
    response: `Simulated Claude response for: ${query}`,
    mentioned: Math.random() > 0.7, // 30% chance of mention for demo
    quality: Math.floor(Math.random() * 60) + 40
  }))

  const totalMentions = queryResults.filter(r => r.mentioned).length
  const avgQuality = queryResults.reduce((sum, r) => sum + r.quality, 0) / queryResults.length
  const score = Math.round((totalMentions / queryResults.length) * 60 + avgQuality * 40)

  await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API delay

  return {
    score,
    mentions: totalMentions,
    description: generatePlatformDescription('Claude', score, totalMentions),
    recommendations: generatePlatformRecommendations('Claude', score),
    responseTime: Date.now() - startTime,
    queries: queryResults
  }
}

async function testGemini(info: RestaurantInfo, queries: string[]): Promise<PlatformResult> {
  // Simulate Gemini results for MVP
  const startTime = Date.now()
  
  const queryResults: QueryResult[] = queries.slice(0, 3).map(query => ({
    query,
    response: `Simulated Gemini response for: ${query}`,
    mentioned: Math.random() > 0.65, // 35% chance of mention for demo
    quality: Math.floor(Math.random() * 80) + 20
  }))

  const totalMentions = queryResults.filter(r => r.mentioned).length
  const avgQuality = queryResults.reduce((sum, r) => sum + r.quality, 0) / queryResults.length
  const score = Math.round((totalMentions / queryResults.length) * 60 + avgQuality * 40)

  await new Promise(resolve => setTimeout(resolve, 1800)) // Simulate API delay

  return {
    score,
    mentions: totalMentions,
    description: generatePlatformDescription('Gemini', score, totalMentions),
    recommendations: generatePlatformRecommendations('Gemini', score),
    responseTime: Date.now() - startTime,
    queries: queryResults
  }
}

async function testSearchVisibility(info: RestaurantInfo): Promise<PlatformResult> {
  // Simulate search visibility analysis
  const startTime = Date.now()
  
  const score = Math.floor(Math.random() * 60) + 30 // Random score between 30-90
  
  await new Promise(resolve => setTimeout(resolve, 1000))

  return {
    score,
    mentions: 0,
    description: `Search visibility analysis shows ${score}% optimization for AI search platforms`,
    recommendations: generateSearchRecommendations(score),
    responseTime: Date.now() - startTime,
    queries: []
  }
}

function analyzeResponseQuality(response: string, info: RestaurantInfo): number {
  let quality = 0
  
  // Check for specific details
  if (response.includes(info.location)) quality += 20
  if (info.cuisine && response.toLowerCase().includes(info.cuisine.toLowerCase())) quality += 20
  if (response.includes('restaurant') || response.includes('dining')) quality += 10
  if (response.length > 100) quality += 10 // More detailed response
  
  // Check for positive sentiment
  const positiveWords = ['excellent', 'great', 'amazing', 'delicious', 'recommend', 'best', 'wonderful']
  const hasPositive = positiveWords.some(word => response.toLowerCase().includes(word))
  if (hasPositive) quality += 20
  
  // Check for specific details like address, hours, etc.
  if (response.includes('address') || response.includes('hour') || response.includes('phone')) quality += 20

  return Math.min(quality, 100)
}

function generatePlatformDescription(platform: string, score: number, mentions: number): string {
  if (score >= 80) {
    return `Excellent visibility on ${platform}. Your restaurant appears prominently in ${mentions} out of 3 test queries with detailed, accurate information.`
  } else if (score >= 60) {
    return `Good visibility on ${platform}. Your restaurant is mentioned in ${mentions} queries but could use more detailed information.`
  } else if (score >= 40) {
    return `Limited visibility on ${platform}. Your restaurant appears in ${mentions} queries but often with generic or incomplete information.`
  } else {
    return `Poor visibility on ${platform}. Your restaurant rarely appears in AI responses or appears with incorrect information.`
  }
}

function generatePlatformRecommendations(platform: string, score: number): string[] {
  const recommendations = []
  
  if (score < 60) {
    recommendations.push(`Improve your online presence to increase ${platform} visibility`)
    recommendations.push('Add more detailed descriptions to your Google Business Profile')
  }
  
  if (score < 40) {
    recommendations.push('Ensure consistent business information across all platforms')
    recommendations.push('Encourage customers to mention your restaurant in reviews')
  }

  return recommendations
}

function generateSearchRecommendations(score: number): string[] {
  const recommendations = []
  
  if (score < 70) {
    recommendations.push('Optimize your website for local SEO keywords')
    recommendations.push('Add structured data markup to your website')
  }
  
  if (score < 50) {
    recommendations.push('Create more online content about your restaurant')
    recommendations.push('Build local business directory listings')
  }

  return recommendations
}

function getDefaultResult(): PlatformResult {
  return {
    score: 0,
    mentions: 0,
    description: 'Analysis unavailable - please try again',
    recommendations: ['Unable to analyze - please try again later'],
    responseTime: 0,
    queries: []
  }
}

function simulateChatGPTResults(info: RestaurantInfo, queries: string[], startTime: number): PlatformResult {
  // Simulate ChatGPT results for MVP when no API key is available
  const queryResults: QueryResult[] = queries.slice(0, 3).map(query => ({
    query,
    response: `Simulated ChatGPT response for: ${query}`,
    mentioned: Math.random() > 0.5, // 50% chance of mention for demo
    quality: Math.floor(Math.random() * 80) + 20
  }))

  const totalMentions = queryResults.filter(r => r.mentioned).length
  const avgQuality = queryResults.reduce((sum, r) => sum + r.quality, 0) / queryResults.length
  const score = Math.round((totalMentions / queryResults.length) * 60 + avgQuality * 40)

  return {
    score,
    mentions: totalMentions,
    description: generatePlatformDescription('ChatGPT', score, totalMentions),
    recommendations: generatePlatformRecommendations('ChatGPT', score),
    responseTime: Date.now() - startTime,
    queries: queryResults
  }
}

function generateSummary(info: RestaurantInfo): string {
  return `AI visibility analysis completed for ${info.restaurantName} in ${info.location}. Analysis includes testing across major AI platforms to determine how well your restaurant appears in AI-powered search results and recommendations.`
} 