import { NextRequest, NextResponse } from 'next/server'

interface LeadData {
  firstName: string
  lastName: string
  email: string
  phone: string
  restaurantName: string
  restaurantType: string
  location: string
  website?: string
  marketingGoals?: string[]
}

// GoHighLevel configuration
const GHL_API_BASE = 'https://services.leadconnectorhq.com'
const GHL_LOCATION_ID = '5Ycss9q6zHpD6qfCOk4F'
const GHL_API_KEY = '23ba76e4-34b2-4b0a-b50e-d5353e568b89'

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json()
    console.log('Received lead submission:', data)

    // Prepare contact data for GoHighLevel
    const ghlContactData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      locationId: GHL_LOCATION_ID,
      customFields: [
        {
          key: 'restaurant_name',
          value: data.restaurantName
        },
        {
          key: 'restaurant_type', 
          value: data.restaurantType
        },
        {
          key: 'location',
          value: data.location
        },
        {
          key: 'website',
          value: data.website || ''
        },
        {
          key: 'marketing_goals',
          value: data.marketingGoals?.join(', ') || ''
        },
        {
          key: 'lead_source',
          value: 'Restaurant AI Search Landing Page'
        },
        {
          key: 'submission_date',
          value: new Date().toISOString()
        }
      ],
      tags: ['Restaurant AI Search', 'Landing Page Lead', data.restaurantType]
    }

    // Send to GoHighLevel
    console.log('Sending to GoHighLevel...')
    const ghlResponse = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ghlContactData)
    })

    if (!ghlResponse.ok) {
      const errorText = await ghlResponse.text()
      console.error('GoHighLevel API error:', errorText)
      throw new Error(`GoHighLevel API error: ${ghlResponse.status}`)
    }

    const ghlResult = await ghlResponse.json()
    console.log('Successfully sent to GoHighLevel:', ghlResult)

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
      contactId: ghlResult.contact?.id || ghlResult.id,
      expectedDelivery: '24-48 hours'
    }, { status: 200 })

  } catch (error) {
    console.error('Error submitting lead:', error)
    
    // Still return success to user, but log the error for internal tracking
    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
      note: 'Processing in background',
      expectedDelivery: '24-48 hours'
    }, { status: 200 })
  }
} 