const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  }

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    }
  }

  try {
    const data = JSON.parse(event.body)

    // Validate required fields
    const required = ['firstName', 'lastName', 'email', 'phone', 'year', 'branch', 'interests', 'skills', 'preferredTeam', 'motivation']
    const missing = required.filter(field => !data[field] || data[field].trim() === '')
    
    if (missing.length > 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Missing required fields',
          errors: missing.reduce((acc, field) => ({ ...acc, [field]: 'This field is required' }), {})
        })
      }
    }

    // Validate email
    if (!emailRegex.test(data.email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Invalid email format',
          errors: { email: 'Invalid email format' }
        })
      }
    }

    // Validate phone
    if (!phoneRegex.test(data.phone)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Invalid phone number',
          errors: { phone: 'Invalid phone number' }
        })
      }
    }

    // Validate name lengths
    if (data.firstName.length < 2 || data.lastName.length < 2) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Names must be at least 2 characters',
          errors: {
            firstName: data.firstName.length < 2 ? 'Minimum 2 characters' : null,
            lastName: data.lastName.length < 2 ? 'Minimum 2 characters' : null
          }
        })
      }
    }

    // Check for duplicate email
    const { data: existing } = await supabase
      .from('applications')
      .select('id')
      .eq('email', data.email.toLowerCase())
      .single()

    if (existing) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'An application with this email already exists'
        })
      }
    }

    // Insert application
    const { data: application, error } = await supabase
      .from('applications')
      .insert([{
        first_name: data.firstName.trim(),
        last_name: data.lastName.trim(),
        email: data.email.toLowerCase().trim(),
        phone: data.phone.trim(),
        college: data.college || 'VCET Puttur',
        year: data.year,
        branch: data.branch,
        usn: data.usn?.trim() || null,
        interests: data.interests.trim(),
        skills: data.skills.trim(),
        experience: data.experience?.trim() || null,
        github: data.github?.trim() || null,
        portfolio: data.portfolio?.trim() || null,
        preferred_team: data.preferredTeam,
        motivation: data.motivation.trim(),
        availability: data.availability || null,
        status: 'pending'
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Failed to submit application. Please try again.'
        })
      }
    }

    // TODO: Send confirmation email (integrate with SendGrid/Mailgun)
    // TODO: Send admin notification email

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Application submitted successfully',
        applicationId: application.id,
        timestamp: new Date().toISOString()
      })
    }

  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Server error. Please try again later.'
      })
    }
  }
}
