import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Restaurant AI API is working!',
    timestamp: new Date().toISOString(),
    endpoints: {
      analyzeRestaurant: '/api/analyze-restaurant',
      test: '/api/test'
    }
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  return NextResponse.json({
    message: 'Test POST endpoint working',
    receivedData: body,
    timestamp: new Date().toISOString()
  })
} 