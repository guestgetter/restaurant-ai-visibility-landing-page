import { NextRequest, NextResponse } from 'next/server'

// GoHighLevel configuration - Using API v1 for location API keys
const GHL_API_BASE = 'https://rest.gohighlevel.com/v1'
const GHL_LOCATION_ID = '5Ycss9q6zHpD6qfCOk4F'
const GHL_API_KEY = '23ba76e4-34b2-4b0a-b50e-d5353e568b89'

export async function GET(request: NextRequest) {
  try {
    console.log('Testing GHL API v1 connection...')
    
    // Test with minimal contact data for v1 API
    const testContactData = {
      firstName: 'Test',
      lastName: 'Contact',
      name: 'Test Contact',
      email: 'test@example.com',
      phone: '+15551234567',
      locationId: GHL_LOCATION_ID,
      source: 'API Test'
    }

    console.log('Sending test contact:', testContactData)

    const ghlResponse = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testContactData)
    })

    const responseText = await ghlResponse.text()
    
    console.log('GHL Response status:', ghlResponse.status)
    console.log('GHL Response headers:', Object.fromEntries(ghlResponse.headers.entries()))
    console.log('GHL Response body:', responseText)

    return NextResponse.json({
      success: ghlResponse.ok,
      status: ghlResponse.status,
      headers: Object.fromEntries(ghlResponse.headers.entries()),
      body: responseText,
      apiConfig: {
        endpoint: `${GHL_API_BASE}/contacts/`,
        locationId: GHL_LOCATION_ID,
        hasApiKey: !!GHL_API_KEY
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Error testing GHL API:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      apiConfig: {
        endpoint: `${GHL_API_BASE}/contacts/`,
        locationId: GHL_LOCATION_ID,
        hasApiKey: !!GHL_API_KEY
      }
    }, { status: 500 })
  }
} 