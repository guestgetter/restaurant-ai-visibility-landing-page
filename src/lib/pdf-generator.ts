import jsPDF from 'jspdf'

interface ReportData {
  restaurant: {
    name: string
    location: string
    cuisine?: string
    website?: string
    ownerName?: string
  }
  analysis: any
  score: number
  recommendations: string[]
  generatedAt: string
}

export async function generatePDFReport(data: ReportData): Promise<Buffer> {
  console.log(`Generating PDF report for ${data.restaurant.name}`)
  
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    // Set up colors and fonts
    const primaryColor: [number, number, number] = [59, 130, 246] // Blue
    const accentColor: [number, number, number] = [16, 185, 129] // Green
    const textColor: [number, number, number] = [55, 65, 81] // Gray
    const lightGray: [number, number, number] = [243, 244, 246]

    let yPosition = 20

    // Header with logo/branding
    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, 210, 30, 'F')
    
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text('Restaurant AI Visibility Report', 20, 18)
    
    yPosition = 45

    // Restaurant Information Section
    doc.setTextColor(...textColor)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('Restaurant Information', 20, yPosition)
    
    yPosition += 10
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    
    const restaurantInfo = [
      `Name: ${data.restaurant.name}`,
      `Location: ${data.restaurant.location}`,
      `Cuisine: ${data.restaurant.cuisine || 'Not specified'}`,
      `Website: ${data.restaurant.website || 'Not provided'}`,
      `Analysis Date: ${new Date(data.generatedAt).toLocaleDateString()}`
    ]

    restaurantInfo.forEach(info => {
      doc.text(info, 20, yPosition)
      yPosition += 6
    })

    yPosition += 10

    // Overall Score Section
    doc.setFillColor(...lightGray)
    doc.rect(15, yPosition - 5, 180, 25, 'F')
    
    doc.setTextColor(...primaryColor)
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Overall AI Visibility Score', 20, yPosition + 5)
    
    // Score circle
    const scoreColor: [number, number, number] = data.score >= 80 ? accentColor : data.score >= 60 ? [251, 146, 60] : [239, 68, 68]
    doc.setFillColor(...scoreColor)
    doc.circle(170, yPosition + 8, 12, 'F')
    
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text(data.score.toString(), data.score < 100 ? 165 : 162, yPosition + 12)
    
    yPosition += 35

    // Platform Analysis Section
    doc.setTextColor(...textColor)
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Platform Analysis', 20, yPosition)
    
    yPosition += 10

    const platforms = [
      { name: 'ChatGPT', data: data.analysis.chatgpt },
      { name: 'Perplexity', data: data.analysis.perplexity },
      { name: 'Claude', data: data.analysis.claude },
      { name: 'Gemini', data: data.analysis.gemini }
    ]

    platforms.forEach(platform => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text(platform.name, 20, yPosition)
      
      // Platform score
      const platformScore = platform.data?.score || 0
      const platformColor: [number, number, number] = platformScore >= 80 ? accentColor : platformScore >= 60 ? [251, 146, 60] : [239, 68, 68]
      
      doc.setFillColor(...platformColor)
      doc.rect(150, yPosition - 4, 30, 8, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(10)
      doc.text(`Score: ${platformScore}`, 155, yPosition)
      
      yPosition += 8
      
      doc.setTextColor(...textColor)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      
      const description = platform.data?.description || 'Analysis not available'
      const splitDescription = doc.splitTextToSize(description, 170)
      doc.text(splitDescription, 20, yPosition)
      yPosition += splitDescription.length * 4 + 8
    })

    // Add new page if needed for recommendations
    if (yPosition > 220) {
      doc.addPage()
      yPosition = 20
    }

    // Recommendations Section
    doc.setTextColor(...textColor)
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Key Recommendations', 20, yPosition)
    
    yPosition += 10

    data.recommendations.slice(0, 8).forEach((recommendation, index) => {
      if (yPosition > 270) {
        doc.addPage()
        yPosition = 20
      }

      doc.setFillColor(...accentColor)
      doc.circle(23, yPosition - 1, 2, 'F')
      
      doc.setTextColor(...textColor)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      
      const splitRecommendation = doc.splitTextToSize(recommendation, 160)
      doc.text(splitRecommendation, 30, yPosition)
      yPosition += splitRecommendation.length * 5 + 3
    })

    // Footer
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    } else {
      yPosition = Math.max(yPosition + 20, 260)
    }

    doc.setFillColor(...primaryColor)
    doc.rect(0, yPosition, 210, 30, 'F')
    
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Generated by Restaurant AI Search Analysis', 20, yPosition + 10)
    doc.text('Helping restaurants succeed in the age of AI search', 20, yPosition + 18)
    
    // Add contact information
    doc.text('Contact: support@restaurantai.com | Visit: restaurantai.com', 20, yPosition + 25)

    // Convert to buffer
    const pdfArrayBuffer = doc.output('arraybuffer')
    const pdfBuffer = Buffer.from(pdfArrayBuffer)
    
    console.log('PDF report generated successfully')
    return pdfBuffer

  } catch (error) {
    console.error('Error generating PDF report:', error)
    throw new Error('Failed to generate PDF report')
  }
}

export async function generateSimplePDFReport(data: ReportData): Promise<Buffer> {
  // Simplified version for testing
  const doc = new jsPDF()
  
  doc.setFontSize(20)
  doc.text('Restaurant AI Analysis Report', 20, 20)
  
  doc.setFontSize(14)
  doc.text(`Restaurant: ${data.restaurant.name}`, 20, 40)
  doc.text(`Location: ${data.restaurant.location}`, 20, 50)
  doc.text(`Overall Score: ${data.score}/100`, 20, 60)
  
  doc.setFontSize(12)
  doc.text('Top Recommendations:', 20, 80)
  
  data.recommendations.slice(0, 5).forEach((rec, index) => {
    doc.text(`${index + 1}. ${rec}`, 20, 90 + (index * 10))
  })
  
  const pdfArrayBuffer = doc.output('arraybuffer')
  return Buffer.from(pdfArrayBuffer)
} 