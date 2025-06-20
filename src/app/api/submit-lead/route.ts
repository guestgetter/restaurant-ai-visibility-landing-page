import { NextRequest, NextResponse } from 'next/server'
import { sendLeadNotification } from '@/lib/email-service'

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
  utmParams?: Record<string, string>
}

// GoHighLevel configuration - Using API v1 for location API keys
const GHL_API_BASE = 'https://rest.gohighlevel.com/v1'
const GHL_LOCATION_ID = '5Ycss9q6zHpD6qfCOk4F'
const GHL_API_KEY = '23ba76e4-34b2-4b0a-b50e-d5353e568b89'

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json()
    console.log('Received lead submission:', data)

    // Prepare contact data for GoHighLevel API v1
    const ghlContactData = {
      firstName: data.firstName,
      lastName: data.lastName,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      locationId: GHL_LOCATION_ID,
      source: data.utmParams?.utm_source || 'Restaurant AI Search Landing Page',
      customField: {
        restaurant_name: data.restaurantName,
        restaurant_type: data.restaurantType,
        location: data.location,
        website: data.website || '',
        marketing_goals: data.marketingGoals?.join(', ') || '',
        submission_date: new Date().toISOString(),
        // UTM Parameters for attribution tracking
        utm_source: data.utmParams?.utm_source || '',
        utm_medium: data.utmParams?.utm_medium || '',
        utm_campaign: data.utmParams?.utm_campaign || '',
        utm_term: data.utmParams?.utm_term || '',
        utm_content: data.utmParams?.utm_content || '',
        referrer: data.utmParams?.referrer || '',
        landing_page: data.utmParams?.landing_page || ''
      },
      tags: ['Restaurant AI Search', 'Landing Page Lead', data.restaurantType, ...(data.utmParams?.utm_campaign ? [data.utmParams.utm_campaign] : [])]
    }

    // Send to GoHighLevel using v1 API
    console.log('Sending to GoHighLevel v1 API...')
    const ghlResponse = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ghlContactData)
    })

    const responseText = await ghlResponse.text()
    console.log('GHL Response status:', ghlResponse.status)
    console.log('GHL Response:', responseText)

    if (!ghlResponse.ok) {
      console.error('GoHighLevel API error:', responseText)
      // Don't throw error - still return success to user
    }

    let ghlResult
    try {
      ghlResult = JSON.parse(responseText)
      console.log('Successfully sent to GoHighLevel:', ghlResult)
    } catch (parseError) {
      console.error('Error parsing GHL response:', parseError)
      ghlResult = { success: true }
    }

    // Send email notification
    console.log('Sending email notification...')
    try {
      await sendLeadNotification(data)
      console.log('Email notification sent successfully')
    } catch (emailError) {
      console.error('Error sending email notification:', emailError)
      // Don't fail the whole request if email fails
    }

    // Return success response regardless of GHL status (for user experience)
    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
      contactId: ghlResult?.contact?.id || ghlResult?.id || null,
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