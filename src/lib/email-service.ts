import nodemailer from 'nodemailer'

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

// Email configuration
const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com'
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || '587')
const EMAIL_USER = process.env.EMAIL_USER || ''
const EMAIL_PASS = process.env.EMAIL_PASS || ''
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'kyle@guestgetter.com'

// Create transporter
const createTransporter = () => {
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn('Email credentials not configured - email notifications disabled')
    return null
  }

  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  })
}

export async function sendLeadNotification(leadData: LeadData): Promise<boolean> {
  try {
    const transporter = createTransporter()
    if (!transporter) {
      console.log('Email not configured - skipping notification')
      return false
    }

    const emailContent = `
🚀 NEW RESTAURANT AI SEARCH LEAD!

Restaurant Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏪 Restaurant: ${leadData.restaurantName}
📍 Location: ${leadData.location}
🍽️ Type: ${leadData.restaurantType}
🌐 Website: ${leadData.website || 'Not provided'}

Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Contact: ${leadData.firstName} ${leadData.lastName}
📧 Email: ${leadData.email}
📱 Phone: ${leadData.phone}

Marketing Goals:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${leadData.marketingGoals && leadData.marketingGoals.length > 0 
  ? leadData.marketingGoals.map(goal => `• ${goal}`).join('\n')
  : '• Not specified'
}

Next Steps:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Lead has been added to GoHighLevel
✅ Customer expects analysis within 24-48 hours
✅ Check GoHighLevel for full contact details

Submitted: ${new Date().toLocaleString('en-US', {
  timeZone: 'America/New_York',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
})} EST
    `.trim()

    const mailOptions = {
      from: `"Restaurant AI Search" <${EMAIL_USER}>`,
      to: NOTIFICATION_EMAIL,
      subject: `🚀 New Lead: ${leadData.restaurantName} (${leadData.restaurantType})`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>').replace(/━/g, '─')
    }

    await transporter.sendMail(mailOptions)
    console.log('Lead notification email sent successfully')
    return true

  } catch (error) {
    console.error('Error sending lead notification email:', error)
    return false
  }
} 