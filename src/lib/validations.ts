import { z } from 'zod'

export const restaurantFormSchema = z.object({
  restaurantName: z
    .string()
    .min(2, 'Restaurant name must be at least 2 characters')
    .max(100, 'Restaurant name must be less than 100 characters'),
  
  ownerName: z
    .string()
    .min(2, 'Owner name must be at least 2 characters')
    .max(50, 'Owner name must be less than 50 characters'),
  
  email: z
    .string()
    .email('Please enter a valid email address'),
  
  phone: z
    .string()
    .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number')
    .refine((phone: string) => phone.replace(/\D/g, '').length >= 10, {
      message: 'Phone number must be at least 10 digits',
    }),
  
  address: z
    .string()
    .min(10, 'Please enter a complete address')
    .max(200, 'Address must be less than 200 characters'),
  
  city: z
    .string()
    .min(2, 'City name must be at least 2 characters')
    .max(50, 'City name must be less than 50 characters'),
  
  state: z
    .string()
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must be less than 50 characters'),
  
  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  
  website: z
    .string()
    .url('Please enter a valid website URL')
    .optional()
    .or(z.literal('')),
  
  restaurantType: z.enum([
    'fine-dining',
    'casual-dining',
    'fast-casual',
    'fast-food',
    'cafe',
    'bakery',
    'bar',
    'food-truck',
    'catering',
    'other'
  ]),
  
  cuisineType: z
    .string()
    .min(2, 'Please specify your cuisine type')
    .max(50, 'Cuisine type must be less than 50 characters'),
  
  yearsInBusiness: z
    .number()
    .min(0, 'Years in business must be 0 or more')
    .max(100, 'Years in business must be less than 100'),
  
  averageTicket: z.enum([
    'under-15',
    '15-30',
    '30-50',
    '50-100',
    'over-100'
  ]),
  
  currentChallenges: z
    .array(z.string())
    .min(1, 'Please select at least one challenge'),
  
  hearAboutUs: z.enum([
    'google',
    'social-media',
    'referral',
    'industry-publication',
    'conference',
    'other'
  ]),
  
  additionalNotes: z
    .string()
    .max(500, 'Additional notes must be less than 500 characters')
    .optional(),
  
  marketingConsent: z
    .boolean()
    .refine((val: boolean) => val === true, {
      message: 'You must agree to receive marketing communications',
    }),
  
  termsAccepted: z
    .boolean()
    .refine((val: boolean) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
})

export type RestaurantFormData = z.infer<typeof restaurantFormSchema>

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
})

export type NewsletterData = z.infer<typeof newsletterSchema>

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  email: z
    .string()
    .email('Please enter a valid email address'),
  
  company: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema> 