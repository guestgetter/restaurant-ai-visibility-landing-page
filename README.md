# AI Search for Restaurants - Landing Page

A sophisticated, conversion-optimized landing page that helps restaurants understand their AI search visibility across ChatGPT, Google AI Overviews, and Perplexity.

## 🚀 Features

### ✨ Animations & Micro-interactions
- **Framer Motion animations**: Entrance animations for sections as they scroll into view
- **Staggered card animations**: Beautiful card reveals with timing delays
- **Smooth page transitions**: Seamless navigation experience
- **Floating action button**: Appears on scroll with contact options
- **Parallax effects**: Dynamic hero section with depth
- **Particle animations**: Subtle background elements

### 🎯 Conversion Optimization
- **Social proof elements**: Customer logos, testimonial carousel, live counters
- **Urgency indicators**: Countdown timer for "first 100 restaurants" offer
- **Exit-intent popup**: Captures users before they leave
- **A/B testing ready**: Multiple headline and CTA variants
- **Live statistics**: Real-time counter of reports generated

### 🔧 Advanced UX Patterns
- **Multi-step form**: Progress indicator with validation
- **Smart auto-completion**: Enhanced form experience
- **Real-time validation**: Instant feedback with Zod
- **Interactive demo**: Shows how AI describes restaurants
- **Chatbot widget**: Instant support for questions

### 🛠 Backend Integration
- **Supabase**: Complete data storage solution
- **Resend**: Automated email sequences
- **Form validation**: Comprehensive Zod schemas
- **Analytics**: Google Analytics & Vercel Analytics
- **Admin dashboard**: View and manage submissions

### 📱 Performance & SEO
- **Meta tags**: Complete Open Graph and Twitter Card data
- **Structured data**: Restaurant-specific schema markup
- **Image optimization**: Next.js Image component with WebP/AVIF
- **Lazy loading**: Performance-optimized content loading
- **Sitemap**: SEO-friendly navigation
- **Perfect Lighthouse scores**: Optimized for Core Web Vitals

### 🍽️ Restaurant-Specific Features
- **Google My Business integration**: Pull restaurant data automatically
- **Restaurant finder map**: Interactive location discovery
- **Industry testimonials**: Restaurant-focused social proof
- **Before/after examples**: AI search result comparisons
- **Restaurant type selector**: Fine dining, fast casual, etc.

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Database**: Supabase
- **Email**: Resend
- **Analytics**: Vercel Analytics + Google Analytics
- **Icons**: Lucide React
- **UI Components**: Radix UI
- **TypeScript**: Full type safety

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd restaurant-ai-search-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Fill in your API keys and configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Service
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=hello@aisearchforrestaurants.com

# Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VERCEL_ANALYTICS_ID=your_vercel_analytics_id

# External APIs
GOOGLE_MY_BUSINESS_API_KEY=your_google_my_business_api_key
OPENAI_API_KEY=your_openai_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── animations/        # Framer Motion components
│   ├── forms/            # Form components
│   ├── sections/         # Page sections
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
└── types/                # TypeScript type definitions
```

## 🎨 Design System

### Colors
- **Primary**: Orange gradient (#ec7f1a → #dd6610)
- **Neutral**: Gray scale for text and backgrounds
- **Semantic**: Success, warning, error states

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono for code

### Animations
- **Entrance**: Fade, slide, scale animations
- **Hover**: Smooth scale and glow effects
- **Loading**: Skeleton and spinner states

## 📱 Responsive Design

- **Mobile-first**: Designed for mobile, enhanced for desktop
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly**: Optimized for touch interactions
- **Accessibility**: WCAG 2.1 AA compliant

## 🔍 SEO Features

- **Meta tags**: Complete metadata for all pages
- **Open Graph**: Social media sharing optimization
- **Structured data**: Restaurant schema markup
- **Sitemap**: Auto-generated XML sitemap
- **Performance**: Lighthouse score optimization

## 📈 Analytics & Tracking

- **Google Analytics 4**: Complete user behavior tracking
- **Vercel Analytics**: Performance and user insights
- **Form tracking**: Conversion funnel analysis
- **Custom events**: Detailed interaction tracking

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables
3. Deploy automatically on push

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email hello@aisearchforrestaurants.com or create an issue in the repository.

---

Built with ❤️ for restaurants looking to dominate AI search results. 